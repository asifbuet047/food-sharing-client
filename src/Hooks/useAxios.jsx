import axios from 'axios';
import React from 'react'

//https://community-food-sharing-platform-server.vercel.app/
//http://localhost:5000/
const instance = axios.create({
    baseURL: 'https://community-food-sharing-platform-server.vercel.app/'
});

function useAxios() {
    return instance;
}

export default useAxios;