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
    select: false,
    //购物车是否选中
    SPECE_STR: ""
    //用于查询相同规格的
  },
  exist: false,
  //判断是是否存在秒杀或者秒杀开始或结束
  nu_sh_cart: 0
  //购物车数量
});
const db = common_vendor.wx$1.cloud.database();
const SHCART = function() {
  let subtotal = parseFloat(ORDER.order.goods_price * ORDER.order.buy_amount.toFixed(10));
  ORDER.order.subtotal = subtotal;
  let SPECE_STR = "";
  if (ORDER.order.specs.length > 0) {
    ORDER.order.specs.forEach((item) => SPECE_STR += item.att_val);
    ORDER.order.SPECE_STR = SPECE_STR;
  }
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.collection("sh_cart").where({ goods_id: ORDER.order.goods_id, SPECE_STR }).get();
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
