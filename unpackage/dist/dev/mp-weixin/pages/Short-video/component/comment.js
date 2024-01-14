"use strict";
const common_vendor = require("../../../common/vendor.js");
const AccConfig_answer = require("../../../Acc-config/answer.js");
const AccConfig_public = require("../../../Acc-config/public.js");
const _sfc_main = {
  __name: "comment",
  setup(__props) {
    common_vendor.hooks.locale("zh-cn");
    const db = common_vendor.wx$1.cloud.database();
    common_vendor.watch(AccConfig_answer.comment_show, (newVal, oldVal) => {
      if (newVal.show && AccConfig_answer.comment_show.num === 2) {
        relation.goods_id = comm_data.goods_id;
        called();
      }
    });
    function called() {
      console.log("9999");
    }
    const comm_data = common_vendor.reactive({
      content: "",
      comment: []
    });
    const { content, comment } = common_vendor.toRefs(comm_data);
    const relation = common_vendor.reactive({ goods_id: "" });
    async function sEnd() {
      if (comm_data.content.split(" ").join("").length === 0) {
        return false;
      }
      const user = common_vendor.wx$1.getStorageSync("user_infor");
      if (!user) {
        AccConfig_answer.login_user.show = true;
        return false;
      }
      let time = common_vendor.hooks().utcOffset(8).format("YYYY-MM-DD");
      const obj = {
        avatarurl: user.avatarurl,
        nickname: user.nickname,
        time,
        content: comm_data.content,
        goods_id: relation.goods_id
      };
      try {
        await db.collection("video_comment").add({ data: obj });
        comm_data.content = "";
        comm_data.comment.unshift(obj);
      } catch (e) {
        new AccConfig_public.Public().toast("评论失败");
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(AccConfig_answer.comment_show).show = false),
        b: common_vendor.f(common_vendor.unref(comment), (item, index, i0) => {
          return {
            a: item.avatarurl,
            b: common_vendor.t(item.nickname),
            c: common_vendor.t(item.time),
            d: common_vendor.t(item.content),
            e: index
          };
        }),
        c: common_vendor.unref(comment).length === 0
      }, common_vendor.unref(comment).length === 0 ? {} : {}, {
        d: common_vendor.unref(content),
        e: common_vendor.o(($event) => common_vendor.isRef(content) ? content.value = $event.detail.value : null),
        f: common_vendor.o(sEnd),
        g: common_vendor.unref(AccConfig_answer.comment_show).show
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3817507"], ["__file", "E:/Dessert/Dessert-user/pages/Short-video/component/comment.vue"]]);
wx.createComponent(Component);
