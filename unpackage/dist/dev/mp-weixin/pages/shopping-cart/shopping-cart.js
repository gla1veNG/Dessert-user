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
    function seLect(index, select) {
      data.cart_data[index].select = data.cart_data[index].select ? false : true;
    }
    const totalPrice = common_vendor.computed(() => {
      let sum = 0;
      let all = [];
      data.cart_data.forEach((item) => {
        if (item.select) {
          sum += item.subtotal;
          all.push(item.select);
        }
      });
      return {
        price: parseFloat(sum.toFixed(10)),
        sele: all.length === data.cart_data.length ? true : false
      };
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(manage.value),
        b: common_vendor.o(manAge),
        c: common_vendor.f(common_vendor.unref(cart_data), (item, index, i0) => {
          return common_vendor.e({
            a: item.select
          }, item.select ? {
            b: common_vendor.o(($event) => seLect(index, item.select), index)
          } : {
            c: common_vendor.o(($event) => seLect(index, item.select), index)
          }, {
            d: item.goods_image,
            e: common_vendor.t(item.goods_title),
            f: item.specs.length > 0
          }, item.specs.length > 0 ? {
            g: common_vendor.f(item.specs, (item_a, index_a, i1) => {
              return {
                a: common_vendor.t(item_a.att_val),
                b: index_a
              };
            })
          } : {}, {
            h: common_vendor.t(item.goods_price),
            i: common_vendor.n(item.buy_amount == 1 ? "prevent_style" : ""),
            j: common_vendor.o(($event) => reDuce(index, item._id), index),
            k: common_vendor.t(item.buy_amount),
            l: common_vendor.o(($event) => plUs(index, item._id), index),
            m: index
          });
        }),
        d: common_vendor.unref(cart_data).length == 0
      }, common_vendor.unref(cart_data).length == 0 ? {} : {}, {
        e: common_vendor.unref(totalPrice).sele
      }, common_vendor.unref(totalPrice).sele ? {} : {}, {
        f: common_vendor.t(common_vendor.unref(totalPrice).price),
        g: common_vendor.t(manage.value === "管理" ? "结算" : "删除"),
        h: common_vendor.n(common_vendor.unref(totalPrice).price <= 0 ? "prevent_btn" : "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/shopping-cart/shopping-cart.vue"]]);
wx.createPage(MiniProgramPage);
