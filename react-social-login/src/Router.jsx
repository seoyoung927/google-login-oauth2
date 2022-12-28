import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        path: `${process.env.PUBLIC_URL}`,
        element: <App />,
        children: [
            {
                path:"",
                element: <MainPage />
            },
            {
                path:"/login",
                element: <LoginPage />
            },
        ]
    }
]);

export default router;
