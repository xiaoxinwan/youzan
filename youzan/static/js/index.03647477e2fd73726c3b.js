webpackJsonp([3],{"035s":function(t,e){},"97Sy":function(t,e){},EE0t:function(t,e){},Ogb0:function(t,e){},TFhR:function(t,e,a){"use strict";var s={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",goodsDetails:"/goods/details",goodsDeal:"/goods/deal",goodsEvaluation:"/goods/evaluation",addCart:"/cart/add",updateCart:"/cart/update",cartlist:"/cart/list",reduceCart:"/cart/reduce",removeCart:"/cart/remove",mremoveCart:"/cart/mremove",addAddress:"/address/add",removeAddress:"/address/remove",addressList:"/address/list",updateAddress:"/address/update",setDefaultAddress:"/address/setDefault"};for(var n in s)s.hasOwnProperty(n)&&(s[n]="https://www.easy-mock.com/mock/5c3be71133a2af207aa9adec/youzan"+s[n]);e.a=s},U67u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("97Sy"),n=(a.n(s),a("bCKv")),i=a.n(n),r=a("035s"),o=(a.n(r),a("eChN")),c=(a.n(o),a("7+uW")),d=a("mtWM"),l=a.n(d),u=a("TFhR"),p=a("nq5D"),h=a("gN+L");c.default.use(i.a),new c.default({el:"#app",data:{lists:null,pageNum:1,pageSize:6,loading:!1,allLoaded:!1,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,l.a.post(u.a.hotLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){var a=e.data.lists;a.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(a):t.lists=a,t.loading=!1,t.pageNum++}))},getBanner:function(){var t=this;l.a.get(u.a.banner).then(function(e){t.bannerLists=e.data.lists})}},components:{Foot:p.a,Swipe:h.a}})},eChN:function(t,e){},"gN+L":function(t,e,a){"use strict";var s=a("DNVT"),n=(a("v2ns"),{name:"swipe",props:{lists:{type:Array,required:!0}},mounted:function(){new s.a(".swiper-container",{loop:!0,autoplay:{delay:2500,disableOnInteraction:!1},pagination:{el:".swiper-pagination"}})}}),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},this._l(this.lists,function(t){return e("div",{key:t.index,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.img}})])])})),this._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]};var r=a("VU/8")(n,i,!1,function(t){a("Ogb0")},null,null);e.a=r.exports},nq5D:function(t,e,a){"use strict";var s=a("mw3O"),n=a.n(s),i=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],r={data:function(){return{navConfig:i,curIndex:parseInt(n.a.parse(location.search.substr(1)).index)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(e,s){return a("li",{key:e.index,class:{active:s===t.curIndex},on:{click:function(a){t.changeNav(e,s)}}},[a("a",[a("i",{class:e.icon}),t._v(" "),a("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var c=a("VU/8")(r,o,!1,function(t){a("EE0t")},null,null);e.a=c.exports},v2ns:function(t,e){}},["U67u"]);
//# sourceMappingURL=index.03647477e2fd73726c3b.js.map