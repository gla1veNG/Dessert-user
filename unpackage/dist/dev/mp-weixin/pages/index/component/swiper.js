"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "swiper",
  props: { banner: Array },
  setup(__props) {
    const num = common_vendor.ref(0);
    function swiperFun(e) {
      num.value = e.detail.current;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.banner, (item, index, i0) => {
          return {
            a: item.banner_cover,
            b: index
          };
        }),
        b: common_vendor.o(swiperFun),
        c: common_vendor.f(__props.banner, (item, index, i0) => {
          return {
            a: index === num.value ? 1 : "",
            b: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e785d8dd"], ["__file", "E:/Dessert/Dessert-user/pages/index/component/swiper.vue"]]);
wx.createComponent(Component);
