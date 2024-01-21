"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-page",
  setup(__props) {
    const list_data = common_vendor.reactive({
      whole: [
        {
          index: 0,
          name: "查看全部订单",
          icon: "/static/detail/xiangyou-jiantou.svg",
          query: {}
        }
      ],
      list: [
        {
          index: 1,
          name: "待付款",
          icon: "/static/detail/daifukuan.svg",
          query: { pay_success: "not_pay" }
        },
        {
          index: 2,
          name: "待发货",
          icon: "/static/detail/daifahuo.svg",
          query: { pay_success: "success", deliver: "stay" }
        },
        {
          index: 3,
          name: "待收货",
          icon: "/static/detail/daishouhuo.svg",
          query: { pay_success: "success", deliver: "already" }
        },
        {
          index: 4,
          name: "待评价",
          icon: "/static/detail/daipingjia.svg",
          query: { pay_success: "success", deliver: "rece_goods", evaluate: false }
        }
      ]
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list_data.whole, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.icon,
            c: common_vendor.f(list_data.list, (item2, index2, i1) => {
              return {
                a: item2.icon,
                b: common_vendor.t(item2.name),
                c: index2
              };
            }),
            d: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9593e3f"], ["__file", "E:/Dessert/Dessert-user/pages/my-page/my-page.vue"]]);
wx.createPage(MiniProgramPage);
