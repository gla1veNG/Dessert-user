"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "shopping-cart",
  setup(__props) {
    const db = common_vendor.wx$1.cloud.database();
    common_vendor.onShow(() => {
      getCart();
    });
    const data = common_vendor.reactive({ cart_data: [] });
    const { cart_data } = common_vendor.toRefs(data);
    async function getCart() {
      const res = await db.collection("sh_cart").get();
      console.log(res);
      data.cart_data = res.data;
    }
    const manage = common_vendor.ref("管理");
    function manAge() {
      manage.value = manage.value === "管理" ? "完成" : "管理";
    }
    function reDuce(index, _id) {
      data.cart_data[index].buy_amount--;
      data.cart_data[index].subtotal = parseFloat((data.cart_data[index].goods_price * data.cart_data[index].buy_amount).toFixed(10));
      db.collection("sh_cart").doc(_id).update({ data: { buy_amount: data.cart_data[index].buy_amount, subtotal: data.cart_data[index].subtotal } });
    }
    function plUs(index, _id) {
      data.cart_data[index].buy_amount++;
      data.cart_data[index].subtotal = parseFloat((data.cart_data[index].goods_price * data.cart_data[index].buy_amount).toFixed(10));
      db.collection("sh_cart").doc(_id).update({ data: { buy_amount: data.cart_data[index].buy_amount, subtotal: data.cart_data[index].subtotal } });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(manage.value),
        b: common_vendor.o(manAge),
        c: common_vendor.f(common_vendor.unref(cart_data), (item, index, i0) => {
          return common_vendor.e({
            a: item.select
          }, item.select ? {} : {}, {
            b: item.goods_image,
            c: common_vendor.t(item.goods_title),
            d: item.specs.length > 0
          }, item.specs.length > 0 ? {
            e: common_vendor.f(item.specs, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.att_val),
                b: index_a
              };
            })
          } : {}, {
            f: common_vendor.t(item.goods_price),
            g: common_vendor.n(item.buy_amount == 1 ? "prevent_style" : ""),
            h: common_vendor.o(($event) => reDuce(index, item._id), index),
            i: common_vendor.t(item.buy_amount),
            j: common_vendor.o(($event) => plUs(index, item._id), index),
            k: index
          });
        }),
        d: common_vendor.unref(cart_data).length == 0
      }, common_vendor.unref(cart_data).length == 0 ? {} : {}, {
        e: common_vendor.t(manage.value === "管理" ? "结算" : "删除")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/shopping-cart/shopping-cart.vue"]]);
wx.createPage(MiniProgramPage);
