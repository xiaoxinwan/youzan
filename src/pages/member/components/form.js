import Address from 'js/addressService.js'


export default {
  data(){
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: this.$route.query.type,
      instance: this.$route.query.instance,
      addressData: require('js/address.json'),
      cityList: null,
      districtList: null
    }
  },
  watch: {
    provinceValue(val){
      if(val === -1 ) return   // val等于-1相当于第一级，直接返回
      let list = this.addressData.list // 将addressData的list赋值给一个变量，下面直接找出与val相等的省份，
      let index = list.findIndex(item => {  
        return item.value === val
      })
      this.cityList = list[index].children // 将省份列表中对应的城市赋值
      this.cityValue = -1 // 还原cityValue 和 districtValue
      this.districtValue = -1
      if(this.type === 'edit'){
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue(val){
      if(val === -1) return
      let list = this.cityList
      let index = list.findIndex(item => {
        return item.value === val
      })
      this.districtList = list[index].children
      this.districtValue = -1
      if(this.type==='edit'){
        this.districtValue = parseInt(this.instance.districtValue)

      }
    }
  },
  created(){
    if(this.type === 'edit'){
      this.id = this.instance.id
      this.provinceValue = this.instance.provinceValue
      this.name = this.instance.name
      this.tel = this.instance.tel
      this.address = this.instance.address
    }
  },
  methods:{
    add(){
      let {name, tel, provinceValue, cityValue, districtValue, address} = this
      let data = {name, tel, provinceValue, cityValue, districtValue, address}
      if(this.type === 'add'){
        Address.add(data).then(res=>{
          this.$router.go(-1)
        })
      }
      if(this.type === 'edit'){
        data.id = this.id
        Address.update(data).then(res=>{
          this.$router.go(-1)
        })
      }
    },
    remove(){
      if(window.confirm('确定删除？')){
        Address.remove(this.id).then(res=>{
          this.$router.go(-1)
        })
      }
    },
    setDefault(){
      Address.setDefault(this.id).then(res=>{
        this.$router.go(-1)
      })
    }
  }
}