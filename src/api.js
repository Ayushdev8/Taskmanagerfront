import axios from "axios"
import { jwtDecode } from "jwt-decode"

const api = axios.create({
    baseURL : "https://taskmanager-eyhq.onrender.com"
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now()/1000
            if(expiry_date > current_time){
                config.headers.Authorization =`Bearer ${token}`
            }
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)
export default api