import { defaultInstance } from "./axiosInstance";
import { useDispatch } from "react-redux"; // Redux 훅 import
import { setToken, setUser } from "../store/reducers/user"; // 액션 import
import axios from "axios";
export const customerJoin = async (formData) => {
  try {
    const response = await axios.post(`/api/pickle-customer/join`, formData);
    console.log(response);
    return response;
  } catch (error) {
    console.error("고객 회원가입 실패:", error);
  }
};

// Redux에서 dispatch를 인자로 받아 처리
export const customerToken = async (formData, dispatch) => {
  try {
    const response = await axios.post(`/api/pickle-customer/token`, formData);

    if (response.data && response.data.data) {
      const userData = response.data.data;
      console.log(response);

      // 로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", userData.token);

      // Redux 스토어에 토큰 저장
      // Redux 스토어에 유저 정보와 토큰 저장
      dispatch(
        setUser({
          user: {
            id: userData.userId,
            name: userData.name,
          },
          token: userData.token,
        })
      );
      console.log("디스패치 완료");
      return { success: true, token: userData.token };
    } else {
      throw new Error("로그인 응답 데이터가 유효하지 않음");
    }
  } catch (error) {
    console.error("고객 로그인 실패", error);
    return { success: false, message: "고객 로그인 실패", error };
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
