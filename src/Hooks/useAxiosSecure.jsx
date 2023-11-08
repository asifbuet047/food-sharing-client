import axios from 'axios'

//dont use timeout it cause cors error
const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
});

function useAxiosSecure() {
    return instance;
}

export default useAxiosSecure