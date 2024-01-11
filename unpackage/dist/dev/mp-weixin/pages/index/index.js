"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Swiper();
}
const Swiper = () => "./component/swiper.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const db = common_vendor.wx$1.cloud.database();
    const search_data = common_vendor.reactive({
      S_height: 0,
      S_top: 0,
      S_left: 0,
      Custom_height: 0
    });
    const { S_height, S_top, S_left, Custom_height } = common_vendor.toRefs(search_data);
    common_vendor.onMounted(() => {
      const but_data = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      search_data.S_height = but_data.height;
      search_data.S_top = but_data.top;
      search_data.S_left = but_data.left - 30;
      search_data.Custom_height = but_data.height + but_data.top + 10;
      goods();
    });
    const result = common_vendor.reactive({
      banner: []
    });
    const { banner } = common_vendor.toRefs(result);
    async function goods() {
      const banner2 = await db.collection("banner").get();
      Promise.all([banner2]).then((res) => {
        console.log(res);
        result.banner = res[0].data;
      }).catch((err) => {
        console.log(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        c: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("width:" + common_vendor.unref(S_left) + "px;"),
        e: common_vendor.s("height:" + common_vendor.unref(Custom_height) + "px;"),
        f: common_vendor.s("height:" + common_vendor.unref(Custom_height) + "px;"),
        g: common_vendor.p({
          banner: common_vendor.unref(banner)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
