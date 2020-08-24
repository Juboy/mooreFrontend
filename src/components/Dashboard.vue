<template>
  <div class="content-wrapper">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="card bg-white">
          <div class="card-body d-flex align-items-center justify-content-between">
            <h4 class="mt-1 mb-1">Hi, Welcome back!</h4>
            <!-- <button class="btn btn-info d-none d-md-block">Import</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Attendees</h4>
            <pie-chart v-if="attendee!=null" :chartData="attendee"></pie-chart>
          </div>
        </div>
      </div>
      <div class="col-lg-6 grid-margin stretch-card" v-if="isAdmin()">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card border-0 border-radius-2 bg-success">
              <div class="card-body">
                <div
                  class="d-flex flex-md-column flex-xl-row flex-wrap align-items-center justify-content-between"
                >
                  <div class="icon-rounded-inverse-success icon-rounded-lg">
                    <i class="mdi mdi-church"></i>
                  </div>
                  <div class="text-white">
                    <p
                      class="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left"
                    >Diocese</p>
                    <div
                      class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline"
                    >
                      <h3 class="mb-0 mb-md-1 mb-lg-0 mr-1">{{this.dioceseCount}}</h3>
                      <small class="mb-0">total</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 grid-margin stretch-card" v-if="isAdmin()">
            <div class="card border-0 border-radius-2 bg-info">
              <div class="card-body">
                <div
                  class="d-flex flex-md-column flex-xl-row flex-wrap align-items-center justify-content-between"
                >
                  <div class="icon-rounded-inverse-info icon-rounded-lg">
                    <i class="mdi mdi-microphone-variant"></i>
                  </div>
                  <div class="text-white">
                    <p
                      class="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left"
                    >Speakers</p>
                    <div
                      class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline"
                    >
                      <h3 class="mb-0 mb-md-1 mb-lg-0 mr-1">{{this.speakersCount}}</h3>
                      <small class="mb-0">total</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 grid-margin stretch-card" v-if="isAdmin()">
            <div class="card border-0 border-radius-2 bg-danger">
              <div class="card-body">
                <div
                  class="d-flex flex-md-column flex-xl-row flex-wrap align-items-center justify-content-between"
                >
                  <div class="icon-rounded-inverse-danger icon-rounded-lg">
                    <i class="mdi mdi-newspaper"></i>
                  </div>
                  <div class="text-white">
                    <p
                      class="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left"
                    >Blog Posts</p>
                    <div
                      class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline"
                    >
                      <h3 class="mb-0 mb-md-1 mb-lg-0 mr-1">{{this.blogCount}}</h3>
                      <small class="mb-0">total</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-12 grid-margin stretch-card" v-if="isSuperAdmin()">
            <div class="card border-0 border-radius-2 bg-warning">
              <div class="card-body">
                <div
                  class="d-flex flex-md-column flex-xl-row flex-wrap align-items-center justify-content-between"
                >
                  <div class="icon-rounded-inverse-warning icon-rounded-lg">
                    <i class="mdi mdi-account"></i>
                  </div>
                  <div class="text-white">
                    <p class="font-weight-medium mt-md-2 mt-xl-0 text-md-center text-xl-left">Users</p>
                    <div
                      class="d-flex flex-md-column flex-xl-row flex-wrap align-items-baseline align-items-md-center align-items-xl-baseline"
                    >
                      <h3 class="mb-0 mb-md-1 mb-lg-0 mr-1">{{this.userCount}}</h3>
                      <small class="mb-0">total</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from "./Charts/PieChart";
export default {
  data() {
    return {
      attendee: null,
      blogCount: null,
      dioceseCount: null,
      speakersCount: null,
      userCount: null,
    };
  },
  methods: {
    getStats: function () {
      this.$axios
        .get(process.env.VUE_APP_BACKEND + "stats")
        .then((response) => {
          if (response.data.status == 0) {
            this.attendee = response.data.attendee;
            if (this.isAdmin()) {
              this.blogCount = response.data.blog.total;
              this.dioceseCount = response.data.diocese.total;
              this.speakersCount = response.data.speakers.total;
            }
          } else this.$swal.fire("", response.data.message, "error");
        })
        .catch((err) => {
          this.$swal.fire("", err.message, "error");
        });
    },
  },
  mounted() {
    this.getStats();
  },
  components: {
    "pie-chart": Pie,
  },
};
</script>