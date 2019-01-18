let url = {
    hotLists: '/index/hotLists',
    banner: '/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank',
    searchList: '/search/list',
    goodsDetails: '/goods/details',
    goodsDeal: '/goods/deal',
    goodsEvaluation: '/goods/evaluation',
    addCart: '/cart/add',
    updateCart: '/cart/update',
    cartlist: '/cart/list',
    reduceCart: '/cart/reduce',
    removeCart: '/cart/remove',
    mremoveCart: '/cart/mremove',
    addAddress: '/address/add',
    removeAddress: '/address/remove',
    addressList: '/address/list',
    updateAddress: '/address/update',
    setDefaultAddress: '/address/setDefault'
}

// 开发环境和真实环境的切换
let host = 'https://www.easy-mock.com/mock/5c3be71133a2af207aa9adec/youzan'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url