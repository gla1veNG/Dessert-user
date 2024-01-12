"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const keyword = common_vendor.ref("");
    function seArch() {
      console.log(keyword.value);
      let sear_array = common_vendor.wx$1.getStorageSync("search_key") || [];
      sear_array.unshift(keyword.value);
      common_vendor.wx$1.setStorageSync("search_key", sear_array);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(seArch),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.o(seArch)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-547c4fd1"], ["__file", "E:/Dessert/Dessert-user/pages/Search-view/search.vue"]]);
wx.createPage(MiniProgramPage);
