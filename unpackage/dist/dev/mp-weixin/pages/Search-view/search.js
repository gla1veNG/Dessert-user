"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Card();
}
const Card = () => "../common-component/Card-goods.js";
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const keyword = common_vendor.ref("");
    function seArch() {
      let sear_array = common_vendor.wx$1.getStorageSync("search_key") || [];
      sear_array.unshift(keyword.value);
      common_vendor.wx$1.setStorageSync("search_key", sear_array);
      searchQuery();
    }
    const db = common_vendor.wx$1.cloud.database();
    const _ = db.command;
    const card = common_vendor.ref([]);
    async function searchQuery(sk = 0) {
      let query = _.or([
        {
          category: db.RegExp({
            regexp: keyword.value,
            options: "i"
          })
        },
        {
          goods_title: db.RegExp({
            regexp: keyword.value,
            options: "i"
          })
        }
      ]);
      const res = await db.collection("goods").where(query).limit(10).skip(sk).get();
      card.value = [...card.value, ...res.data];
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(seArch),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.o(seArch),
        e: common_vendor.p({
          card: card.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-547c4fd1"], ["__file", "E:/Dessert/Dessert-user/pages/Search-view/search.vue"]]);
wx.createPage(MiniProgramPage);
