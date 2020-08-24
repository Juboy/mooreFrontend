<template>
  <app-login v-if="this.$route.path =='/login'"></app-login>
  <app-register v-else-if="this.$route.path =='/register'"></app-register>
  <app-frame v-else></app-frame>
</template>

<script>
import Login from "./Login";
import Frame from "./Frame";
import Register from "./Register";
export default {
  data() {
    return {};
  },
  components: {
    "app-login": Login,
    "app-frame": Frame,
    "app-register": Register,
  },
  beforeCreate() {
    if (localStorage.getItem("token") == null && this.$route.path != "/login") {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style>
</style>
