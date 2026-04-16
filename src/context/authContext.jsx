import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import api from "../api";


export const AuthContext = createContext(false);

export function AuthProvider({children}){
    const token = localStorage.getItem("access")
    const [IsAuthenticated,setIsAuthenticated] = useState(false)
    const [UserDetail,setUserDetail] = useState({})

    const handleAuth = ()=>{
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now()/1000
            if(expiry_date > current_time){
                setIsAuthenticated(true)
            }
        }
    }
    const getUser= async ()=>{
        try{
            const res = await api.get("api/user/",{
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            },)
            console.log(res.data)
            setUserDetail(res.data)
            
        }catch(err){
            console.log(err.response?.data)
        }

    }
    useEffect(()=>{
        handleAuth()
        getUser()
    },[])

    const authValue = {IsAuthenticated,setIsAuthenticated,UserDetail}
    return(
        <>
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
        </>
    )

}