"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Comment();
}
const Comment = () => "./component/comment.js";
const _sfc_main = {
  __name: "video",
  setup(__props) {
    const search_data = common_vendor.reactive({
      S_height: 0,
      S_top: 0,
      winheight: 0,
      videoplay: {},
      startVideo: true
    });
    const { S_height, S_top, winheight, startVideo } = common_vendor.toRefs(search_data);
    common_vendor.onMounted(() => {
      const but_data = common_vendor.wx$1.getMenuButtonBoundingClientRect();
      search_data.S_height = but_data.height;
      search_data.S_top = but_data.top;
      search_data.winheight = common_vendor.wx$1.getSystemInfoSync().screenHeight;
      search_data.videoplay = common_vendor.wx$1.createVideoContext("myVideo");
    });
    function playFun() {
      startVideo.value = false;
    }
    function pauseFun() {
      startVideo.value = true;
    }
    function videoPlay() {
      search_data.videoplay.play();
      startVideo.value = false;
    }
    function allRound() {
      startVideo.value = search_data.startVideo ? false : true;
      if (startVideo.value) {
        search_data.videoplay.pause();
      } else {
        search_data.videoplay.play();
      }
    }
    const result = common_vendor.reactive({ goods_id: "", video_data: {} });
    const db = common_vendor.wx$1.cloud.database();
    const { video_data } = common_vendor.toRefs(result);
    common_vendor.onLoad(async (event) => {
      result.goods_id = event.goods_id;
      const card = await db.collection("goods").doc(event.goods_id).field({ video_url: true, goods_cover: true, goods_title: true, goods_price: true, seckill: true }).get();
      const count = await db.collection("video_comment").where({ goods_id: event.goods_id }).count();
      const collect = await db.collection("collect_goods").where({ goods_id: event.goods_id }).get();
      Promise.all([card, count, collect]).then(async (res) => {
        result.video_data = res[0].data;
        if (res[0].data.seckill) {
          const seckill = await db.collection("seckill").where({ goods_id: event.goods_id }).field({ price_spike: true }).get();
          result.video_data.goods_price = seckill.data[0].price_spike;
        }
      }).catch((err) => {
        console.log(err);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s("height:" + common_vendor.unref(S_top) + "px;"),
        b: common_vendor.s("height:" + common_vendor.unref(S_height) + "px;"),
        c: common_vendor.s("height:" + common_vendor.unref(winheight) + "px;"),
        d: common_vendor.o(playFun),
        e: common_vendor.o(pauseFun),
        f: common_vendor.o(allRound),
        g: common_vendor.o(videoPlay),
        h: common_vendor.unref(startVideo),
        i: common_vendor.unref(video_data).goods_cover,
        j: common_vendor.t(common_vendor.unref(video_data).goods_price),
        k: common_vendor.t(common_vendor.unref(video_data).goods_title),
        l: common_vendor.s("height:" + common_vendor.unref(winheight) + "px;")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ce84d55c"], ["__file", "E:/Dessert/Dessert-user/pages/Short-video/video.vue"]]);
wx.createPage(MiniProgramPage);
