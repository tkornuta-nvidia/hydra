import copy
from typing import Dict, List, Optional

from hydra._internal.config_repository import ConfigRepository
from hydra.core import DefaultElement
from hydra.errors import ConfigCompositionException, MissingConfigException


def compute_element_defaults_list(
    element: DefaultElement,
    repo: ConfigRepository,
) -> List[DefaultElement]:
    group_to_choice = {}
    return _compute_element_defaults_list_impl(
        element=element,
        group_to_choice=group_to_choice,
        repo=repo,
    )


def expand_defaults_list(
    self_name: Optional[str],
    defaults: List[DefaultElement],
    repo: ConfigRepository,
) -> List[DefaultElement]:
    group_to_choice = {}
    for d in reversed(defaults):
        if d.config_group is not None:
            if d.fully_qualified_group_name() not in group_to_choice:
                group_to_choice[d.fully_qualified_group_name()] = d.config_name

    return _expand_defaults_list_impl(
        self_name=self_name,
        defaults=defaults,
        group_to_choice=group_to_choice,
        repo=repo,
    )


def _compute_element_defaults_list_impl(
    element: DefaultElement,
    group_to_choice: Dict[str, str],
    repo: ConfigRepository,
) -> List[DefaultElement]:
    # TODO: Should loaded configs be to cached in the repo to avoid loading more than once?
    #  Ensure new approach does not cause the same config to be loaded more than once.
    has_self = False

    loaded = repo.load_config(
        config_path=element.config_path(), is_primary_config=False
    )
    if loaded is None and not element.optional:
        missing_config_error(
            repo=repo,
            config_name=element.config_path(),
            msg=f"Cannot find config : {element.config_path()}, check that it's in your config search path",
            with_search_path=True,
        )

    defaults = loaded.defaults_list if loaded is not None else []

    for d in defaults:
        if d.config_name == "_self_":
            if has_self is True:
                raise ConfigCompositionException(
                    f"Duplicate _self_ defined in {element.config_path()}"
                )
            has_self = True
            assert d.config_group is None
            d.config_group = element.config_group
            d.package = element.package

    if not has_self:
        me = DefaultElement(
            config_group=element.config_group,
            config_name="_self_",
            package=element.package,
        )
        defaults.insert(0, me)

    return _expand_defaults_list_impl(
        self_name=element.config_name,
        defaults=defaults,
        group_to_choice=group_to_choice,
        repo=repo,
    )


def _expand_defaults_list_impl(
    self_name: Optional[str],
    defaults: List[DefaultElement],
    group_to_choice: Dict[str, str],
    repo: ConfigRepository,
) -> List[DefaultElement]:

    # list order is determined by first instance from that config group
    # selected config group is determined by the last override

    ret = []
    for d in reversed(defaults):
        if d.config_name == "_self_":
            if self_name is None:
                raise ConfigCompositionException(
                    "self_name is not specified adn defaults list contains a _self_ item"
                )
            d = copy.deepcopy(d)
            # override self_name
            if d.fully_qualified_group_name() in group_to_choice:
                d.config_name = group_to_choice[d.fully_qualified_group_name()]
            else:
                d.config_name = self_name
            added_sublist = [d]
        else:
            if d.fully_qualified_group_name() in group_to_choice:
                d.config_name = group_to_choice[d.fully_qualified_group_name()]
            item_defaults = _compute_element_defaults_list_impl(
                element=d,
                group_to_choice=group_to_choice,
                repo=repo,
            )
            added_sublist = item_defaults

        ret.append(added_sublist)

        for dd in reversed(added_sublist):
            if dd.config_group is not None:
                fqgn = dd.fully_qualified_group_name()
                if fqgn not in group_to_choice:
                    group_to_choice[fqgn] = dd.config_name

    ret.reverse()
    ret = [item for sublist in ret for item in sublist]

    deduped = []
    seen_groups = set()
    for d in ret:
        if d.config_group is not None:
            fqgn = d.fully_qualified_group_name()
            if fqgn not in seen_groups:
                seen_groups.add(fqgn)
                deduped.append(d)
        else:
            deduped.append(d)

    return deduped


def missing_config_error(
    repo: ConfigRepository,
    config_name: Optional[str],
    msg: str,
    with_search_path: bool,
) -> None:
    def add_search_path() -> str:
        descs = []
        for src in repo.get_sources():
            if src.provider != "schema":
                descs.append(f"\t{repr(src)}")
        lines = "\n".join(descs)

        if with_search_path:
            return msg + "\nSearch path:" + f"\n{lines}"
        else:
            return msg

    raise MissingConfigException(
        missing_cfg_file=config_name, message=add_search_path()
    )