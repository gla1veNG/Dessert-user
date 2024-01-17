"use strict";
const common_vendor = require("../common/vendor.js");
const ORDER = common_vendor.reactive({
  order: {
    goods_id: "",
    //商品id
    goods_image: "",
    //商品图片
    goods_title: "",
    //商品标题
    goods_price: 0,
    //商品价格
    buy_amount: 0,
    //购买数量
    specs: [],
    //规格
    subtotal: 0,
    //总价
    select: false
    //购物车是否选中
  },
  exist: false,
  //判断是是否存在秒杀或者秒杀开始或结束
  nu_sh_cart: 0
  //购物车数量
});
const db = common_vendor.wx$1.cloud.database();
const _ = db.command;
const SHCART = function() {
  let subtotal = parseFloat(ORDER.order.goods_price * ORDER.order.buy_amount.toFixed(10));
  ORDER.order.subtotal = subtotal;
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.collection("sh_cart").where({ goods_id: ORDER.order.goods_id, specs: _.eq(ORDER.order.specs) }).get();
      if (res.data.length > 0) {
        resolve("加入购物车成功");
      } else {
        await db.collection("sh_cart").add({ data: ORDER.order });
        ORDER.nu_sh_cart += 1;
        resolve("加入购物车成功");
      }
    } catch (e) {
      reject("加入购物车失败");
    }
  });
};
exports.ORDER = ORDER;
exports.SHCART = SHCART;
