import { defaultInstance } from "./axiosInstance";

export const customerJoin = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/pickle-customer/join`,
      formData
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("고객 회원가입 실패:", error);
  }
};

export const customerToken = async (formData) => {
  try {
    const response = await defaultInstance.post(
      `/pickle-customer/token`,
      formData
    );

    // 성공적인 응답이 있는지 확인
    if (response.data && response.data.data) {
      const token = response.data.data;
      console.log(token);

      localStorage.setItem("accessToken", token); // 토큰을 로컬 스토리지에 저장
      console.log(localStorage);

      return { success: true, token }; // 성공 시 반환 객체
    } else {
      throw new Error("로그인 응답 데이터가 유효하지 않음");
    }
  } catch (error) {
    console.error("고객 로그인 실패", error);
    return { success: false, message: "고객 로그인 실패", error }; // 실패 시 반환 객체
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
      `/pickle-common/consulting/customer/histories`
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
      `/pickle-common/strategy/result/${strategyId}`
    );
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};
