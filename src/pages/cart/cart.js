import "./cart_base.css";
import "./cart_trade.css";
import "./cart.css";

import Vue from "vue";
import axios from "axios";
import url from "js/api.js";
import mixin from "js/mixin.js";
import qs from "qs";

let { id } = qs.parse(location.search.substr(1));
new Vue({
  el: ".container",
  mixins: [mixin],
  data: {
    cartlists: null,
    total: 0,
    totalNum: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: ""
  },
  computed: {
    allSelected: {
      get() {
        if (this.cartlists && this.cartlists.length) {
          return this.cartlists.every(shop => {
            return shop.checked;
          });
        }
        return false;
      },
      set(newVal) {
        this.cartlists.forEach(shop => {
          shop.checked = newVal;
          shop.goodsList.forEach(good => {
            good.checked = newVal;
          });
        });
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingShop) {
          return this.editingShop.removeChecked;
        }
        return false;
      },
      set(newVal) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newVal;
          this.editingShop.goodsList.forEach(good => {
            good.removeChecked = newVal;
          });
        }
      }
    },
    selectLists() {
      if (this.cartlists && this.cartlists.length) {
        let totalNum = 0;
        let total = 0;
        let arr = [];
        this.cartlists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
              arr.push(good);
              totalNum += good.number;
              total += good.price * good.number;
            }
          });
        });
        this.totalNum = totalNum;
        this.total = total;
        return arr;
      }
      return [];
    },
    removeLists() {
      if (this.editingShop) {
        let arr = [];
        this.editingShop.goodsList.forEach(good => {
          if (good.removeChecked) {
            arr.push(good);
          }
        });
        return arr;
      }
      return [];
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.post(url.cartlist).then(res => {
        let lists = res.data.cartList;
        lists.forEach(shop => {
          shop.checked = true;
          shop.editing = false;
          shop.editingMsg = "编辑";
          shop.removeChecked = false;
          shop.goodsList.forEach(good => {
            good.checked = true;
            good.removeChecked = false;
          });
        });
        this.cartlists = lists;
      });
    },
    selectGood(shop, good) {
      let attr = this.editingShop ? "removeChecked" : "checked";
      good[attr] = !good[attr];
      shop[attr] = shop.goodsList.every(good => {
        return good[attr];
      });
    },
    selectShop(shop) {
      let attr = this.editingShop ? "removeChecked" : "checked";
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr];
      });
    },
    selectAll() {
      let attr = this.editingShop ? "allRemoveSelected" : "allSelected";
      this[attr] = !this[attr];
    },
    edit(shop, shopIndex) {
      shop.editing = !shop.editing;
      shop.editingMsg = shop.editing ? "完成" : "编辑";
      this.cartlists.forEach((item, i) => {
        if (shopIndex !== i) {
          item.editing = false;
          item.editingMsg = shop.editing ? "" : "编辑";
        }
      });
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1;
    },
    reduce(good) {
      if (good.number === 1) return;
      axios
        .post(url.reduceCart, {
          id: good.id,
          number: 1
        })
        .then(res => {
          good.number--;
        });
    },
    add(good) {
      axios
        .post(url.addCart, {
          id: good.id,
          number: 1
        })
        .then(res => {
          good.number++;
        });
    },
    remove(shop, shopIndex, good, goodIndex) {
      this.removePopup = true;
      this.removeData = { shop, shopIndex, good, goodIndex };
      this.removeMsg = "你确定要删除此商品吗？";
    },
    removeList() {
      this.removePopup = true;
      this.removeMsg = `你确定要删除${this.removeLists.length}个商品吗？`;
    },
    removeConfirm() {
      if (this.removeMsg === "你确定要删除此商品吗？") {
        let { shop, shopIndex, good, goodIndex } = this.removeData;
        axios
          .post(url.removeCart, {
            id: good.id
          })
          .then(res => {
            shop.goodsList.splice(goodIndex, 1);
            this.removePopup = false;
            if (!shop.goodsList.length) {
              this.cartlists.splice(shopIndex, 1);
              this.resetShop();
            }
          });
      }else{
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        axios.post(url.mremoveCart,{ids}).then(res=>{
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item =>{
              return item.id == good.id
            })
            if(index === -1){
              arr.push(good)
            }
          })
          if(arr.length){
            this.editingShop.goodsList = arr
          }else{
            this.cartlists.splice(this.editingShopIndex, 1)
            this.resetShop()
          }
          this.removePopup = false
        })
        
      }
    },
    cancel() {
      this.removePopup = false;
    },
    resetShop() {
      this.editingShop = null;
      this.editingShopIndex = -1;
      this.cartlists.forEach(shop => {
        shop.editing = false;
        shop.editingMsg = "编辑";
      });
    }
  }
});
