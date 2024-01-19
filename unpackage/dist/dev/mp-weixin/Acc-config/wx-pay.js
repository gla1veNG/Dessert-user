"use strict";
const common_vendor = require("../common/vendor.js");
const db = common_vendor.wx$1.cloud.database();
db.command;
let order_data = common_vendor.reactive({
  address: [],
  order_time: "",
  query_time: "",
  pay_success: "not_pay",
  deliver: "stay",
  evaluate: false,
  waybill_No: "",
  payment: {},
  Re_reason: "",
  out_trade_no: "",
  out_refund_no: ""
});
class Wxpay {
  // 提交订单到数据库
  suBmit(order, address, time, query_time, out_trade_no) {
    order_data.address = address;
    order_data.order_time = time;
    order_data.query_time = query_time;
    order_data.out_trade_no = out_trade_no;
    var new_order = order.map((item) => {
      return { ...item, ...order_data };
    });
    return new Promise((resolve, reject) => {
      new_order.forEach((item, index) => {
        try {
          db.collection("order_data").add({ data: item });
          if (index == new_order.length - 1) {
            resolve("success");
          }
        } catch (err) {
          reject(err);
        }
      });
    });
  }
  //请求云函数：获取统一下单返回的数据
  async pLace(price, outTradeno) {
    try {
      const res = await common_vendor.wx$1.cloud.callFunction({ name: "wx-pay", data: { price, outTradeno } });
      return res;
    } catch (err) {
      return { msg: "请求统一下单云函数出错", err };
    }
  }
}
exports.Wxpay = Wxpay;
