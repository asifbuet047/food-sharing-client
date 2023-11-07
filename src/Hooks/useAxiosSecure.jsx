import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 5000,
    withCredentials: true
});

function useAxiosSecure() {
    return instance;
}

export default useAxiosSecure