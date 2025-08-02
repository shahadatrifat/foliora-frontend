import axios from 'axios';
import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
const useAxiosSecure = () => {
    const {user}=use(AuthContext);
    axiosInstance.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${user?.accessToken}`
        return config 
    })

    return axiosInstance
};

export default useAxiosSecure;  