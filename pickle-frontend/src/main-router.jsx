import { createBrowserRouter } from 'react-router-dom';
import TestPage from './routes/test/TestPage';
import AllMoney from './components/common/mydata/allmoney/AllMoney';
import HomePage from './pages/homePage/HomePage';
import Mydata from './pages/mydata/Mydata';
import BacktestPage from './pages/backtestPage/BacktestPage';
// import Dashboard from "./pages/PB-BacktestPage/Strategy";
import RealTimeConsulting from './pages/consulting/RealTimeConsulting';
import Pblist from './pages/pblistpage/Pblist';
import Request from './pages/requestpage/Request';
import RequestMydata from './pages/requestpage/RequestMydata';
import React from 'react';
import Login from './pages/loginPage/Login';
import Join from './pages/loginPage/join';
import Mydatajoin from './pages/mydatajoin/Mydatajoin';
import TermsPage from './pages/mydatajoin/Termspage';
import ProgressPage from './pages/mydatajoin/ProgressPage';
import Preset from './pages/pb/presetPage/Preset';
import CustomerRequest from './pages/pb/customerRequestPage/CustomerRequest';
import MyRequest from './pages/myrequest/MyRequest';
import DetailRequest from './pages/pb/customerRequestPage/DetailRequest';
import Order from './pages/customerOrder/Order';
import PortfolioEarning from './pages/portfolio/PortfolioEarning';
import CheckMyData from './pages/backtestPage/Portfolio';
import CreatePresetPage from './pages/pb/createPresetPage/CreatePresetPage';
import MyStrategy from './pages/strategy/MyStrategy';
import PbRealTimeConsultingRoom from './pages/pb/pbconsulting/PbRealTimeConsulting';

export const routers = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/progress',
        element: <ProgressPage />,
    },
    {
        path: '/customer/mydataterms',
        element: <TermsPage />,
    },
    {
        path: '/customer/mydatajoin',
        element: <Mydatajoin />,
    },
    {
        path: '/homepage',
        element: <HomePage />,
    },
    {
        path: '/loginpage',
        element: <Login />,
    },
    {
        path: '/joinpage',
        element: <Join />,
    },
    {
        path: '/customer/mydatapage',
        element: <Mydata />,
    },
    {
        path: '/order',
        element: <Order />,
    },
    {
        path: '/portfolio',
        element: <PortfolioEarning />,
    },
    {
        path: '/pblist',
        children: [
            {
                index: true,
                element: <Pblist />,
            },
            {
                path: 'request',
                element: <Request />,
            },
            {
                path: 'consultdata',
                element: <RequestMydata />,
            },
        ],
    },
    {
        path: '/myrequest',
        children: [
            {
                index: true,
                element: <MyRequest />,
            },
        ],
    },
    {
        path: '/mystrategy',
        children: [
            {
                index: true,
                element: <MyStrategy />,
            },
        ],
    },

    {
        path: '/consult/backtest',
        children: [
            {
                index: true,
                element: <BacktestPage />,
            },
            {
                path: 'mydata',
                element: <CheckMyData />,
            },
            // {
            //     path: 'strategy',
            //     element: <Strategy />,
            // },
        ],
    },
    {
        path: '/myconsulting',
        element: <RealTimeConsulting />,
    },

    {
        path: '/pb',
        children: [
            {
                path: 'customer-request',
                children: [
                    {
                        index: true,
                        element: <CustomerRequest />,
                    },
                    {
                        path: ':id', // 동적 경로 세그먼트 추가
                        element: <DetailRequest />,
                    },
                ],
            },
            {
                path: 'consulting',
                element: <PbRealTimeConsultingRoom />,
            },
            {
                path: 'create',
                element: <CreatePresetPage />,
            },
        ],
    },
];

const router = createBrowserRouter(routers);
export default router;
