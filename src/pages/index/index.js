import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);

import Foot from 'components/Foot.vue'

new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum: 1,
        pageSize: 6,
        loading: false, //true时不能加载
        allLoaded: false
    },
    created() {
        this.getLists()
    },
    methods: {
        getLists() {
            if(this.allLoaded) return
            this.loading = true
            axios.post(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                // 判断所有数据是否加载完毕
                if(curLists.length < this.pageSize){
                    this.allLoaded = true
                }
                if(this.lists){
                    this.lists = this.lists.concat(curLists)
                }else{
                    // 第一次请求数据
                    this.lists = curLists
                }
                this.loading = false
                this.pageNum++
            })
        }
    },
    components: {
        Foot
    }
})