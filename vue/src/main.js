/*!

 =========================================================
 * Vue Paper Dashboard - v2.0.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from "vue";
import App from "./App";
import router from "./router/index";

import PaperDashboard from "./plugins/paperDashboard";
import "vue-notifyjs/themes/default.css";
// import axios from "axios";
//import axiosCros from "vue-axios-cors";

Vue.use(PaperDashboard);
//Vue.use(axiosCros);

// axios.defaults.headers.common["Content-Type"] =
//   "application/x-www-form-urlencoded";
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
