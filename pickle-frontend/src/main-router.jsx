import { createBrowserRouter } from "react-router-dom";

import MainPage from "./routes/main/MainPage";
import LoginPage from "./routes/login/LoginPage";
import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";

export const routers = [
    {
        path: "/",
        element: <TestPage />,
        // index: true
    },
    {
        path: "/login",
        element: <LoginPage />
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