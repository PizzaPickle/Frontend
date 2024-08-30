import { createBrowserRouter } from "react-router-dom";

import MainPage from "./routes/main/MainPage";
import LoginPage from "./routes/login/LoginPage";
import TestPage from "./routes/test/TestPage";
import AllMoney from "./components/common/mydata/allmoney/AllMoney";
import HomePage from "./pages/homepage/HomePage";
import Mydata from "./pages/mydata/Mydata";

export const routers = [
    {
        path: "/",
        element: <HomePage />
        // index: true
    },
    {
        path: "/mydata",
        element: <Mydata />
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