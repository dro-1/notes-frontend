import axios from "axios";
import decode from "jwt-decode";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "https://dro-notes-api.herokuapp.com/graphql",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const csrfRefreshToken = localStorage.getItem("csrfRefreshToken") || "";
    let csrfToken = localStorage.getItem("csrfToken") || "";
    const decoded: any = decode(csrfToken);
    console.log(decoded.exp);
    if (new Date(Number(decoded.exp + "000")) < new Date()) {
      axios
        .get("https://dro-notes-api.herokuapp.com/refresh-token", {
          headers: {
            "Content-Type": "application/json",
            csrf_refresh_token: csrfRefreshToken,
          },
          withCredentials: true,
        })
        .then((response) => {
          csrfToken = response.data.csrfToken;
          localStorage.setItem("csrfToken", response.data.csrfToken);
          localStorage.setItem(
            "csrfRefreshToken",
            response.data.csrfRefreshToken
          );
        });
    }
    config.headers = {
      ...config.headers,
      csrf_token: csrfToken,
    };
    return config;
  },
  (err) => {
    console.log(err);
    return err;
  }
);

export default axiosInstance;
