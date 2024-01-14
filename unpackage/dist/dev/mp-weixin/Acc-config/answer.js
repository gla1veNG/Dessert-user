"use strict";
const common_vendor = require("../common/vendor.js");
let login_user = common_vendor.reactive({ show: false, response: "fail" });
exports.login_user = login_user;
