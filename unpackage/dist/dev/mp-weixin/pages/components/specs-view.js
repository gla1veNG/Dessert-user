"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const _sfc_main = {
  __name: "specs-view",
  props: { sku_data: Array, goods: Object },
  setup(__props) {
    const props = __props;
    const skudata = common_vendor.reactive({ goods: {} });
    const { goods } = common_vendor.toRefs(skudata);
    common_vendor.watch(props, (newVal, oldVal) => {
      console.log(newVal);
      skudata.goods = newVal.goods;
      if (newVal.sku_data.length === 0) {
        return false;
      }
      const sku_data = newVal.sku_data[0];
      const sku_name = sku_data.sku[0].att_data.map((item) => item.att_name);
      let att_length = sku_data.sku[0].att_data.length;
      for (let i = 0; i < sku_name.length; i++) {
        sku_data.sku.map((item) => {
          if (att_length === 1) {
            return { att_val: item.att_data[i].att_val, stock: item.stock };
          } else {
            return { att_val: item.att_data[i].att_val, act: false };
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(goods).goods_cover,
        b: common_vendor.t(common_vendor.unref(goods).goods_price),
        c: common_vendor.t(common_vendor.unref(goods).stock),
        d: common_vendor.o(($event) => common_vendor.unref(AccConfig_answer.sku_popup).show = false),
        e: common_vendor.t(common_vendor.unref(AccConfig_answer.sku_popup).judge === "j_sho" ? "加入购物车" : "立即购买"),
        f: common_vendor.unref(AccConfig_answer.sku_popup).show
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9366c3b2"], ["__file", "E:/Dessert/Dessert-user/pages/components/specs-view.vue"]]);
wx.createComponent(Component);
