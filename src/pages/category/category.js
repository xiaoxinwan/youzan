import './category.css'
import 'css/common.css'


import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'

new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    methods: {
        getTopList(){
            axios.post(url.topList).then(res => {
                this.topLists = res.data.lists
            }).catch(res => {
                // 异常
            })
        },
        getSubList(index, id){
            this.topIndex = index
            if(index === 0){
                this.getRank()
            }else {
                axios.post(url.subList, {id}).then(res => {
                    this.subData = res.data.data
                })
            }
            
        },
        getRank(){
            axios.post(url.rank).then(res => {
                this.rankData = res.data.data
                console.log(11111)
                console.log(this.rankData)
            })
        }
    },
    components: {
        Foot
    },
    filters:{
        currency: function(value){
           return parseFloat(value).toFixed(2)
        }
    }
})