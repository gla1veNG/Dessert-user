"use strict";
const common_vendor = require("../common/vendor.js");
const ORDER = common_vendor.reactive({
  order: {
    goods_id: "商品id",
    goods_image: "商品图片",
    goods_title: "商品标题",
    goods_price: "商品价格",
    buy_amount: "购买数量",
    specs: [],
    subtotal: 0,
    select: false
  },
  exist: false,
  //判断是是否存在秒杀或者秒杀开始或结束
  nu_sh_cart: 0
  //购物车数量
});
exports.ORDER = ORDER;
