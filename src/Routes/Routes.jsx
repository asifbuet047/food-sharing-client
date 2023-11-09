import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Error from "../Components/Error/Error";
import Home from "../Components/Home/Home";
import SignInPage from "../Components/SignIn/SignInPage";
import RegistrationPage from "../Components/Registration/RegistrationPage";
import AvailableFoods from "../Components/AvailableFoods/AvailableFoods";
import SingleFoodDetailsPage from "../Components/SingleFoodDetailsPage/SingleFoodDetailsPage";
import PrivateRoute from "./PrivateRoute";
import AddFoodPage from "../Components/AddFood/AddFoodPage";
import ManageMyFoodPage from "../Components/ManageMyFood/ManageMyFoodPage";
import PageNotFound from '../Components/Error/PageNotFound';
import ManageSingleFoodPage from '../Components/ManageSingleFood/ManageSingleFoodPage'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <PageNotFound></PageNotFound>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/availablefoods',
                element: <AvailableFoods></AvailableFoods>,
                errorElement: <PageNotFound></PageNotFound>,

            },
            {
                path: '/food/:id',
                element: <PrivateRoute><SingleFoodDetailsPage></SingleFoodDetailsPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>
            },
            {
                path: '/addfood',
                element: <PrivateRoute><AddFoodPage></AddFoodPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>
            },
            {
                path: '/managefoods',
                element: <PrivateRoute><ManageMyFoodPage></ManageMyFoodPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>
            },
            {
                path: '/manage/:id',
                element: <PrivateRoute><ManageSingleFoodPage></ManageSingleFoodPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>
            },
            {
                path: '/requestfood',
            },
            {
                path: '/signin',
                element: <SignInPage></SignInPage>
            },
            {
                path: '/register',
                element: <RegistrationPage></RegistrationPage>
            }
        ]
    }
]);

export default routes;