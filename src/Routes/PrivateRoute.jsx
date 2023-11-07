import React, { useContext, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider';

function PrivateRoute({ children }) {
    const { user, userLoading } = useContext(AuthenticationContext);
    const currentRoute = useLocation();
    console.log(userLoading);

    if (userLoading) {
        return <BeatLoader color='#36D7B7' margin={10} size={50}></BeatLoader>;
    }


    if (!userLoading && !user?.email) {
        return <Navigate to={'/signin'}></Navigate>;
    }


    return children;
}

export default PrivateRoute