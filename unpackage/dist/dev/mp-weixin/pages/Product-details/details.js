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
      search_data.Custom_height = but_data.height + but_data.top;
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
    function swItch(index) {
      const cls = index === 0 ? ".swiper" : index === 1 ? ".eva" : ".img";
      const query = common_vendor.wx$1.createSelectorQuery();
      query.select(cls).boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec((res) => {
        common_vendor.wx$1.pageScrollTo({
          scrollTop: res[0].top + res[1].scrollTop - search_data.Custom_height,
          duration: 300
        });
        setTimeout(() => {
          search_data.trigger = index;
        }, 500);
      });
    }
    const db = common_vendor.wx$1.cloud.database();
    const result = common_vendor.reactive({
      goods_id: "",
      goods: [],
      collection: 0,
      login_coll: 0,
      sku_data: [],
      seckill: [],
      nu_sh_cart: 0,
      login_cart: 0,
      eva_num: 0,
      eva_data: []
    });
    const { goods_id, goods } = common_vendor.toRefs(result);
    common_vendor.onLoad((event) => {
      result.goods_id = event.goods_id;
      const goods2 = db.collection("goods").doc(event.goods_id).get();
      const collect = db.collection("collect_goods").where({ goods_id: event.goods_id }).get();
      const sku_data_a = db.collection("sku_data").where({ sku_id: event.goods_id }).field({ sku: true }).get();
      const seckill = db.collection("seckill").where({ goods_id: event.goods_id }).field({ ori_price: true, price_spike: true, seckill_time: true }).get();
      const nu_sh_cart = db.collection("sh_cart").count();
      const eva_num = db.collection("goods_eva").count();
      const eva_data = db.collection("goods_eva").where({ goods_id: event.goods_id }).limit(3).get();
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      Promise.all([goods2, collect, sku_data_a, seckill, nu_sh_cart, eva_num, eva_data]).then(async (res) => {
        await common_vendor.nextTick$1();
        console.log(res);
        result.goods = res[0].data;
        result.collection = user ? res[1].data.length : 0;
        result.login_coll = res[1].data.length;
        result.sku_data = res[2].data;
        result.seckill = res[3].data;
        result.nu_sh_cart = user ? res[4].total : 0;
        result.login_cart = res[4].total;
        result.eva_num = res[5].total;
        result.eva_data = res[6].data;
        viewheight();
      }).catch((err) => {
        console.log(err);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.f(common_vendor.unref(tab_name), (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index === common_vendor.unref(trigger) ? 1 : "",
            c: index,
            d: common_vendor.o(($event) => swItch(index), index)
          };
        }),
        c: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        e: common_vendor.s("padding-right:" + common_vendor.unref(S_width) + "px;"),
        f: common_vendor.unref(styleOpacity),
        g: common_vendor.unref(being),
        h: common_vendor.p({
          id: "select",
          goods: common_vendor.unref(goods)
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
