import { createBrowserRouter } from "react-router-dom";

import MainPage from "./routes/main/MainPage";
import LoginPage from "./routes/login/LoginPage";
import TestPage from "./routes/test/TestPage";

export const routers = [
    {
        path: "/",
        element: <TestPage />,
        // index: true
    },
    {
        path: "/login",
        element: <LoginPage />
    }
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
];

const router = createBrowserRouter(routers);
export default router;