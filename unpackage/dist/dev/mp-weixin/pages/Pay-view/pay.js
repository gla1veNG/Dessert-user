"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    const db = common_vendor.wx$1.cloud.database();
    const re_data = common_vendor.reactive({ address: [] });
    const { address } = common_vendor.toRefs(re_data);
    common_vendor.onMounted(async () => {
      const res = await db.collection("re_address").where({ tacitly: true }).get();
      re_data.address = res.data;
    });
    function choIce() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/Re-address/address"
      });
    }
    common_vendor.watch(AccConfig_answer.new_address, (newVal, oldVal) => {
      re_data.address = [newVal.data];
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(address), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.mobile),
            c: common_vendor.t(item.district + item.address),
            d: index,
            e: common_vendor.o(choIce, index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/Pay-view/pay.vue"]]);
wx.createPage(MiniProgramPage);
