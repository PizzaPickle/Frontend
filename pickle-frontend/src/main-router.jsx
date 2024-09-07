<<<<<<< HEAD
import { createBrowserRouter } from "react-router-dom";
import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";
import HomePage from "./pages/homepage/HomePage";
import Mydata from "./pages/mydata/Mydata";
import BacktestPage from "./pages/PB-BacktestPage/BacktestPage";
import Dashboard from "./pages/PB-BacktestPage/Strategy";
import Portfolio from "./pages/PB-BacktestPage/Portfolio";
import Strategy from "./pages/PB-BacktestPage/Strategy";
import RealTimeConsulting from "./pages/RealtimeConsulting/RealtimeConsulting";
import Pblist from "./pages/pblistpage/Pblist";
import Request from "./pages/requestpage/Request";
import RequestMydata from "./pages/requestpage/RequestMydata";
import React from "react";
import Login from "./pages/LoginPage/Login";
import Join from "./pages/LoginPage/join";
import Mydatajoin from "./pages/mydatajoin/Mydatajoin";
import TermsPage from "./pages/mydatajoin/Termspage";
import ProgressPage from "./pages/mydatajoin/ProgressPage";
=======
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
>>>>>>> 75ff9730d0b26d260e06eac67fdfd59e82180fab

export const routers = [
  {
    path: "/progress",
    element: <ProgressPage />,
  },
  {
    path: "/mydataterms",
    element: <TermsPage />,
  },
  {
    path: "/mydatajoin",
    element: <Mydatajoin />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/loginpage",
    element: <Login />,
  },
  {
    path: "/joinpage",
    element: <Join />,
  },
  {
    path: "/mydata",
    element: <Mydata />,
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
        element: <RequestMydata />,
      },
    ],
  },

<<<<<<< HEAD
  {
    path: "/consult/backtest",
    children: [
      {
        index: true,
        element: <BacktestPage />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "strategy",
        element: <Strategy />,
      },
    ],
  },
  {
    path: "/consulting/realtime-consulting",
    element: <RealTimeConsulting />,
    // index: true
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
    path: "/allmoney",
    element: <AllMoney />,
  },
=======
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
>>>>>>> 75ff9730d0b26d260e06eac67fdfd59e82180fab
];

const router = createBrowserRouter(routers);
export default router;
