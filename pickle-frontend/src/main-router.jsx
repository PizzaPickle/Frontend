import { createBrowserRouter } from 'react-router-dom';
import TestPage from './routes/test/TestPage';
import AllMoney from './components/common/mydata/allmoney/AllMoney';
import HomePage from './pages/homepage/HomePage';
import Mydata from './pages/mydata/Mydata';
import BacktestPage from './pages/backtestPage/BacktestPage';
import Dashboard from './pages/BacktestPage/Strategy';
import Portfolio from './pages/backtestPage/Portfolio';
import Strategy from './pages/backtestPage/Strategy';
import RealTimeConsulting from './pages/RealtimeConsulting/RealtimeConsulting';
import Pblist from "./pages/pblistpage/Pblist";
import Request from "./pages/requestpage/Request";
import RequestMydata from "./pages/requestpage/RequestMydata"
import React from 'react';
import Preset from './pages/pb/presetPage/Preset';
import CustomerRequest from './pages/pb/customerRequestPage.jsx/CustomerRequest';
import MyRequest from './pages/myrequest/MyRequest';

export const routers = [
    {
      path: "/",
      element: <HomePage />,
    },
    {
        path: "/mydata",
        element: <Mydata />
    },
    {
        path: "/pblist",
        children: [
            {
                index: true,
                element: <Pblist />,
            },
            {
                path: "request",
                element: <Request />,
            },
            {
                path: "consultdata",
                element: <RequestMydata/>,
            }
        ]
    },
	{
        path: "/myrequest",
        children: [
            {
                index: true,
                element: <MyRequest />,
            },
        ]
    },

	{
		path: '/consult/backtest',
		children: [
			{
				index: true,
				element: <BacktestPage />,
			},
			{
				path: 'portfolio',
				element: <Portfolio />,
			},
			{
				path: 'strategy',
				element: <Strategy />,
			},
		],
	},
	{
		path: '/consulting/realtime-consulting',
		element: <RealTimeConsulting />,
		// index: true
	},

	// PB 화면 페이지
	{
		path: '/pb',
		children: [
			{
				index: true,
				element: <Preset />,
			},
			{
				path: 'preset',
				element: <Preset />,
			},
			{
				path: 'request-list',
				element: <CustomerRequest />,
			}
		],
	},
	
	// {
	//     path: "/머있지?",
	//     element:
	//     index: true,
	//     children: [
	//         {
	//             path:
	//             element:
	//         }
	//     ]
	// }
	{
		path: '/allmoney',
		element: <AllMoney />,
	},
];

const router = createBrowserRouter(routers);
export default router;
