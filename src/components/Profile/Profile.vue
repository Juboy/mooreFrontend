<template>
  <div class="content-wrapper">
    <div class="row grid-margin">
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">YOUR ACCOUNT SETTINGS</h4>
            <p class="card-description">Change settings here</p>
            <form
              class="forms-sample"
              enctype="multipart/form-data"
              @submit.prevent="changeDetails"
            >
              <div class="form-group">
                <label for="exampleInputUsername1">Email</label>
                <input type="text" class="form-control" v-model="formDetails.email" disabled />
              </div>
              <div class="form-group">
                <label for="exampleInputUsername1">Name</label>
                <input type="text" class="form-control" v-model="formDetails.name" required />
              </div>
              <button type="submit" class="btn btn-primary mr-2" :disabled="loader">
                <template v-if="!detailsLoader">Submit</template>
                <span v-else class="mdi mdi-spin mdi-loading"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">PASSWORD SETTINGS</h4>

            <form
              class="forms-sample"
              enctype="multipart/form-data"
              @submit.prevent="changePassword()"
            >
              <div class="form-group">
                <label for="exampleInputUsername1">Current Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordDetails.old_password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputUsername1">New Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordDetails.rnew_password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="exampleInputUsername1">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordDetails.new_password"
                  required
                />
                <code>{{ passwordStatus }}</code>
              </div>
              <button
                type="submit"
                class="btn btn-primary mr-2"
                :disabled="
                  loader ||
                    passwordDetails.new_password !==
                      passwordDetails.rnew_password
                "
              >
                <template v-if="!loader">Submit</template>
                <span v-else class="mdi mdi-spin mdi-loading"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formDetails: JSON.parse(localStorage.getItem("user")),
      passwordDetails: {},
      loader: false,
      detailsLoader: false,
    };
  },
  computed: {
    passwordStatus() {
      return this.passwordDetails.new_password !==
        this.passwordDetails.rnew_password
        ? "Password does not match"
        : "";
    },
  },

  methods: {
    changePassword: function () {
      if (
        this.passwordDetails.new_password !== this.passwordDetails.rnew_password
      ) {
        return;
      }
      this.loader = true;
      this.$axios
        .patch(
          process.env.VUE_APP_BACKEND + "users/password",
          this.passwordDetails
        )
        .then((response) => {
          if (response.data.status == 0) {
            localStorage.setItem("token", response.data.access_token);
            this.$swal.fire("", response.data.message, "success");
          } else this.$swal.fire("", response.data.message, "error");
          this.loader = false;
        })
        .catch(() => {
          this.loader = false;
        });
    },
    changeDetails: function () {
      this.detailsLoader = true;
      this.$axios
        .patch(process.env.VUE_APP_BACKEND + "users", this.formDetails)
        .then((response) => {
          if (response.data.status == 0) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            this.formDetails = response.data.user;
            this.$store.commit("changeUsername", response.data.user.name);
            this.$swal.fire("", response.data.message, "success");
          } else this.$swal.fire("", response.data.message, "error");
          this.detailsLoader = false;
        })
        .catch(() => {
          this.detailsLoader = false;
        });
    },
  },
};
</script>
