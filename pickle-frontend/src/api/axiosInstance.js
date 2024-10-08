import axios from 'axios';

const axiosDefault = () => {
    const instance = axios.create({
        baseURL: import.meta.env.VITE_BASE_REQUEST_URL,
        withCredentials: true,
    });
    return instance;
};

const axiosBacktest = () => {
    const instance = axios.create({
        // baseURL: import.meta.env.VITE_BACKTEST_REQUEST_URL,
        // withCredentials: true,
    });
    return instance;
};

export const defaultInstance = axiosDefault();
export const backtestInstance = axiosBacktest();
