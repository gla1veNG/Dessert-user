"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const keyword = common_vendor.ref("");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.seArch && _ctx.seArch(...args)),
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.o((...args) => _ctx.seArch && _ctx.seArch(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-547c4fd1"], ["__file", "E:/Dessert/Dessert-user/pages/Search-view/search.vue"]]);
wx.createPage(MiniProgramPage);
