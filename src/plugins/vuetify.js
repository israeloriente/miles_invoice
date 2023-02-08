import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const colors = {
  primary: "#00a29a",
  primary_contrast: "#ffffff",
  primary_shade: "#008f88",
  primary_tint: "#1aaba4",
  secondary: "#ffffff",
  // accent: "#",
  // error: "#",
  // info: "#",
  // success: "#",
  // warning: "#",
};

export default new Vuetify({
  options: {
    customProperties: true,
  },
  theme: {
    themes: {
      light: colors,
    },
  },
});
