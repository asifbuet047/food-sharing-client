import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error from "../Components/Error/Error";
import Home from "../Components/Home/Home";
import SignInPage from "../Components/SignIn/SignInPage";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                errorElement: <Error></Error>,
            },
            {
                path: '/availablefoods',

            },
            {
                path: '/addfood',
            },
            {
                path: '/managefood',
            },
            {
                path: '/requestfood',
            },
            {
                path: '/signin',
                element: <SignInPage></SignInPage>
            }
        ]
    }
]);

export default routes;