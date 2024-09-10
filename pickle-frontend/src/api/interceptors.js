import { defaultInstance } from "./axiosInstance";
import { getCookie } from "../utils/cookie";

// 로그인 유지를 위해 Header에 토큰을 넣는 request 인터셉터
defaultInstance.interceptors.request.use(
  function (config) {
    console.log("0000"); // 인터셉터 실행 여부 확인
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken + "22"); // 토큰 확인

    if (accessToken) {
      config.headers.common["Authorization"] = `${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 에러 일괄 처리하는 response 인터셉터
defaultInstance.interceptors.response.use(
  function (response) {
    // 정상 응답일 경우 처리
    console.log("4531");
    return response;
  },
  function (error) {
    // 에러 일괄 처리
    return Promise.reject(error);
  }
);
