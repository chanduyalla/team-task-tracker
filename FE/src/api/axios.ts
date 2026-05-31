import axios from "axios";

const baseURL = import.meta.env.VITE_BASEURL;
const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  //   console.log("token", token);
  if (token) {
    // console.log("config header", config);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  refreshSubscribers.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshSubscribers.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers)
            originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const res = await axios.post(`${baseURL}/auth/refresh`, {
        refreshToken,
      });

      console.log("res", res);

      const newAccessToken = res.data.data.accessToken;
      const newRefreshToken = res.data.data.refreshToken;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      if (originalRequest.headers)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (err) {
      processQueue(err, null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
