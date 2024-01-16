"use strict";
const common_vendor = require("../../../common/vendor.js");
const AccConfig_answer = require("../../../Acc-config/answer.js");
require("../../../Acc-config/public.js");
const _sfc_main = {
  __name: "purchase",
  props: { goods_id: String, collection: Number, sku_data: Array, goods: Object },
  setup(__props) {
    const props = __props;
    const result = common_vendor.reactive({ collection: 0, goods_id: "" });
    const { collection } = common_vendor.toRefs(result);
    common_vendor.watch(props, (newVal, oldVal) => {
      console.log(newVal);
      let { collection: collection2, goods_id } = newVal;
      result.collection = collection2;
      result.goods_id = goods_id;
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(collection) <= 0
      }, common_vendor.unref(collection) <= 0 ? {} : {}, {
        b: common_vendor.t(common_vendor.unref(collection) > 0 ? "已收藏" : "收藏"),
        c: common_vendor.o(($event) => toCollect(common_vendor.unref(collection)))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-571f8077"], ["__file", "E:/Dessert/Dessert-user/pages/Product-details/component/purchase.vue"]]);
wx.createComponent(Component);
