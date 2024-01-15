"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Swipers + Eva + Img)();
}
const Swipers = () => "./component/swiper.js";
const Eva = () => "./component/evaluate.js";
const Img = () => "./component/image.js";
const _sfc_main = {
  __name: "details",
  setup(__props) {
    const search_data = common_vendor.reactive({
      tab_name: ["商品", "评价", "详情"],
      S_height: 0,
      S_top: 0,
      S_width: 0,
      Custom_height: 0,
      being: true,
      //显示隐藏导航栏
      styleOpacity: 0,
      //tab透明度
      trigger: 0
      //导航栏的下划线	
    });
    const { tab_name, S_height, S_top, S_width, Custom_height, being, styleOpacity, trigger } = common_vendor.toRefs(search_data);
    common_vendor.onMounted(() => {
      const but_data = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      search_data.S_height = but_data.height;
      search_data.S_top = but_data.top;
      search_data.S_width = but_data.width;
      search_data.Custom_height = but_data.height + but_data.top + 10;
    });
    let heightset = common_vendor.reactive({ hei: [] });
    function viewheight() {
      const query = common_vendor.wx$1.createSelectorQuery();
      query.selectAll("#select").boundingClientRect();
      query.exec((res) => {
        heightset.hei.push(res[0][0].height - search_data.Custom_height);
        heightset.hei.push(heightset.hei[0] + res[0][1].height);
        heightset.hei.push(heightset.hei[1] + res[0][2].height);
      });
    }
    common_vendor.onPageScroll((e) => {
      search_data.styleOpacity = e.scrollTop / 300;
      search_data.being = e.scrollTop === 0 ? false : true;
      let scrollTop = e.scrollTop;
      if (scrollTop >= heightset.hei[search_data.trigger]) {
        search_data.trigger += 1;
      } else if (scrollTop < heightset.hei[search_data.trigger - 1]) {
        search_data.trigger -= 1;
      }
    });
    common_vendor.onLoad((event) => {
      viewheight();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.f(common_vendor.unref(tab_name), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index === common_vendor.unref(trigger) ? 1 : "",
            c: index
          };
        }),
        c: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        e: common_vendor.s("padding-right:" + common_vendor.unref(S_width) + "px;"),
        f: common_vendor.unref(styleOpacity),
        g: common_vendor.unref(being),
        h: common_vendor.p({
          id: "select"
        }),
        i: common_vendor.p({
          id: "select"
        }),
        j: common_vendor.p({
          id: "select"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/Product-details/details.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
