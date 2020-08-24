import Vue from "vue";
import VueRouter from "vue-router";
import VueSweetalert2 from "vue-sweetalert2";
import VModal from "vue-js-modal";
import "sweetalert2/dist/sweetalert2.min.css";
import Axios from "axios";
import Vuex from "vuex";

import App from "./App.vue";
// import Dashboard from "./components/Dashboard";

import GetAttendee from "./components/Attendee/Get";
import Profile from "./components/Profile/Profile";

Vue.use(VueRouter);
Vue.use(VModal);
Vue.use(VueSweetalert2);
Vue.use(Vuex);
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

const routes = [
  // { path: "", component: Dashboard },
  { path: "", component: GetAttendee },
  // { path: "/user", component: User },
  { path: "/profile", component: Profile },
  // { path: '/signup', component: SignUp },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

const store = new Vuex.Store({
  state: {
    username:
      JSON.parse(localStorage.getItem("user")) == null
        ? ""
        : JSON.parse(localStorage.getItem("user")).name,
  },
  mutations: {
    changeUsername(state, newName) {
      state.username = newName;
    },
  },
});

new Vue({
  router: router,
  store: store,
  render: h => h(App),
}).$mount("#app");
