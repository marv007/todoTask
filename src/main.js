import Vue from "vue";
import "./plugins/axios";
import "./plugins/http_client";
import "./plugins/utils";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import vMask from "v-mask";
import "./assets/scss/variables.scss";

const moment = require("moment");
require("moment/locale/es");
Vue.prototype.moment = moment;
import momentTime from "moment-timezone";
Vue.use(vMask);
Vue.use(require("vue-moment"), {
  moment,
  momentTime,
});


import { regComponents } from "@/modules/utils/regComponents";
regComponents(Vue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (token) store.commit("setToken", token);
  },
  render: (h) => h(App),
}).$mount("#app");
