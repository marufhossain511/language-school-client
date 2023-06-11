import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const navigate=useNavigate()

  const axiosSecure=axios.create({
    baseURL:'https://summer-camp-school-server-hazel.vercel.app'
  })

  useEffect(()=>{

    axiosSecure.interceptors.request.use((config)=>{
        const token=localStorage.getItem('access-token')
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    })

    axiosSecure.interceptors.response.use((response)=>
     response,
     async (error)=>{
        if(error.response && (error.response.status === 401 || error.response.status === 403)){
            navigate('/')
        }
        return Promise.reject(error)
     }

    )

  },[navigate,axiosSecure])
  return [axiosSecure]

};

export default useAxiosSecure;