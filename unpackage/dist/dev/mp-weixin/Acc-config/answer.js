"use strict";
const common_vendor = require("../common/vendor.js");
let login_user = common_vendor.reactive({ show: false, response: "fail" });
let comment_show = common_vendor.reactive({ show: false, num: 1, goods_id: "" });
let sku_popup = common_vendor.reactive({ show: false, judge: "" });
let show = common_vendor.ref(false);
let modify = common_vendor.reactive({ data: [], id: "" });
let deci = common_vendor.ref("001");
let new_address = common_vendor.reactive({ data: [] });
exports.comment_show = comment_show;
exports.deci = deci;
exports.login_user = login_user;
exports.modify = modify;
exports.new_address = new_address;
exports.show = show;
exports.sku_popup = sku_popup;
