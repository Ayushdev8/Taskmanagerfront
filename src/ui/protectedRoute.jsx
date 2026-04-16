import { useEffect, useState } from "react";
import Spinner from "./spinner";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import api from "../api";

function ProtectedRoute({children}){
    const [isAuthorised,setIsAuthorised]= useState(null)
    const location = useLocation()

    

    async function refreshToken(){
        const refreshToken = localStorage.getItem("refresh")

        try{
            const res= await api.post("/api/token/refresh/",{
                refresh : refreshToken
            })
            if(res.status===200){
                localStorage.setItem("access",res.data.access)
                setIsAuthorised(true)
            } else{
                setIsAuthorised(false)
            }
        }
        catch(err){
            console.log("Error:",err)
            setIsAuthorised(false)
        }

    }
    async function auth(){
        const token = localStorage.getItem("access")
        if(!token){
            setIsAuthorised(false)
        }
        const decoded = jwtDecode(token)
        const expiry_date = decoded.exp
        const current_time = Date.now()/1000
         if(current_time>expiry_date){
            await refreshToken()
         } else{
            setIsAuthorised(true)
         }
    }
    useEffect(()=>{
        auth().catch((err)=>setIsAuthorised(false))
        if(isAuthorised==false){
            toast.error("Please login to continue");
        }
        refreshToken()
    },[isAuthorised])
    if(isAuthorised==null){
        return <Spinner />
    }
    
    return(
        <>
            {isAuthorised ? children:<Navigate to="/login" state={{from: location}} replace/>}
        </>
    )
}
export default ProtectedRoute