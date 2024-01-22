"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
if (!Math) {
  Login();
}
const Login = () => "../components/login-view.js";
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
    common_vendor.onShow(() => {
      staTus();
    });
    const user = common_vendor.reactive({ user_infor: {}, exist: false });
    const { user_infor, exist } = common_vendor.toRefs(user);
    function staTus() {
      const user_data = common_vendor.wx$1.getStorageSync("user_infor");
      if (user_data) {
        user.exist = true;
        user.user_infor = user_data;
      } else {
        user.exist = false;
      }
    }
    function goLogin() {
      AccConfig_answer.login_user.show = true;
    }
    common_vendor.watch(() => AccConfig_answer.login_user.response, (newVal, oldVal) => {
      staTus();
    });
    function viewOrder(index, query) {
      if (user.exist) {
        let obj = JSON.stringify({ index, query });
        common_vendor.wx$1.navigateTo({
          url: `/pages/All-orders/order?obj=${obj}`
        });
      } else {
        AccConfig_answer.login_user.show = true;
      }
    }
    function getInfo() {
      if (user.exist) {
        common_vendor.wx$1.navigateTo({
          url: "/pages/Re-address/address"
        });
      } else {
        AccConfig_answer.login_user.show = true;
      }
    }
    function myCollect() {
      if (user.exist) {
        common_vendor.wx$1.navigateTo({
          url: "/pages/My-collection/collection"
        });
      } else {
        AccConfig_answer.login_user.show = true;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(exist)
      }, common_vendor.unref(exist) ? {
        b: common_vendor.unref(user_infor).avatarUrl,
        c: common_vendor.t(common_vendor.unref(user_infor).nickName)
      } : {
        e: common_vendor.o(goLogin)
      }, {
        d: !common_vendor.unref(exist),
        f: common_vendor.f(list_data.whole, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.icon,
            c: common_vendor.f(list_data.list, (item2, index2, i1) => {
              return {
                a: item2.icon,
                b: common_vendor.t(item2.name),
                c: index2,
                d: common_vendor.o(($event) => viewOrder(item2.index, item2.query), index2)
              };
            }),
            d: index,
            e: common_vendor.o(($event) => viewOrder(item.index, item.query), index)
          };
        }),
        g: common_vendor.o(myCollect),
        h: common_vendor.o(getInfo)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d9593e3f"], ["__file", "E:/Dessert/Dessert-user/pages/my-page/my-page.vue"]]);
wx.createPage(MiniProgramPage);
