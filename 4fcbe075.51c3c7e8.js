(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{114:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var a=n(2),r=n(7),o=(n(0),n(236)),s={id:"objects",title:"Creating objects",sidebar_label:"Creating objects"},c={unversionedId:"patterns/objects",id:"version-0.11/patterns/objects",isDocsHomePage:!1,title:"Creating objects",description:"One of the best ways to drive different behavior in the application is to instantiate different implementations of an interface.",source:"@site/versioned_docs/version-0.11/patterns/objects.md",slug:"/patterns/objects",permalink:"/docs/0.11/patterns/objects",editUrl:"https://github.com/facebookresearch/hydra/edit/master/website/versioned_docs/version-0.11/patterns/objects.md",version:"0.11",lastUpdatedBy:"Omry Yadan",lastUpdatedAt:1601320700,sidebar_label:"Creating objects",sidebar:"version-0.11/docs",previous:{title:"Debugging",permalink:"/docs/0.11/tutorial/debugging"},next:{title:"Specializing configuration",permalink:"/docs/0.11/patterns/specializing_config"}},i=[],l={rightToc:i};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"One of the best ways to drive different behavior in the application is to instantiate different implementations of an interface.\nThe code using the instantiated object only knows the interface which remains constant, but the behavior\nis determined by the actual object instance."),Object(o.b)("p",null,"A Database connection interface may have a ",Object(o.b)("inlineCode",{parentName:"p"},"connect()")," method, implemented by different database drivers."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'class DBConnection:\n    def connect(self):\n        pass\n\nclass MySQLConnection(DBConnection):\n    def __init__(self, host, user, password):\n        self.host = host\n        self.user = user\n        self.password = password\n\n    def connect(self):\n        print(\n            "MySQL connecting to {} with user={} and password={}".format(\n                self.host, self.user, self.password\n            )\n        )\n\nclass PostgreSQLConnection(DBConnection):\n    def __init__(self, host, user, password, database):\n        self.host = host\n        self.user = user\n        self.password = password\n        self.database = database\n\n    def connect(self):\n        print(\n            "PostgreSQL connecting to {} "\n            "with user={} and password={} and database={}".format(\n                self.host, self.user, self.password, self.database\n            )\n        )\n')),Object(o.b)("p",null,"To support this, we can have a parallel config structure:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"conf/\n\u251c\u2500\u2500 config.yaml\n\u2514\u2500\u2500 db\n    \u251c\u2500\u2500 mysql.yaml\n    \u2514\u2500\u2500 postgresql.yaml\n")),Object(o.b)("p",null,"Config file: ",Object(o.b)("inlineCode",{parentName:"p"},"config.yaml")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"defaults:\n  - db: mysql\n")),Object(o.b)("p",null,"Config file: ",Object(o.b)("inlineCode",{parentName:"p"},"db/mysql.yaml")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"db:\n  class: tutorial.objects_example.objects.MySQLConnection\n  params:\n    host: localhost\n    user: root\n    password: 1234\n")),Object(o.b)("p",null,"db/postgresql.yaml:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"db:\n  class: tutorial.objects_example.objects.PostgreSQLConnection\n  params:\n    host: localhost\n    user: root\n    password: 1234\n    database: tutorial\n")),Object(o.b)("p",null,"With this, you can instantiate the object from the configuration with a single line of code:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'@hydra.main(config_path="conf/config.yaml")\ndef my_app(cfg):\n    connection = hydra.utils.instantiate(cfg.db)\n    connection.connect()\n')),Object(o.b)("p",null,"MySQL is the default per the ",Object(o.b)("inlineCode",{parentName:"p"},"config.yaml")," file:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"$ python my_app.py\nMySQL connecting to localhost with user=root and password=1234\n")),Object(o.b)("p",null,"Change the instantiated object class and override values from the command line:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"$ python my_app.py db=postgresql db.params.password=abcde\nPostgreSQL connecting to localhost with user=root and password=abcde and database=tutorial\n")))}p.isMDXComponent=!0},236:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return f}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},b=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),b=p(n),u=a,f=b["".concat(s,".").concat(u)]||b[u]||d[u]||o;return n?r.a.createElement(f,c(c({ref:t},l),{},{components:n})):r.a.createElement(f,c({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=u;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,s[1]=c;for(var l=2;l<o;l++)s[l]=n[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);