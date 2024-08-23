import { createBrowserRouter } from "react-router-dom";

import MainPage from "./routes/main/MainPage";

export const routers = [
    {
        path: "/",
        element: <MainPage />,
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
];

const router = createBrowserRouter(routers);
export default router;