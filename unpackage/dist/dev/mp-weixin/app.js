"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/All-orders/order.js";
  "./pages/Eav-goods/goods.js";
  "./pages/Product-details/details.js";
  "./pages/Pay-view/pay.js";
  "./pages/Re-address/address.js";
  "./pages/index/index.js";
  "./pages/Short-video/video.js";
  "./pages/Search-view/search.js";
  "./pages/sort-view/sort-view.js";
  "./pages/shopping-cart/shopping-cart.js";
  "./pages/my-page/my-page.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.wx$1.cloud.init({
      env: "dessert-user-2gv61nata72c4681",
      traceUser: true
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Dessert/Dessert-user/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
