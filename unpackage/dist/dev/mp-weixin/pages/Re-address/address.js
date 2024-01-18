"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
if (!Math) {
  Address();
}
const Address = () => "./component/new-address.js";
const _sfc_main = {
  __name: "address",
  setup(__props) {
    function newAddress() {
      AccConfig_answer.show.value = true;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(newAddress)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/Re-address/address.vue"]]);
wx.createPage(MiniProgramPage);
