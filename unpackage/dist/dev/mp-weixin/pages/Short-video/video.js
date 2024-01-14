"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
require("../../Acc-config/public.js");
if (!Math) {
  (Comment + Login)();
}
const Comment = () => "./component/comment.js";
const Login = () => "../components/login-view.js";
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
      search_data.startVideo = false;
    }
    function pauseFun() {
      search_data.startVideo = true;
    }
    function videoPlay() {
      search_data.videoplay.play();
    }
    function allRound() {
      search_data.startVideo = search_data.startVideo ? false : true;
      if (search_data.startVideo) {
        search_data.videoplay.pause();
      } else {
        search_data.videoplay.play();
      }
    }
    const db = common_vendor.wx$1.cloud.database();
    const result = common_vendor.reactive({
      goods_id: "",
      video_data: {},
      total: 0,
      collection: 0,
      succ_login: 0
    });
    const { video_data, total, collection } = common_vendor.toRefs(result);
    common_vendor.onLoad(async (event) => {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      result.goods_id = event.goods_id;
      const card = await db.collection("goods").doc(event.goods_id).field({ video_url: true, goods_cover: true, goods_title: true, goods_price: true, seckill: true }).get();
      const count = await db.collection("video_comment").where({ goods_id: event.goods_id }).count();
      const collect = await db.collection("collect_goods").where({ goods_id: event.goods_id }).get();
      Promise.all([card, count, collect]).then(async (res) => {
        result.video_data = res[0].data;
        result.total = res[1].total;
        result.collection = user ? res[2].data.length : 0;
        result.succ_login = res[2].data.length;
        if (res[0].data.seckill) {
          const seckill = await db.collection("seckill").where({ goods_id: event.goods_id }).field({ price_spike: true }).get();
          result.video_data.goods_price = seckill.data[0].price_spike;
        }
      }).catch((err) => {
        console.log(err);
      });
    });
    async function toCollect() {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      if (!user) {
        AccConfig_answer.login_user.show = true;
        return false;
      }
      try {
        await db.collection("collect_goods").add({ data: { goods_id: result.goods_id } });
        result.collection++;
      } catch (e) {
        new Plublic().toast("收藏失败");
      }
    }
    async function canCollect() {
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      if (!user) {
        AccConfig_answer.login_user.show = true;
        return false;
      }
      try {
        await db.collection("collect_goods").where({ goods_id: result.goods_id }).remove();
        result.collection = 0;
      } catch (e) {
        new Plublic().toast("取消收藏失败");
      }
    }
    common_vendor.watch(() => AccConfig_answer.login_user.response, (newVal, oldVal) => {
      result.collection = result.succ_login;
    });
    function pull() {
      AccConfig_answer.comment_show.show = true;
      AccConfig_answer.comment_show.num++;
      AccConfig_answer.comment_show.goods_id = result.goods_id;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
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
        l: common_vendor.t(common_vendor.unref(total) === 0 ? "评论" : common_vendor.unref(total)),
        m: common_vendor.o(pull),
        n: common_vendor.unref(collection) <= 0
      }, common_vendor.unref(collection) <= 0 ? {
        o: common_vendor.o(toCollect)
      } : {
        p: common_vendor.o(canCollect)
      }, {
        q: common_vendor.t(common_vendor.unref(collection) > 0 ? "已收藏" : "收藏"),
        r: common_vendor.s("height:" + common_vendor.unref(winheight) + "px;")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ce84d55c"], ["__file", "E:/Dessert/Dessert-user/pages/Short-video/video.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
