"use strict";
const common_vendor = require("../common/vendor.js");
const db = common_vendor.wx$1.cloud.database();
class Public {
  constructor() {
  }
  // 登录
  login() {
    return new Promise((resolve, reject) => {
      common_vendor.wx$1.getUserProfile({
        desc: "获取用户信息",
        success: async (res) => {
          console.log(res);
          const query_openid = await db.collection("user_infor").get();
          if (query_openid.data.length > 0) {
            const user = query_openid.data[0];
            common_vendor.wx$1.setStorageSync("user_infor", { avatarUrl: user.avatarUrl, nickName: user.nickName, openid: user._openid });
          } else {
            await db.collection("user_infor").add({ data: { avatarUrl: res.userInfo.avatarUrl, nickName: res.userInfo.nickName, watch_num: 1, pay: true } });
            const query = await db.collection("user_infor").get();
            const user = query.data[0];
            common_vendor.wx$1.setStorageSync("user_infor", { avatarUrl: user.avatarUrl, nickName: user.nickName, openid: user._openid });
          }
          resolve("success");
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
  //消息提示框
  toast(title, icon = "none") {
    common_vendor.wx$1.showToast({
      title,
      icon,
      mask: true,
      duration: 800
    });
  }
}
exports.Public = Public;
