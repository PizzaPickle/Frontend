import { createBrowserRouter } from "react-router-dom";
import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";
import HomePage from "./pages/homepage/HomePage";
import Mydata from "./pages/mydata/Mydata";
import BacktestPage from "./pages/backtestPage/BacktestPage";
// import Dashboard from "./pages/PB-BacktestPage/Strategy";
import Portfolio from "./pages/backtestPage/Portfolio";
import Strategy from "./pages/backtestPage/Strategy";
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
import Preset from './pages/pb/presetPage/Preset';
import CustomerRequest from './pages/pb/customerRequestPage.jsx/CustomerRequest';
import MyRequest from './pages/myrequest/MyRequest';
import DetailRequest from "./pages/pb/customerRequestPage.jsx/DetailRequest";
import MyStrategy from "./pages/mystrategy/Mystrategy";

export const routers = [
  {
    path: "/",
    element: <HomePage />,
  },
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
    path: "/mystrategy",
    element: <MyStrategy />,
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
      path: "/pb",
      children: [
        {
          index: true,
          element: <Preset />,
        },
        {
          path: "customer-request",
          children: [
            {
              index: true,
              element: <CustomerRequest />,
            },
            {
              path: ":id", // 동적 경로 세그먼트 추가
              element: <DetailRequest />,
            },
          ],
        },
      ],
    },

  {
    path: "/allmoney",
    element: <AllMoney />,
  },

];

const router = createBrowserRouter(routers);
export default router;
