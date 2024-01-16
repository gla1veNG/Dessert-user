"use strict";
const common_vendor = require("../../common/vendor.js");
const AccConfig_answer = require("../../Acc-config/answer.js");
const _sfc_main = {
  __name: "specs-view",
  props: { sku_data: Array, goods: Object },
  setup(__props) {
    const props = __props;
    const skudata = common_vendor.reactive({ goods: {}, new_sku: [] });
    const { goods, new_sku } = common_vendor.toRefs(skudata);
    common_vendor.watch(props, (newVal, oldVal) => {
      console.log(newVal);
      skudata.goods = newVal.goods;
      if (newVal.sku_data.length === 0) {
        return false;
      }
      const sku_data = newVal.sku_data[0];
      const sku_name = sku_data.sku[0].att_data.map((item) => item.att_name);
      let new_sku2 = [];
      let att_length = sku_data.sku[0].att_data.length;
      for (let i = 0; i < sku_name.length; i++) {
        let res = sku_data.sku.map((item) => {
          if (att_length === 1) {
            return { att_val: item.att_data[i].att_val, stock: item.stock };
          } else {
            return { att_val: item.att_data[i].att_val, act: false };
          }
        });
        let obj = {};
        let removal = res.reduce((prev, item) => {
          if (!obj[item.att_val]) {
            prev.push(item);
            obj[item.att_val] = true;
          }
          return prev;
        }, []);
        new_sku2.push({ att_name: sku_name[i], sku: removal });
      }
      skudata.new_sku = new_sku2;
    });
    const selectdata = common_vendor.reactive({ select: [], seleIndex: [] });
    const { select, seleIndex } = common_vendor.toRefs(selectdata);
    function choIce(att_val, att_name, index, index_one) {
      let IN = selectdata.select.findIndex((item) => item.att_name === att_name);
      if (IN > -1) {
        let MB = selectdata.select.findIndex((item) => item.att_val === att_val);
        if (MB > -1) {
          selectdata.select.splice(IN, 1);
          selectdata.seleIndex[index] = -1;
        } else {
          selectdata.select[IN] = { att_name, att_val };
          selectdata.seleIndex[index] = index_one;
        }
      } else {
        selectdata.select.push({ att_name, att_val });
        selectdata.seleIndex[index] = index_one;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(goods).goods_cover,
        b: common_vendor.t(common_vendor.unref(goods).goods_price),
        c: common_vendor.t(common_vendor.unref(goods).stock),
        d: common_vendor.t(common_vendor.unref(select).length > 0 ? "已选择：" : "请选择"),
        e: common_vendor.unref(select).length === 0
      }, common_vendor.unref(select).length === 0 ? {
        f: common_vendor.f(common_vendor.unref(new_sku), (item, index, i0) => {
          return {
            a: common_vendor.t(item.att_name),
            b: index
          };
        })
      } : {
        g: common_vendor.f(common_vendor.unref(select), (item, index, i0) => {
          return {
            a: common_vendor.t(item.att_val),
            b: index
          };
        })
      }, {
        h: common_vendor.o(($event) => common_vendor.unref(AccConfig_answer.sku_popup).show = false),
        i: common_vendor.unref(new_sku).length === 1
      }, common_vendor.unref(new_sku).length === 1 ? {
        j: common_vendor.f(common_vendor.unref(new_sku), (item, index, i0) => {
          return {
            a: common_vendor.t(item.att_name),
            b: common_vendor.f(item.sku, (item_one, index_one, i1) => {
              return {
                a: common_vendor.t(item_one.att_val),
                b: common_vendor.n(item_one.stock === 0 ? "prevent_style" : ""),
                c: common_vendor.n(common_vendor.unref(seleIndex)[index] === index_one ? "new_style" : ""),
                d: common_vendor.o(($event) => choIce(item_one.att_val, item.att_name, index, index_one), index)
              };
            }),
            c: index,
            d: index
          };
        })
      } : {
        k: common_vendor.f(common_vendor.unref(new_sku), (item, index, i0) => {
          return {
            a: common_vendor.t(item.att_name),
            b: common_vendor.f(item.sku, (item_one, index_one, i1) => {
              return {
                a: common_vendor.t(item_one.att_val),
                b: common_vendor.n(item_one.act === 0 ? "prevent_style" : ""),
                c: common_vendor.n(common_vendor.unref(seleIndex)[index] === index_one ? "new_style" : ""),
                d: common_vendor.o(($event) => choIce(item_one.att_val, item.att_name, index, index_one), index)
              };
            }),
            c: index,
            d: index
          };
        })
      }, {
        l: common_vendor.t(common_vendor.unref(AccConfig_answer.sku_popup).judge === "j_sho" ? "加入购物车" : "立即购买"),
        m: common_vendor.unref(AccConfig_answer.sku_popup).show
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9366c3b2"], ["__file", "E:/Dessert/Dessert-user/pages/components/specs-view.vue"]]);
wx.createComponent(Component);
