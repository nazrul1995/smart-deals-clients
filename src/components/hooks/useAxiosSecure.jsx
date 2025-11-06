import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';


const instance = axios.create({ 
     baseURL:'http://localhost:3000',
})

const useAxiosSecure = () => {
   const {user, signOutUser} = useAuth();
   const navigate = useNavigate()
    //set token in the header for all the api call using axios secure hook
    useEffect(()=>{
        const requestInterceptor = instance.interceptors.request.use(config=>{
            const token = user.accessToken
            if(token){
                            config.headers.authorization = `Bearer ${token}`
            }
            return config;
        })

        // response interceptor
       const responseInterceptor= instance.interceptors.response.use(res=>{
            return res;
        }, err=>{
            const status = err.status
            if(status === 401 || status === 401){
                signOutUser()
                .then(()=>{
                    navigate('/register');
                })
            }
        })

        return ()=>{
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInterceptor); 
        }

    },[user,navigate,signOutUser])
    // instance.interceptors.request.use((config)=>{
    //     config.headers.authorization = `Bearer ${user.accessToken}`
    //     return config;
    // })
    return instance;
};

export default useAxiosSecure;