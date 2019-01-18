import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Address {
  static list(){
    return fetch(url.addressList)
  }

  static add(data){
    return fetch(url.addAddress, data)
  }

  static remove(id){
    return fetch(url.removeAddress, id)
  }

  static update(data){
    return fetch(url.updateAddress, data)
  }

  static setDefault(id){
    return fetch(url.setDefaultAddress, id)
  }
}
export default Address