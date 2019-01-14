import "../../modules/css/common.css";
import "./search.css";

import Vue from "vue";
import axios from "axios";
import url from "js/api.js";
import qs from "qs";
import mixin from "../../modules/js/mixin";

let { keyword, id } = qs.parse(location.search.substr(1));

new Vue({
  el: ".container",
  mixins: [mixin],
  data: {
    keyword,
    isShow: false,
    searchList: null
  },
  created() {
    this.getSearchList();
  },
  methods: {
    getSearchList() {
      axios.post(url.searchList, { keyword, id }).then(res => {
        this.searchList = res.data.lists;
      });
    },
    move() {
      if (document.documentElement.scrollTop > 200) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    toTop() {
      window.scrollTo(0,0)
    }
  }
});
