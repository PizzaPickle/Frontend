import { defaultInstance } from './axiosInstance';

export const customerLogin = async (id, password) => {
	try {
		const data = defaultInstance.post('/customer/login', {
			id: id,
			password: password,
		});
		// if(대충 token 있으면) {
		// TODO
		//     cookie 저장하는 코드~ 이 쿠키는 httpOnly여야 합니다
		// }
		return data;
	} catch (error) {
		//에러 핸들링 로직
		console.log(error);
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
		const response = await defaultInstance.get(`/pickle-common/api/consulting/customer/histories`);
		return response.data;
	} catch (error) {
		console.error('API 요청 중 오류 발생:', error);
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
		const response = await defaultInstance.get(`/pickle-common/api/strategy/result/${strategyId}`);
		return response.data;
	} catch (error) {
		console.error('API 요청 중 오류 발생:', error);
		throw error;
	}
};
