"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const search_data = common_vendor.reactive({
      tab_name: ["商品", "评价", "详情"],
      S_height: 0,
      S_top: 0,
      S_width: 0,
      Custom_height: 0
    });
    const { tab_name, S_height, S_top, S_width, Custom_height } = common_vendor.toRefs(search_data);
    common_vendor.onMounted(() => {
      const but_data = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      search_data.S_height = but_data.height;
      search_data.S_top = but_data.top;
      search_data.S_width = but_data.width;
      search_data.Custom_height = but_data.height + but_data.top + 10;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.f(common_vendor.unref(tab_name), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        c: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        e: common_vendor.s("padding-right:" + common_vendor.unref(S_width) + "px;")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/Product-details/details.vue"]]);
wx.createPage(MiniProgramPage);
