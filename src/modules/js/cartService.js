import fetch from 'js/fetch.js'
import url from 'js/api.js'


class Cart {
  static add(id){
    return fetch(url.addCart,{
      id: id,
      number: 1
    })
  }

  static reduce(id){
    return fetch(url.reduceCart, {
      id: id,
      number: 1
    })
  }
}

export default Cart