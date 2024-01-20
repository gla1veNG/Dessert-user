"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_orde_number = require("../../Acc-config/orde_number.js");
const AccConfig_public = require("../../Acc-config/public.js");
require("../../Acc-config/wx-pay.js");
if (!Math) {
  Loading();
}
const Loading = () => "../public-view/loading.js";
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const db = common_vendor.wx$1.cloud.database();
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
    common_vendor.onLoad((event) => {
      console.log(event);
      let LE = Object.keys(event).length;
      LE === 0 ? 0 : JSON.parse(event.obj).index;
      LE === 0 ? {} : JSON.parse(event.obj).query;
    });
    function swItch(index, query) {
      re.value = index;
      res_order.order_data = [];
      page_n.value = 0;
      getOrder(0, query);
    }
    const res_order = common_vendor.reactive({ order_data: [] });
    const { order_data } = common_vendor.toRefs(res_order);
    async function getOrder(sk, query) {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      query["_openid"] = user.openid;
      const res = await db.collection("order_data").where(query).limit(10).skip(sk).orderBy("order_time", "desc").get();
      console.log(res);
      res_order.order_data = [...res_order.order_data, ...res.data];
    }
    let loading = common_vendor.ref(false);
    let page_n = common_vendor.ref(0);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      page_n.value++;
      let sk = page_n.value * 10;
      await getOrder(sk, data.tab[re.value].query);
      loading.value = false;
    });
    async function goonPay(index, _id, subtotal, item) {
      total_price.value = subtotal;
      common_vendor.wx$1.showLoading({ title: "正在下单", mask: true });
      try {
        let out_trade_no = AccConfig_orde_number.outTradeno();
        result._id = _id;
        result.order_item = item;
        result.index = index;
        result.out_trade_no = out_trade_no;
        common_vendor.wx$1.hideLoading();
        show.value = true;
      } catch (err) {
        new AccConfig_public.Public().toast("支付发生错误");
      }
    }
    let result = common_vendor.reactive({ _id: "", payment: {}, order_item: [], index: -1, out_trade_no: "" });
    async function canOrder(_id, index) {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      await db.collection("order_data").where({ _openid: user.openid, _id }).update({ data: { pay_success: "can_order" } });
      if (re.value == 0) {
        res_order.order_data[index].pay_success = "can_order";
      } else {
        res_order.order_data.splice(index, 1);
      }
    }
    const itemList = common_vendor.ref(["七天无理由退换货", "商品信息描述不符", "质量问题", "包装/商品破损/污渍"]);
    function refUnd(index, _id) {
      common_vendor.wx$1.showActionSheet({
        alertText: "退款原因",
        itemList: itemList.value,
        success: async (res) => {
          const user = common_vendor.wx$1.getStorageSync("user_infor");
          await db.collection("order_data").where({ _openid: user.openid, _id }).update({ data: { deliver: "ref_pro", Re_reason: itemList.value[res.tapIndex] } });
          if (re.value == 0) {
            res_order.order_data[index].deliver = "ref_pro";
          } else {
            res_order.order_data.splice(index, 1);
          }
        },
        fail(res) {
          console.log(res.errMsg);
        }
      });
    }
    async function confRece(index, _id) {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      await db.collection("order_data").where({ _openid: user.openid, _id }).update({ data: { deliver: "rece_goods" } });
      if (re.value == 0) {
        res_order.order_data[index].deliver = "rece_goods";
      } else {
        res_order.order_data.splice(index, 1);
      }
    }
    common_vendor.ref("");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(tab), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index === re.value ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => swItch(index, item.query), index)
          };
        }),
        b: common_vendor.f(common_vendor.unref(order_data), (item, index, i0) => {
          return common_vendor.e({
            a: item.goods_image,
            b: common_vendor.t(item.goods_title),
            c: item.specs.length > 0
          }, item.specs.length > 0 ? {
            d: common_vendor.f(item.specs, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.att_val),
                b: index_a
              };
            })
          } : {}, {
            e: common_vendor.t(item.goods_price),
            f: common_vendor.t(item.buy_amount),
            g: common_vendor.t(item.subtotal),
            h: item.pay_success === "success"
          }, item.pay_success === "success" ? common_vendor.e({
            i: item.deliver === "stay"
          }, item.deliver === "stay" ? {
            j: common_vendor.o(($event) => refUnd(index, item._id), index)
          } : {}, {
            k: item.deliver === "already"
          }, item.deliver === "already" ? {
            l: common_vendor.o(($event) => confRece(index, item._id), index),
            m: common_vendor.o(($event) => refUnd(index, item._id), index)
          } : {}, {
            n: item.deliver === "rece_goods"
          }, item.deliver === "rece_goods" ? {
            o: common_vendor.o(($event) => refUnd(index, item._id), index)
          } : {}, {
            p: item.deliver === "ref_pro"
          }, item.deliver === "ref_pro" ? {} : {}, {
            q: item.deliver === "ref_succ"
          }, item.deliver === "ref_succ" ? {} : {}) : item.pay_success == "not_pay" ? {
            s: common_vendor.o(($event) => canOrder(item._id, index), index),
            t: common_vendor.o(($event) => goonPay(index, item._id, item.subtotal, item), index)
          } : item.pay_success == "can_order" ? {} : {}, {
            r: item.pay_success == "not_pay",
            v: item.pay_success == "can_order",
            w: index
          });
        }),
        c: common_vendor.unref(order_data).length == 0
      }, common_vendor.unref(order_data).length == 0 ? {} : {}, {
        d: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/All-orders/order.vue"]]);
wx.createPage(MiniProgramPage);
