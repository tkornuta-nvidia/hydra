(window.webpackJsonp=window.webpackJsonp||[]).push([[140],{196:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(7),o=(n(0),n(236)),i={id:"dynamic_schema",title:"Dynamic schema with many configs"},c={unversionedId:"tutorials/structured_config/dynamic_schema",id:"version-1.0/tutorials/structured_config/dynamic_schema",isDocsHomePage:!1,title:"Dynamic schema with many configs",description:"Example",source:"@site/versioned_docs/version-1.0/tutorials/structured_config/7_dynamic_schema_many_configs.md",slug:"/tutorials/structured_config/dynamic_schema",permalink:"/docs/tutorials/structured_config/dynamic_schema",editUrl:"https://github.com/facebookresearch/hydra/edit/master/website/versioned_docs/version-1.0/tutorials/structured_config/7_dynamic_schema_many_configs.md",version:"1.0",lastUpdatedBy:"Omry Yadan",lastUpdatedAt:1601320700,sidebar:"version-1.0/docs",previous:{title:"Static schema with many configs",permalink:"/docs/tutorials/structured_config/static_schema"},next:{title:"Config Store API",permalink:"/docs/tutorials/structured_config/config_store"}},s=[],l={rightToc:s};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookresearch/hydra/tree/master/examples/tutorials/structured_configs/7_dynamic_schema_many_configs/"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://img.shields.io/badge/-Example-informational",alt:"Example"})))),Object(o.b)("p",null,"In this page we will see how to get runtime type safety for configs with dynamic schema.\nOur top level config contains a single field - ",Object(o.b)("inlineCode",{parentName:"p"},"db"),", with the type ",Object(o.b)("inlineCode",{parentName:"p"},"DBConfig"),".\nBased on user choice, we would like its type to be either ",Object(o.b)("inlineCode",{parentName:"p"},"MySQLConfig")," or ",Object(o.b)("inlineCode",{parentName:"p"},"PostGreSQLConfig")," at runtime.\nThe two schemas differs: config files that are appropriate for one are inappropriate for the other."),Object(o.b)("p",null,"For each of the two schemas, we have two options - one for prod and one for staging:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text",metastring:'title="Config directory"',title:'"Config','directory"':!0}),"\u251c\u2500\u2500 config.yaml\n\u2514\u2500\u2500 db\n    \u251c\u2500\u2500 mysql_prod.yaml\n    \u251c\u2500\u2500 mysql_staging.yaml\n    \u251c\u2500\u2500 postgresql_prod.yaml\n    \u2514\u2500\u2500 postgresql_staging.yaml\n")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python",metastring:'title="my_app.py"',title:'"my_app.py"'}),'@dataclass\nclass DBConfig:\n    driver: str = MISSING\n    host: str = MISSING\n\n@dataclass\nclass MySQLConfig(DBConfig):\n    driver: str = "mysql"\n    encoding: str = MISSING\n\n@dataclass\nclass PostGreSQLConfig(DBConfig):\n    driver: str = "postgresql"\n    timeout: int = MISSING\n\n@dataclass\nclass Config:\n    db: DBConfig = MISSING\n\ncs = ConfigStore.instance()\ncs.store(group="schema/db", name="mysql", node=MySQLConfig, package="db")\ncs.store(group="schema/db", name="postgresql", node=PostGreSQLConfig, package="db")\ncs.store(name="config", node=Config)\n\n@hydra.main(config_path="conf", config_name="config")\ndef my_app(cfg: Config) -> None:\n    print(OmegaConf.to_yaml(cfg))\n\nif __name__ == "__main__":\n    my_app()\n')),Object(o.b)("p",null,"When composing the config, we need to select both the schema and the actual config group option.\nThis is what the defaults list looks like:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml",metastring:'title="config.yaml"',title:'"config.yaml"'}),"defaults:\n  - schema/db: mysql\n  - db: mysql_staging\n")),Object(o.b)("p",null,"Let's dissect the how we store the schemas into the ",Object(o.b)("inlineCode",{parentName:"p"},"ConfigStore"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'cs.store(group="schema/db", name="mysql", node=MySQLConfig, package="db")\n')),Object(o.b)("p",null,"There are several notable things here:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"We use the group ",Object(o.b)("inlineCode",{parentName:"li"},"schema/db")," and not ",Object(o.b)("inlineCode",{parentName:"li"},"db"),".",Object(o.b)("br",{parentName:"li"}),"Config Groups are mutually exclusive, only one option can be selected from a Config Group. We want to select both the schema and the config.\nStoring all schemas in subgroups of the config group schema is good practice. This also helps in preventing name collisions."),Object(o.b)("li",{parentName:"ul"},"We need to specify the package to be ",Object(o.b)("inlineCode",{parentName:"li"},"db"),".\nBy default, the package for configs stored in the ",Object(o.b)("inlineCode",{parentName:"li"},"ConfigStore")," is ",Object(o.b)("inlineCode",{parentName:"li"},"_group_"),". We want to schematize ",Object(o.b)("inlineCode",{parentName:"li"},"db")," and not ",Object(o.b)("inlineCode",{parentName:"li"},"schema.db")," in the config so we have to override that. ")),Object(o.b)("p",null,"By default, we get the mysql staging config:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text",metastring:'title="$ python my_app.py"',title:'"$',python:!0,'my_app.py"':!0}),"db:\n  driver: mysql\n  host: mysql001.staging\n  encoding: utf-8\n")),Object(o.b)("p",null,"We can change both the schema and the config: "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text",metastring:'title="$ python my_app.py schema/db=postgresql db=postgresql_prod"',title:'"$',python:!0,"my_app.py":!0,"schema/db":"postgresql",db:'postgresql_prod"'}),"db:\n  driver: postgresql\n  host: postgresql01.prod\n  timeout: 10\n")),Object(o.b)("p",null,"If we try to use a postgresql config without changing the schema as well we will get an error:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text",metastring:'title="$ python my_app.py db=postgresql_prod"',title:'"$',python:!0,"my_app.py":!0,db:'postgresql_prod"'}),"Error merging db=postgresql_prod\nKey 'timeout' not in 'MySQLConfig'\n        full_key: db.timeout\n        reference_type=DBConfig\n        object_type=MySQLConfig\n")))}p.isMDXComponent=!0},236:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return d}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},m=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},g={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=p(n),b=a,d=m["".concat(i,".").concat(b)]||m[b]||g[b]||o;return n?r.a.createElement(d,c(c({ref:t},l),{},{components:n})):r.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);