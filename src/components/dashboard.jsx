import { useEffect, useState } from "react"
import api from "../api"
import ErrorCom from "../ui/error"

function DashboardCom(){
  const token = localStorage.getItem("access")
  const[taskDetail,setTaskDetail] = useState({})
  const[error,setError] = useState("")
  const[loading,setLoading]=useState(true)

  const TaskStats = async ()=>{
    setLoading(true)
    try{
      const res = await api.get("api/total-task/",{
        headers:{
            Authorization: `Bearer ${token}`,
        },
      },)
      console.log(res.data)
      setLoading(false)
      setTaskDetail(res.data)

    }
    catch(err){
      console.log(err.response?.data)
      setLoading(false)
      setError(err.response?.data?.detail)

    }
  }
  useEffect(()=>{
    TaskStats()
  },[])
    return(
        <>
            <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {error && <ErrorCom error={error}/>}

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-200 p-6 rounded-xl">Total Tasks: {taskDetail.total_tasks} </div>
          <div className="bg-green-200 p-6 rounded-xl">Completed: {taskDetail.completed_tasks} </div>
          <div className="bg-red-200 p-6 rounded-xl">Pending: {taskDetail.pending_tasks} </div>
          <div className="bg-yellow-200 p-6 rounded-xl">In Progress: {taskDetail.progress_tasks} </div>
        </div>
      </div>

        </>
    )
}
export default DashboardCom