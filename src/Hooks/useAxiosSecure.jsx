import axios from 'axios'
import React from 'react'

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
    withCredentials: true
});

function useAxiosSecure() {
    return instance;
}

export default useAxiosSecure