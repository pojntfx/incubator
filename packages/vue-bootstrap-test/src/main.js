import Vue from "vue";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import App from "@/App.vue";

import HomeRoute from "@/routes/HomeRoute.vue";

Vue.use(VueRouter);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

const router = new VueRouter({
  routes: [{ path: "/", component: HomeRoute }]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
