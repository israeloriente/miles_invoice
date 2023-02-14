import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as Parse from "@/api/api.main.js";
import "./theme/main.scss";
import "./theme/animations.scss";
import 'popular-message/index.css';

Vue.config.productionTip = false;
Parse.initParse();

// Event BUS
export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
