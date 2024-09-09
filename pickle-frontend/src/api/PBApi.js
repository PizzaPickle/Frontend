/**
 * PB관련된 api 요청 함수 모음
 */
import { backtestInstance } from "./axiosInstance";

export const integratedBacktest = async (asset_groups) => {
    try {
        const response = await backtestInstance.post(
            '/backtest/integrated',
            asset_groups
        )
        return response.data;
    } catch (error) {
        console.log("통합 백테스트 실패", error);
    }
}

export const backtest = async (data) => {
    try {
        const response = await backtestInstance.post(
            '/backtest',
            data
        )
        return response.data;
    } catch (error) {
        console.log("백테스트 실패", error);
    }
}
import { defaultInstance } from "./axiosInstance";

export const pbJoin = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/api/pickle-pb/join`,
      formData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("pb 회원가입 실패", error);
  }
};

export const pbToken = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/api/pickle-pb/token`,
      formData
    );
    if (response.data && response.data.data) {
      const token = response.data.data;
      console.log(token);

      localStorage.setItem("accessToken", token);
      console.log(localStorage);

      return { success: true, token };
    } else {
      throw new Error("로그인 응답 데이터가 유효하지 않음");
    }
  } catch (error) {
    console.error("PB 로그인 실패", error);
    return { success: false, message: "PB 로그인 실패", error };
  }
};
