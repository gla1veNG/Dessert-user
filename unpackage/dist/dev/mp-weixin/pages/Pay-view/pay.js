"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const AccConfig_orde_number = require("../../Acc-config/orde_number.js");
const AccConfig_wxPay = require("../../Acc-config/wx-pay.js");
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    common_vendor.hooks.locale("zh-cn");
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
    const or_data = common_vendor.reactive({ order: [], type: "", total_price: 0 });
    const { order, type, total_price } = common_vendor.toRefs(or_data);
    common_vendor.onLoad((event) => {
      const data = JSON.parse(event.order);
      or_data.order = data;
      or_data.type = event.type;
      let sum = 0;
      or_data.order.forEach((item) => sum += item.subtotal);
      or_data.total_price = parseFloat(sum.toFixed(10));
    });
    function reDuce() {
      or_data.order[0].buy_amount--;
      or_data.order[0].subtotal = parseFloat((or_data.order[0].goods_price * or_data.order[0].buy_amount).toFixed(10));
      or_data.total_price = or_data.order[0].subtotal;
    }
    function plUs() {
      or_data.order[0].buy_amount++;
      or_data.order[0].subtotal = parseFloat((or_data.order[0].goods_price * or_data.order[0].buy_amount).toFixed(10));
      or_data.total_price = or_data.order[0].subtotal;
    }
    async function subMit() {
      let time = common_vendor.hooks().utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
      let query_time = common_vendor.hooks().utcOffset(8).format("YYYY-MM-DD");
      or_data.order.forEach((item) => item.order_number = AccConfig_orde_number.coDe());
      let out_trade_no = AccConfig_orde_number.outTradeno();
      try {
        var payment = await new AccConfig_wxPay.Wxpay().pLace(or_data.total_price, out_trade_no);
        console.log(payment);
        const can_res = await new AccConfig_wxPay.Wxpay().suBmit(or_data.order, re_data.address, time, query_time, out_trade_no);
      } catch (e) {
        console.log(e);
      }
    }
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
        }),
        b: common_vendor.f(common_vendor.unref(order), (item, index, i0) => {
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
            e: common_vendor.t(item.goods_price)
          }, common_vendor.unref(type) != "direct" ? {
            f: common_vendor.t(item.buy_amount)
          } : {
            g: common_vendor.o(reDuce, index),
            h: common_vendor.n(item.buy_amount == 1 ? "prevent_style" : ""),
            i: common_vendor.t(item.buy_amount),
            j: common_vendor.o(plUs, index)
          }, {
            k: index
          });
        }),
        c: common_vendor.unref(type) != "direct",
        d: common_vendor.t(common_vendor.unref(total_price)),
        e: common_vendor.o(subMit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/Pay-view/pay.vue"]]);
wx.createPage(MiniProgramPage);
