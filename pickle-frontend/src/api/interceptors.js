import { defaultInstance } from "./axiosInstance";
import { getCookie } from "../utils/cookie";

//로그인 유지를 위해 Header에 토큰을 넣는 interceptors
defaultInstance.interceptors.request.use(
    function (config) {
      const accessToken = getCookie("accessToken");
  
      if (accessToken) {
        config.headers.common["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

//에러 일괄 처리하는 response 인터셉터
// defaultInstance.interceptors.use(
//     function (response) {
//       return response;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
// )