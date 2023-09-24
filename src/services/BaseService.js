import axios from 'axios';

const createHttp = () => {
    const http = axios.create({
        baseURL: 'http://localhost:3000'
    })

    http.interceptors.response.use(
        (response) => response.data,
        (err) => Promise.reject(err),    
    )
    
    return http
}

export default createHttp;

