"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "swiper",
  props: { goods: Object },
  setup(__props) {
    const props = __props;
    const ban_length = common_vendor.ref(0);
    const current = common_vendor.ref(1);
    function changeCurrent(e) {
      current.value = e.detail.current + 1;
    }
    common_vendor.watch(props, (newVal, oldVal) => {
      console.log(newVal);
      ban_length.value = newVal.goods.goods_banner ? newVal.goods.goods_banner.length : 0;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.goods.goods_banner, (item, index, i0) => {
          return {
            a: item.image,
            b: index
          };
        }),
        b: common_vendor.o(changeCurrent),
        c: common_vendor.t(current.value),
        d: common_vendor.t(ban_length.value),
        e: common_vendor.t(__props.goods.goods_price),
        f: common_vendor.t(__props.goods.sold),
        g: common_vendor.t(__props.goods.goods_title)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3c116fde"], ["__file", "E:/Dessert/Dessert-user/pages/Product-details/component/swiper.vue"]]);
wx.createComponent(Component);
