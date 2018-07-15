import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  theme: {
    primary: colors.blueGrey.darken4,
    secondary: colors.blueGrey.darken3,
    accent: colors.blue.darken3,
    error: colors.red.darken3,
    info: colors.blue.darken3,
    success: colors.green.darken3,
    warning: colors.orange.darken3
  }
});
