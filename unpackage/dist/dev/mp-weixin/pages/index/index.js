"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (Swiper + Flash + Card + Loading)();
}
const Swiper = () => "./component/swiper.js";
const Flash = () => "./component/flash-sale.js";
const Card = () => "../common-component/Card-goods.js";
const Loading = () => "../public-view/loading.js";
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
      banner: [],
      seckill: [],
      card: []
    });
    const { banner, seckill, card } = common_vendor.toRefs(result);
    async function goods() {
      const banner2 = await db.collection("banner").get();
      const seckill2 = await db.collection("seckill").field({ seckill_time: false }).get();
      const card2 = await db.collection("goods").where({ shelves: true }).limit(10).field({ goods_cover: true, goods_price: true, goods_title: true, sold: true, video_url: true }).orderBy("sold", "desc").get();
      Promise.all([banner2, seckill2, card2]).then((res) => {
        console.log(res);
        result.banner = res[0].data;
        result.seckill = res[1].data;
        result.card = res[2].data;
      }).catch((err) => {
        console.log(err);
      });
    }
    let page_n = common_vendor.ref(0);
    let loading = common_vendor.ref(false);
    common_vendor.onReachBottom(async () => {
      loading.value = true;
      page_n.value++;
      let sk = page_n.value * 10;
      const res_goods = await db.collection("goods").where({ shelves: true }).limit(10).skip(sk).field({ goods_cover: true, goods_price: true, goods_title: true, sold: true, video_url: true }).orderBy("sold", "desc").get();
      result.card = [...result.card, ...res_goods.data];
      loading.value = false;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        c: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        d: common_vendor.s("width:" + common_vendor.unref(S_left) + "px;"),
        e: common_vendor.s("height:" + common_vendor.unref(Custom_height) + "px;"),
        f: common_vendor.s("height:" + common_vendor.unref(Custom_height) + "px;"),
        g: common_vendor.p({
          banner: common_vendor.unref(banner)
        }),
        h: common_vendor.p({
          seckill: common_vendor.unref(seckill)
        }),
        i: common_vendor.p({
          card: common_vendor.unref(card)
        }),
        j: common_vendor.unref(loading)
      }, common_vendor.unref(loading) ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
