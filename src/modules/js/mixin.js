let mixin = {
  filters: {
    currency: function(value) {
      return parseFloat(value).toFixed(2);
    }
  }
};
export default mixin;
