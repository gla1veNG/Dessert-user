"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_kuaidi = require("../../Acc-config/kuaidi.js");
const _sfc_main = {
  __name: "tracking",
  setup(__props) {
    common_vendor.onLoad((event) => {
      post();
    });
    function getParams() {
      let param = { com: "", num: "78761109176510" };
      let md = common_vendor.md5(JSON.stringify(param) + AccConfig_kuaidi.KEY + AccConfig_kuaidi.CUSTOMER).toUpperCase();
      let obj = { customer: AccConfig_kuaidi.CUSTOMER, sign: md, param: JSON.stringify(param) };
      return obj;
    }
    function post() {
      common_vendor.index.request({
        url: AccConfig_kuaidi.URL,
        method: "POST",
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data: getParams()
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5471d0b2"], ["__file", "E:/Dessert/Dessert-user/pages/Order-tracking/tracking.vue"]]);
wx.createPage(MiniProgramPage);
