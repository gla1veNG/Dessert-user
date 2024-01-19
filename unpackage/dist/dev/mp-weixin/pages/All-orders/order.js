"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_Loading = common_vendor.resolveComponent("Loading");
  _component_Loading();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const re = common_vendor.ref(0);
    const data = common_vendor.reactive({
      tab: [
        {
          name: "全部",
          query: {}
        },
        {
          name: "待支付",
          query: {
            pay_success: "not_pay"
          }
        },
        {
          name: "待发货",
          query: {
            pay_success: "success",
            deliver: "stay"
          }
        },
        {
          name: "待收货",
          query: {
            pay_success: "success",
            deliver: "already"
          }
        },
        {
          name: "待评价",
          query: {
            pay_success: "success",
            deliver: "rece_goods",
            evaluate: false
          }
        }
      ]
    });
    const { tab } = common_vendor.toRefs(data);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(tab), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index === re.value ? 1 : "",
            c: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/All-orders/order.vue"]]);
wx.createPage(MiniProgramPage);
