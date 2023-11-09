import axios from 'axios'
import { useContext } from 'react';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider';

//dont use timeout it cause cors error
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
});

function useAxiosSecure() {
    
    return instance;
}

export default useAxiosSecure