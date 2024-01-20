"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {
    a: _ctx.eav_text,
    b: common_vendor.o(($event) => _ctx.eav_text = $event.detail.value)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Dessert/Dessert-user/pages/Eav-goods/goods.vue"]]);
wx.createPage(MiniProgramPage);
