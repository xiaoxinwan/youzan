<template>
  <div class="container" style="min-height: 597px;">
    <div
      class="block-list address-list section section-first js-no-webview-block"
      v-if="addressLists && addressLists.length"
    >
      <a
        class="block-item js-address-item address-item"
        @click="toEdit(list)"
        v-for="list in addressLists"
        :key="list.id"
        :class="{'address-item-default': list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link
        class="btn btn-blue js-no-webview-block js-add-address-btn"
        :to="{path: 'form', query:{type:'add'}}"
      >新增地址</router-link>
    </div>
  </div>
</template>
<script>
import Address from "js/addressService.js";

export default {
  computed: {
    addressLists() {
      return this.$store.state.addressLists;
    }
  },
  created() {
    if (!this.addressLists) {
      this.$store.dispatch("getLists");
    }
  },
  methods: {
    toEdit(list) {
      // this.$router.push({ path: "/address/form" });
      this.$router.push({
        path: "form",
        query: { type: "edit", instance: list }
      });
    }
  }
};
</script>

<style scoped>
@import "./address_base.css";
@import "./address.css";
</style>
