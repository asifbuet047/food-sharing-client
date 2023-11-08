import React, { useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider';
import ThreeCircleLoading from '../Components/Loading/BeatLoading';

function PrivateRoute({ children }) {
    const { user, userLoading } = useContext(AuthenticationContext);
    const currentRoute = useLocation();
    console.log(user);
    console.log(userLoading);


    if (userLoading) {
        return <ThreeCircleLoading circleSize={'5em'}></ThreeCircleLoading>;
    }



    if (!userLoading && !user?.email) {
        return <Navigate to={'/signin'}></Navigate>;
    }


    return children;
}

export default PrivateRoute