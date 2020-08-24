<template>
  <div>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div
        class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
      >
        <a class="navbar-brand brand-logo" href="index.html">
          <!-- <img src="/images/logo.svg" alt="logo" /> -->
        </a>
        <a class="navbar-brand brand-logo-mini" href="index.html">
          <img src="http://www.urbanui.com/fily/template/images/logo-mini.svg" alt="logo" />
        </a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center">
        <button
          class="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span class="mdi mdi-menu"></span>
        </button>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item nav-search d-none d-md-flex" id="navbarSearch">
            <a
              class="nav-link d-flex justify-content-center align-items-center"
              id="navbarSearchButton"
              href="#"
            >
              <i class="mdi mdi-magnify mx-0"></i>
            </a>
            <input type="text" class="form-control" placeholder="Search..." id="navbarSearchInput" />
          </li>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item nav-profile dropdown mr-0 mr-sm-2">
            <a class="nav-link" href="#" data-toggle="dropdown" id="profileDropdown">
              <img src="images/faces/face28.jpg" alt="profile" />
              <span class="nav-profile-name">{{ name }}</span>
              <i class="mdi mdi-chevron-down"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="profileDropdown"
            >
              <router-link class="dropdown-item" to="profile">
                <i class="mdi mdi-face-profile text-primary"></i>
                Profile
              </router-link>
              <a class="dropdown-item" @click="logout()">
                <i class="mdi mdi-logout text-primary"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
        <button
          class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
        >
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
    <!-- partial -->
    <div class="container-fluid page-body-wrapper">
      <!-- partial:partials/_settings-panel.html -->
      <div class="theme-setting-wrapper">
        <div id="settings-trigger">
          <i class="mdi mdi-settings"></i>
        </div>
        <div id="theme-settings" class="settings-panel">
          <i class="settings-close mdi mdi-close"></i>
          <p class="settings-heading">SIDEBAR SKINS</p>
          <div class="sidebar-bg-options" id="sidebar-light-theme">
            <div class="img-ss rounded-circle bg-light border mr-3"></div>Light
          </div>
          <div class="sidebar-bg-options selected" id="sidebar-dark-theme">
            <div class="img-ss rounded-circle bg-dark border mr-3"></div>Dark
          </div>
          <p class="settings-heading mt-2">HEADER SKINS</p>
          <div class="color-tiles mx-0 px-4">
            <div class="tiles success"></div>
            <div class="tiles warning"></div>
            <div class="tiles danger"></div>
            <div class="tiles info"></div>
            <div class="tiles dark"></div>
            <div class="tiles default"></div>
          </div>
        </div>
      </div>
      <!-- partial -->
      <!-- partial:partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="mdi mdi-account-group menu-icon"></i>
              <span class="menu-title">Tasks</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="profile">
              <i class="mdi mdi-face-profile menu-icon"></i>
              <span class="menu-title">Profile</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="logout()">
              <i class="mdi mdi-logout menu-icon"></i>
              <span class="menu-title">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- partial -->
      <div class="main-panel">
        <router-view></router-view>
        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <footer class="footer">
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span
              class="text-muted text-center text-sm-left d-block d-sm-inline-block"
            >Copyright © {{ year }}. All rights reserved.</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Hand-crafted & made by
              <a href="tel:+2348034398179" target="_blank">Brains Technologies</a>
              <i class="mdi mdi-heart text-danger"></i>
            </span>
          </div>
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
  methods: {
    logout: function () {
      this.$axios
        .post(process.env.VUE_APP_BACKEND + "users/logout")
        .then((response) => {
          if (response.data.status == 0) {
            this.$swal.fire("", response.data.message, "success");
            localStorage.clear();
            this.$router.push({ path: "/login" });
          }
          localStorage.clear();
          this.$router.push({ path: "/login" });
        })
        .catch((err) => this.$swal.fire("", err.message, "error"));
    },
  },
  computed: {
    name: function () {
      return this.$store.state.username;
    },
  },
};
</script>
