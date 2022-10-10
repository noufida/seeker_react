import React, { useContext } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'


const baseURL='https://seeker.savebox.ae/'

let authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

const axiosInstance = axios.create({
    baseURL:'https://seeker.savebox.ae/',
    withCredentials: true,
   
  });

// axiosInstance.interceptors.request.use(async req =>{
//   console.log("interceptor ran")
//   if(!authTokens){
//     if (req.url === `user/login/`){
//       console.log("ki")
//       return req
//     }
//     console.log(req)
//     authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
//     req.headers.Authorization =  `Bearer ${authTokens?.token}`
//     console.log('iioioio')
//   }
//     console.log("yes")
   
//   const user = jwt_decode(authTokens.token)
//   console.log(user,"im user")
//   console.log(user.exp,"kkkkkk")
//   console.log(dayjs.unix(user.exp).diff(dayjs()),"difff")
//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) <3 ;
//   console.log(isExpired,"tttt")
//   console.log(authTokens.refresh,"reff")
//   if (!isExpired) {return req}
//   console.log(authTokens,"yyyyyyyyyyyyyyyy")
//   const response = await axios.post('http://127.0.0.1:8000/user/refresh/',{
//     refresh:authTokens.refresh
//   }).then((response)=>{
//     if (response.status==200){
//       console.log(response.data,"refresheddddddddddddddddddddddddddd")
//       localStorage.removeItem('authTokens')
//   localStorage.setItem('authTokens',JSON.stringify(response.data)) }})
//   req.headers.Authorization =  `Bearer ${authTokens?.token}`
//   return req 
// })
 export default axiosInstance