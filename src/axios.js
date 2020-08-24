import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      originalRequest.url === process.env.VUE_APP_BACKEND + "token/refresh"
    ) {
      window.location = "/login";
      return Promise.reject(error);
    }
    if (error.response.status === 400) {
      window.location = "/login";
      // return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("token");
      return axios
        .post(process.env.VUE_APP_BACKEND + "token/refresh", {
          token: refreshToken,
        })
        .then((res) => {
          if (res.data.status === 0) {
            localStorage.setItem("token", res.data.access_token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("token");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
