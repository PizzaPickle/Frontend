import { createBrowserRouter } from "react-router-dom";
import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";
import HomePage from "./pages/homepage/HomePage";
import Mydata from "./pages/mydata/Mydata";
import BacktestPage from "./pages/backtestPage/BacktestPage";
// import Dashboard from "./pages/PB-BacktestPage/Strategy";
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
import Preset from "./pages/pb/presetPage/Preset";
import CustomerRequest from "./pages/pb/customerRequestPage.jsx/CustomerRequest";
import MyRequest from "./pages/myrequest/MyRequest";
import CheckMyData from "./pages/backtestPage/Portfolio";

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
  {
    path: "/myrequest",
    children: [
      {
        index: true,
        element: <MyRequest />,
      },
    ],
  },
  {
    path: "/consult/backtest",
    children: [
      {
        index: true,
        element: <BacktestPage />,
      },
      {
        path: "mydata",
        element: <CheckMyData />,
      },
    ],
  },
  {
    path: "/consulting/realtime-consulting",
    element: <RealTimeConsulting />,
    // index: true
  },
  //   {
  //     path: "/pb",
  //     children: [
  //       {
  //         index: true,
  //         element: <Preset />,
  //       },
  //       {
  //         path: "preset",
  //         element: <Preset />,
  //       },
  //     ],
  //   },
  {
    path: "/allmoney",
    element: <AllMoney />,
  },
];

const router = createBrowserRouter(routers);
export default router;
