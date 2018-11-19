let url = {
    hotLists: '/index/hotLists',
}

// 开发环境和真实环境的切换
let host = 'http://rap2api.taobao.org/app/mock/117941/GET'

for (const key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url