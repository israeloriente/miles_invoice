import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const colors = {
  primary: "#00a29a",
  primary_rgb: "0, 162, 154",
  primary_contrast: "#ffffff",
  primary_contrast_rgb: "255, 255, 255",
  primary_shade: "#008f88",
  primary_tint: "#1aaba4",
  secondary: "#ffffff",
  accent: "#",
  error: "#",
  info: "#",
  success: "#",
  warning: "#",
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
