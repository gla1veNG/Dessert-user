"use strict";
const common_vendor = require("../../../common/vendor.js");
const AccConfig_answer = require("../../../Acc-config/answer.js");
const _sfc_main = {
  __name: "new-address",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => AccConfig_answer.show.value = false),
        b: common_vendor.unref(AccConfig_answer.show)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ecbd6ac"], ["__file", "E:/Dessert/Dessert-user/pages/Re-address/component/new-address.vue"]]);
wx.createComponent(Component);
