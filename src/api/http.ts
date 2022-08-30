/**
 * 參考 https://muki.tw/tech/vue/vue3-vuex-axios-interceptor/
 */
import axios from "axios";
axios.defaults.withCredentials = true;
const $http = axios.create({
  baseURL: "/tc",
  withCredentials: true,
});

// 攔截回應
$http.interceptors.response.use(
  (res) => {
    switch (res.status) {
      case 200:
        return Promise.resolve(res);
      default:
        console.log(res.status);
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.error(error.response);
          break;
        case 401:
        case 419:
            $http.get('auth/sanctum/csrf-cookie').then(response => {
              let uri = window.location.search.substring(1); 
              $http.post('auth/shopify/login', Object.fromEntries(new URLSearchParams(uri)))
              .then(response => {
                // 登入成功
                console.log(response.data.message);
                window.location.reload();
                // window.location.href = response.data.redirect_url;
              })
              .catch(error => {
                if(error.response.status == 409) {
                  console.error(error.response.data.message);
                  window.location.href = error.response.data.redirect_url;
                }
              });
            });
          break;
        default:
          console.error("攔截錯誤請求", error.response.status);
          return Promise.reject(error);
      }
    }
  }
);

export default $http;
