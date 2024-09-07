import { defaultInstance } from "./axiosInstance";

export const customerJoin = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/pickle-customer/api/join`,
      formData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("고객 회원가입 실패:", error);
  }
};

export const pbJoin = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/pickle-pb/api/join`,
      formData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("pb 회원가입 실패", error);
  }
};

export const customerToken = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/pickle-customer/api/token`,
      formData
    );
    const token = response.data.data;
    console.log(token);

    localStorage.setItem("accessToken", token);
    console.log(localStorage);
    return token;
  } catch (error) {
    console.error("고객 로그인 실패", error);
  }
};

export const pbToken = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/pickle-pb/api/token`,
      formData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("고객 로그인 실패", error);
  }
};

/**
 * 나중에 사용 시
 * await customerLogin(id, password)
 *    .then(~~~)
 *    .catch(~~~)
 * 해서 사용하면 될듯
 */
//TODO: TEST. 백에서 API 미완성
/**
 *
 * @returns 고객의 상담 내역 조회
 */
export const fetchConsultingHistories = async () => {
  try {
    const response = await defaultInstance.get(
      `/pickle-common/api/consulting/customer/histories`
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
//TODO: TEST. 백에서 API 미완성
/**
 *
 * @param {int} strategyId
 * @returns 전략ID에 해당하는 전략 가져오기
 */
export const fetchStrategyResult = async (strategyId) => {
  try {
    const response = await defaultInstance.get(
      `/pickle-common/api/strategy/result/${strategyId}`
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
