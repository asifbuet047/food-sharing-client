import axios from 'axios'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider';

//dont use timeout it cause cors error
const instance = axios.create({
    baseURL: 'https://community-food-sharing-platform-server.vercel.app/',
    withCredentials: true
});

function useAxiosSecure() {

    return instance;
}

export default useAxiosSecure