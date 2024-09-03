import { createBrowserRouter } from "react-router-dom";

import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";
import HomePage from "./pages/homepage/HomePage";
import Mydata from "./pages/mydata/Mydata";
import BacktestPage from "./pages/PB-BacktestPage/BacktestPage";
import Dashboard from "./pages/PB-BacktestPage/Strategy";
import Portfolio from "./pages/PB-BacktestPage/Portfolio";
import Strategy from "./pages/PB-BacktestPage/Strategy";

export const routers = [
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/mydata",
        element: <Mydata />
        // index: true
    },
    
    {
        path: "/login",
        element: <LoginPage />
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
        path:"/allmoney",
        element:<AllMoney/>
    }
];

const router = createBrowserRouter(routers);
export default router;