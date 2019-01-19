// 引入vue vuex
import Vue from 'vue'
import Vuex from 'vuex'
import Address from '../../../modules/js/addressService.js'
// 使用插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 应用层级的状态s
  state:{
    addressLists: null
  },
  // commit mutations是更改状态的唯一方法，并且这个过程是同步的
  mutations:{
    init(state, addressLists){
      state.addressLists = addressLists
    },
    add(state, instance){
      state.addressLists.push(instance)
    },
    remove(state, id){
      let lists = state.addressLists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists.splice(index, 1)
    },
    update(state, instance){
      let lists = JSON.parse(JSON.stringify(state.addressLists))
      let index = lists.findIndex(item =>{
        return item.id === instance.id
      })
      lists[index] = instance
      state.addressLists = lists
    },
    setDefault(state,id){
      let lists = state.addressLists
      lists.forEach(item =>{
        item.isDefault = item.id === id ? true : false 
      })
    }

  },
  // actions存放所有的异步逻辑
  actions:{
    getLists({commit}){
      Address.list().then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction({commit}, instance){
      Address.add(instance).then(res => {
        commit('add', instance)
      })
    },
    removeAction({commit}, id){
      Address.remove(id).then(res=>{
        commit('remove', id)
      })
    },
    updateAction({commit}, instance){
      Address.update(instance).then(res=>{
        commit('update', instance)
      })
    },
    setDefaultAction({commit}, id){
      Address.setDefault(id).then(res =>{
        commit('setDefault', id)
      })
    }
  }
})

export default store