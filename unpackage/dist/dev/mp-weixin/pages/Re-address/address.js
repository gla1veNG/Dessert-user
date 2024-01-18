"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
if (!Math) {
  Address();
}
const Address = () => "./component/new-address.js";
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const db = common_vendor.wx$1.cloud.database();
    function newAddress() {
      AccConfig_answer.show.value = true;
    }
    common_vendor.onMounted(() => {
      getAdd();
    });
    const data = common_vendor.reactive({ address: {} });
    const { address } = common_vendor.toRefs(data);
    async function getAdd() {
      const res = await db.collection("re_address").get();
      data.address = res.data;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(address), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.mobile),
            c: common_vendor.t(item.district + item.address),
            d: item.tacitly
          }, item.tacitly ? {} : {}, {
            e: item.tacitly
          }, item.tacitly ? {} : {}, {
            f: common_vendor.t(item.tacitly ? "已设为默认" : "设为默认"),
            g: common_vendor.n(item.tacitly ? "Disable" : ""),
            h: index
          });
        }),
        b: common_vendor.unref(address).length === 0
      }, common_vendor.unref(address).length === 0 ? {} : {}, {
        c: common_vendor.o(newAddress)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/pages/Re-address/address.vue"]]);
wx.createPage(MiniProgramPage);
