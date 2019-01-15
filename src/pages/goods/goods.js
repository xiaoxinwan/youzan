import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import url from '../../modules/js/api.js'
import axios from 'axios'
import mixin from '../../modules/js/mixin.js'
import qs from 'qs'
import swipe from '../../components/Swipe.vue'
import { type } from 'os';

let {id} = qs.parse(location.href.substr(1))

let detailTab = ['商品乡情','成交数量']

new Vue({
  el: '#app',
  components: {swipe},
  data: {
    id,
    goodsDetails: null,
    detailTab,
    tabIndex: 0,
    goodsDeal: null,
    showSku: false,
    skuType: 1,
    skuNum: 1,
    isAddCart: false,
    showAddMessage: false
  },
  created(){
    this.getDetails()
  }, 
  methods:{
    getDetails(){
      axios.post(url.goodsDetails,{id}).then(res=>{
        this.goodsDetails = res.data.data
      })
    },
    changeTab(index){
      this.tabIndex = index
      if(index){
        this.getGoodsDeal()
      }
    },
    getGoodsDeal(){
      axios.post(url.goodsDeal,{id}).then(res=>{
        this.goodsDeal = res.data.data.lists
      })
    },
    chooseSku(type){
      this.showSku = true
      this.skuType = type
    },
    changeskuNum(num){
      if(num < 0 && this.skuNum === 1) return
      this.skuNum += num
    },
    addCart(){
      axios.post(url.addCart,{id, num: this.skuNum}).then(res=>{
        if(res.data.status === 200){
          this.showSku = false
          this.isAddCart = true
          this.showAddMessage = true
          setTimeout(()=>{
            this.showAddMessage = false
          },1000)
        }
      })
    }
  },
  watch:{
    showSku(val){
      document.body.style.overflow = val ? 'hidden' : 'auto'
      document.body.style.height = val ? '100%' : 'auto'
      document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
      document.querySelector('html').style.height = val ? '100%' : 'auto'
    }
  }
})