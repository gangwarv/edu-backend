(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-81338330"],{"06c2":function(e,n,t){"use strict";t.d(n,"b",(function(){return s})),t.d(n,"c",(function(){return c})),t.d(n,"d",(function(){return v})),t.d(n,"a",(function(){return f}));var r=t("8785"),i=t("9530"),o=t.n(i);function u(){var e=Object(r["a"])(["\n    mutation AddRole($id: String!){\n        deleteRole(id: $id){\n            id,\n            name,\n            privileges\n        }\n    }\n"]);return u=function(){return e},e}function a(){var e=Object(r["a"])(["\n    mutation AddRole($id: String, $name: String!, $privileges: String!){\n        addRole(id: $id, name: $name, privileges: $privileges){\n            id,\n            name,\n            privileges\n        }\n    }\n"]);return a=function(){return e},e}function l(){var e=Object(r["a"])(["\n    query GetRole($id: String!){\n        role(id: $id){\n            id,\n            name,\n            privileges\n        }\n    }\n"]);return l=function(){return e},e}function d(){var e=Object(r["a"])(["\n    query GetRoles{\n        roles{\n            id,\n            name,\n            privileges\n        }\n    }\n"]);return d=function(){return e},e}var s=o()(d()),c=o()(l()),v=o()(a()),f=o()(u())},c504:function(e,n,t){"use strict";t.r(n);var r=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"box"},[t("PageHeader",{attrs:{"header-text":"Role List",to:"/role","link-text":"Add New Role"}}),t("c-table",{attrs:{loading:e.$apollo.queries.roles.loading,columns:e.columns,data:e.roles,buttons:["edit","remove"]},on:{remove:e.remove,edit:e.edit}})],1)},i=[],o=(t("4de4"),t("06c2")),u={name:"RoleList",data:function(){return{error:null,columns:["name","privileges"]}},methods:{edit:function(e){var n=e.id;this.$router.push({path:"role",query:{id:n}})},remove:function(e){var n=e.id;confirm("Are you sure?")&&this.$observe(this.$apollo.mutate({mutation:o["a"],variables:{id:n},update:function(e,n){var t=n.data.deleteRole,r=e.readQuery({query:o["b"]});r.roles=r.roles.filter((function(e){return e.id!==t.id})),e.writeQuery({query:o["b"],data:r})}}),"D")}},apollo:{roles:o["b"]}},a=u,l=t("2877"),d=Object(l["a"])(a,r,i,!1,null,null,null);n["default"]=d.exports}}]);
//# sourceMappingURL=chunk-81338330.31105edb.js.map