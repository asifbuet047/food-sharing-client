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
import MyFoodTable from "../Components/Miscellaneous/MyFoodTable";


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
                element: <AvailableFoods></AvailableFoods>,
                errorElement: <Error></Error>

            },
            {
                path: '/food/:id',
                element: <PrivateRoute><SingleFoodDetailsPage></SingleFoodDetailsPage></PrivateRoute>,
                errorElement: <Error></Error>
            },
            {
                path: '/addfood',
                element: <PrivateRoute><AddFoodPage></AddFoodPage></PrivateRoute>,
                errorElement: <Error></Error>
            },
            {
                path: '/managefoods',
                element: <PrivateRoute><MyFoodTable></MyFoodTable></PrivateRoute>,
                errorElement: <Error></Error>
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