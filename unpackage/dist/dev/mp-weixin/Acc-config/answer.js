"use strict";
const common_vendor = require("../common/vendor.js");
let login_user = common_vendor.reactive({ show: false, response: "fail" });
let comment_show = common_vendor.reactive({ show: false, num: 1, goods_id: "" });
exports.comment_show = comment_show;
exports.login_user = login_user;
