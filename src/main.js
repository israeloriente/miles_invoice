import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./theme/main.scss";
import "./theme/animations.scss";

Vue.config.productionTip = false;

// Event BUS
export const eventBus = new Vue();

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
