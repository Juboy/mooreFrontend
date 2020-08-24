<template>
  <div class="container-fluid page-body-wrapper full-page-wrapper">
    <div class="content-wrapper d-flex align-items-stretch auth auth-img-bg">
      <div class="row flex-grow">
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="auth-form-transparent text-left p-3">
            <div class="brand-logo">
              <img src="http://www.urbanui.com/fily/template/images/logo-black.svg" alt="logo" />
            </div>
            <h4>New here?</h4>
            <h6 class="font-weight-light">Join us today! It takes only few steps</h6>
            <form class="pt-3" @submit.prevent="register()">
              <div class="form-group">
                <label>Username</label>
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-account-outline text-primary"></i>
                    </span>
                  </div>
                  <input
                    v-model="formDetails.name"
                    type="text"
                    class="form-control form-control-lg border-left-0"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Email</label>
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-email-outline text-primary"></i>
                    </span>
                  </div>
                  <input
                    v-model="formDetails.email"
                    type="email"
                    class="form-control form-control-lg border-left-0"
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Password</label>
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-lock-outline text-primary"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    v-model="formDetails.password"
                    class="form-control form-control-lg border-left-0"
                    id="exampleInputPassword"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Retype Password</label>
                <div class="input-group">
                  <div class="input-group-prepend bg-transparent">
                    <span class="input-group-text bg-transparent border-right-0">
                      <i class="mdi mdi-lock-outline text-primary"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    v-model="formDetails.rpassword"
                    class="form-control form-control-lg border-left-0"
                    placeholder="Password"
                    required
                  />
                </div>
                <label style="color:red">{{passwordMatch}}</label>
              </div>

              <div class="mt-3">
                <button
                  class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  :disabled="formDetails.password!=formDetails.rpassword"
                >SIGN UP</button>
              </div>
              <div class="text-center mt-4 font-weight-light">
                Already have an account?
                <a href="login.html" class="text-primary">Login</a>
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
export default {
  data() {
    return {
      year: new Date().getFullYear(),
      formDetails: {},
    };
  },
  computed: {
    passwordMatch: function () {
      return this.formDetails.password !== this.formDetails.rpassword
        ? "Password does not match"
        : "";
    },
  },
  methods: {
    valid: function () {
      return (
        this.formDetails.email != null && this.formDetails.password != null
      );
    },
    register: function () {
      if (this.valid()) {
        this.loginLoader = true;
        this.$axios
          .post(process.env.VUE_APP_BACKEND + "users", this.formDetails, {
            timeout: 60000,
          })
          .then((response) => {
            if (response.data.status == 0) {
              this.$swal.fire({
                type: "success",
                title: "Registration successful. Please Login",
                toast: true,
                position: "top-right",
                timer: 2000,
              });
              //   window.location.href = "/admin";
              this.$router.push({ path: "/login" });
              this.loginLoader = false;
            } else {
              this.$swal.fire({
                type: "error",
                title: "Couldn't register!",
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