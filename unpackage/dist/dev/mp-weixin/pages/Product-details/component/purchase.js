"use strict";
const common_vendor = require("../../../common/vendor.js");
const AccConfig_placeOrder = require("../../../Acc-config/place-order.js");
const AccConfig_answer = require("../../../Acc-config/answer.js");
require("../../../Acc-config/public.js");
const _sfc_main = {
  __name: "purchase",
  props: { goods_id: String, collection: Number, sku_data: Array, goods: Object },
  setup(__props) {
    const props = __props;
    const result = common_vendor.reactive({ collection: 0, goods_id: "", whether: true, tips: "", goods: {} });
    const { collection, whether, tips } = common_vendor.toRefs(result);
    let cease = common_vendor.watch(props, (newVal, oldVal) => {
      let { collection: collection2, goods_id, goods } = newVal;
      result.collection = collection2;
      result.goods_id = goods_id;
      result.goods = goods;
      if (goods.shelves === false) {
        if (goods.stock <= 0) {
          result.whether = false;
          result.tips = "该商品已下架";
        } else {
          result.whether = false;
          result.tips = "该商品已下架";
        }
      } else if (goods.stock <= 0) {
        if (goods.shelves === false) {
          result.whether = false;
          result.tips = "该商品已下架";
        } else {
          result.whether = false;
          result.tips = "该商品已售完";
        }
      }
      cease();
    });
    const db = common_vendor.wx$1.cloud.database();
    async function toCollect(n) {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      if (!user) {
        AccConfig_answer.login_user.show = true;
        return false;
      }
      if (n === 0) {
        try {
          await db.collection("collect_goods").add({ data: { goods_id: result.goods_id } });
          result.collection++;
        } catch (e) {
          new Plublic().toast("收藏失败");
        }
      } else {
        try {
          await db.collection("collect_goods").where({ goods_id: result.goods_id }).remove();
          result.collection = 0;
        } catch (e) {
          new Plublic().toast("取消收藏失败");
        }
      }
    }
    common_vendor.onShareAppMessage(() => {
      return {
        title: result.goods.goods_title,
        path: `pages/Product-details/details?goods_id=${result.goods_id}`,
        imageUrl: result.goods.goods_cover
      };
    });
    function purChase(judge, sku) {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      if (!user) {
        AccConfig_answer.login_user.show = true;
        return false;
      }
      if (sku.length > 0) {
        AccConfig_answer.sku_popup.show = true;
        AccConfig_answer.sku_popup.judge = judge;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(AccConfig_placeOrder.ORDER).nu_sh_cart > 0
      }, common_vendor.unref(AccConfig_placeOrder.ORDER).nu_sh_cart > 0 ? {
        b: common_vendor.t(common_vendor.unref(AccConfig_placeOrder.ORDER).nu_sh_cart)
      } : {}, {
        c: common_vendor.unref(collection) <= 0
      }, common_vendor.unref(collection) <= 0 ? {} : {}, {
        d: common_vendor.t(common_vendor.unref(collection) > 0 ? "已收藏" : "收藏"),
        e: common_vendor.o(($event) => toCollect(common_vendor.unref(collection))),
        f: common_vendor.unref(whether)
      }, common_vendor.unref(whether) ? {
        g: common_vendor.o(($event) => purChase("j_sho", __props.sku_data))
      } : {}, {
        h: common_vendor.unref(whether)
      }, common_vendor.unref(whether) ? {
        i: common_vendor.o(($event) => purChase("j_pur", __props.sku_data))
      } : {
        j: common_vendor.t(common_vendor.unref(tips))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-571f8077"], ["__file", "E:/Dessert/Dessert-user/pages/Product-details/component/purchase.vue"]]);
wx.createComponent(Component);
