"use strict";
const common_vendor = require("../../../common/vendor.js");
const AccConfig_answer = require("../../../Acc-config/answer.js");
const AccConfig_public = require("../../../Acc-config/public.js");
const _sfc_main = {
  __name: "new-address",
  emits: ["upLoad"],
  setup(__props, { emit: emits }) {
    const db = common_vendor.wx$1.cloud.database();
    const data = common_vendor.reactive({
      result: {
        name: "",
        //姓名
        mobile: "",
        //手机号码
        district: "",
        //省市区
        address: "",
        //详细地址
        tacitly: false
        //默认收货地址标示
      },
      _id: ""
      //用于判断是提交新数据还是修改数据
    });
    const { result, _id } = common_vendor.toRefs(data);
    let str = "";
    function regionFun(event) {
      str = "";
      event.detail.value.forEach((item) => str += item);
      data.result.district = str;
    }
    function subMit(_id2) {
      let phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      switch (true) {
        case data.result.name === "":
          new AccConfig_public.Public().toast("请填写姓名");
          break;
        case data.result.mobile === "":
          new AccConfig_public.Public().toast("请填写手机号码");
          break;
        case !phone.test(data.result.mobile):
          new AccConfig_public.Public().toast("请填写正确手机号码格式");
          break;
        case data.result.district === "":
          new AccConfig_public.Public().toast("请选择地址");
          break;
        case data.result.address === "":
          new AccConfig_public.Public().toast("请填写详细地址");
          break;
        default:
          database(_id2);
      }
    }
    async function database(_id2) {
      try {
        if (_id2 === "") {
          await db.collection("re_address").add({ data: data.result });
        } else {
          await db.collection("re_address").doc(_id2).update({ data: data.result });
        }
        AccConfig_answer.show.value = false;
        emits("upLoad");
        emPty();
      } catch (e) {
        new AccConfig_public.Public().toast("提交失败");
      }
    }
    function emPty() {
      data.result.name = "", //姓名
      data.result.mobile = "", //手机号码
      data.result.district = "", //省市区
      data.result.address = "", //详细地址
      data.result.tacitly = false, //默认收货地址标示
      data._id = "";
    }
    common_vendor.watch(AccConfig_answer.modify, (newVal, oldVal) => {
      let { name, mobile, district, address, tacitly, _id: _id2 } = newVal.data;
      data.result.name = name, //姓名
      data.result.mobile = mobile, //手机号码
      data.result.district = district, //省市区
      data.result.address = address, //详细地址
      data.result.tacitly = tacitly, //默认收货地址标示
      data._id = _id2;
    });
    common_vendor.watch(AccConfig_answer.deci, (newVal, oldVal) => {
      if (newVal === "002") {
        emPty();
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => AccConfig_answer.show.value = false),
        b: common_vendor.unref(result).name,
        c: common_vendor.o(($event) => common_vendor.unref(result).name = $event.detail.value),
        d: common_vendor.unref(result).mobile,
        e: common_vendor.o(($event) => common_vendor.unref(result).mobile = $event.detail.value),
        f: common_vendor.t(common_vendor.unref(result).district),
        g: common_vendor.o(regionFun),
        h: common_vendor.unref(result).address,
        i: common_vendor.o(($event) => common_vendor.unref(result).address = $event.detail.value),
        j: common_vendor.t(common_vendor.unref(_id) === "" ? "保存" : "修改地址"),
        k: common_vendor.o(($event) => subMit(common_vendor.unref(_id))),
        l: common_vendor.unref(AccConfig_answer.show)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5ecbd6ac"], ["__file", "E:/Dessert/Dessert-user/pages/Re-address/component/new-address.vue"]]);
wx.createComponent(Component);
