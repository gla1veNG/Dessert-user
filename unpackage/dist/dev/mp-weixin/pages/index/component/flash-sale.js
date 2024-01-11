"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "flash-sale",
  props: { seckill: Array },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.seckill, (item, index, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.price_spike),
            d: common_vendor.t(item.ori_price),
            e: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-000992ed"], ["__file", "E:/Dessert/Dessert-user/pages/index/component/flash-sale.vue"]]);
wx.createComponent(Component);
