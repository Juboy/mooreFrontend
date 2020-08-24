<template>
  <div class="container-fluid page-body-wrapper full-page-wrapper">
    <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
      <div class="row flex-grow">
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="auth-form-transparent text-left p-3">
            <div class="brand-logo">
              <!-- Todo Put logo here -->
              <!-- <img src="http://www.urbanui.com/fily/template/images/logo-black.svg" alt="logo" /> -->
            </div>
            <h4>Welcome back!</h4>
            <h6 class="font-weight-light">Happy to see you again!</h6>
            <form class="pt-3" @submit.prevent="login()">
              <div class="form-group">
                <label for="exampleInputEmail">Email</label>
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-account-outline text-primary"></i>
                    </span>
                  </div>
                  <input
                    v-model="loginDetails.email"
                    type="text"
                    class="form-control form-control-lg border-left-0"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword">Password</label>
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-lock-outline text-primary"></i>
                    </span>
                  </div>
                  <input
                    v-model="loginDetails.password"
                    type="password"
                    class="form-control form-control-lg border-left-0"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <div class="my-3">
                <button
                  class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  :disabled="loginLoader"
                >
                  <template v-if="!loginLoader">LOGIN</template>
                  <span v-else class="mdi mdi-spin mdi-loading"></span>
                </button>
              </div>
              <div class="text-center mt-4 font-weight-light">
                Don't have an account?
                <router-link to="register" class="text-primary">Create</router-link>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-6 login-half-bg d-flex flex-row">
          <p
            class="text-white font-weight-medium text-center flex-grow align-self-end"
          >Copyright &copy; {{ year }} All rights reserved.</p>
        </div>
      </div>
    </div>
    <!-- content-wrapper ends -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      loginLoader: false,
      loginDetails: {
        email: null,
        password: null,
      },
    };
  },
  methods: {
    valid: function () {
      return (
        this.loginDetails.email != null && this.loginDetails.password != null
      );
    },
    login: function () {
      if (this.valid()) {
        this.loginLoader = true;
        axios
          .post(
            process.env.VUE_APP_BACKEND + "users/login",
            this.loginDetails,
            {
              timeout: 60000,
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
            }
          )
          .then((response) => {
            if (response.data.status == 0) {
              localStorage.setItem("token", response.data.access_token);
              localStorage.setItem("user", JSON.stringify(response.data.user));
              this.$store.commit("changeUsername", response.data.user.name);
              this.$swal.fire({
                type: "success",
                title: "Login successful",
                toast: true,
                position: "top-right",
                timer: 2000,
              });
              //   window.location.href = "/admin";
              this.$router.push({ path: "/" });
              this.loginLoader = false;
            } else {
              this.$swal.fire({
                type: "error",
                title: "Invalid credentials!",
                toast: true,
                position: "top-right",
                timer: 2000,
              });
              this.loginLoader = false;
            }
          })
          .catch(() => {
            // this.$swal.fire("", err.message, "warning");
            this.loginLoader = false;
          });
      }
    },
  },
};
</script>
