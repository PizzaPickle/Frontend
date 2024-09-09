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