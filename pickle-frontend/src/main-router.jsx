import { createBrowserRouter } from "react-router-dom";

import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";
import HomePage from "./pages/Homepage/HomePage";
import BacktestPage from "./pages/PB-BacktestPage/BacktestPage";

export const routers = [
    {
        path: "/",
        element: <TestPage />
        // index: true
    },
    {
        path: "/consult/backtest",
        element: <BacktestPage />
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