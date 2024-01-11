"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Card-goods",
  props: { card: Array },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.card, (item, index, i0) => {
          return {
            a: item.goods_cover,
            b: common_vendor.t(item.goods_title),
            c: common_vendor.t(item.goods_price),
            d: common_vendor.t(item.sold),
            e: index
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f37602a7"], ["__file", "E:/Dessert/Dessert-user/pages/common-component/Card-goods.vue"]]);
wx.createComponent(Component);
