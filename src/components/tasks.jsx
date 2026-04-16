import { useEffect, useMemo, useState } from "react";
import Modal from "../ui/Modal";
import ConfirmModal from "../ui/confirmmodal";
import TaskCard from "./taskcard";
import api from "../api";
import Spinner from "../ui/spinner";
import ErrorCom from "../ui/error";
import { toast } from "react-toastify";

function TaskCom(){
    const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const nextId = () => Math.max(0, ...task.map(t => t.id)) + 1;
  const [task,setTask] = useState([])
  const [loading,setLoading] = useState(false)
  const [fetcherror,setFetchError] =useState("")
  const [deleteerror,setdeleteError] =useState("")
  const [statuserror,setStatusError] = useState("")
  const token = localStorage.getItem("access");

  useEffect(()=>{
    const fetchtask = async ()=>{
        setLoading(true)
        try{
            const res = await api.get("api/tasks/",{
                headers: {
                Authorization: `Bearer ${token}`, 
            },
            })
            console.log(res.data)
            setTask(res.data)
            setLoading(false)


        }catch(err){
            console.log(err.response?.data || err)
            setLoading(false)
            setFetchError(err.response?.data?.detail)
        

        }

    }
    fetchtask();

  },[])


  const handleSave = (form) => {
    if (form.id) {
      setTask(task.map(t => t.id === form.id ? form : t));
    } else {
      setTask([...task, { ...form, id: nextId() }]);
    }
    setModal(null);
  };

  const handleDelete = async () => {
    try{

    const res =  await api.delete(`api/taskdelete/${deleteTarget.id}/`,{
        headers:{
            Authorization: `Bearer ${token}`,
            
        },
    },)
    console.log(res.data)
    setTask(task.filter(t => t.id !== deleteTarget.id));
    setDeleteTarget(null);
    }catch(err){
        console.log(err.response?.data||err)
        setdeleteError(err.response?.data?.detail)
        

    }
    
  };

  const handleStatusChange = async (id, status) => {

    try{
        const res = await api.patch(`api/tasks/${id}/`,{
            status:status,
        },
        {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    )
    console.log(res.data)
    setTask(task.map(t => t.id === id ? { ...t, status } : t));
    toast.success("Your Status changed successfully")

    }catch(err){
        console.log(err.response?.data || err)
        setStatusError(err.response?.data?.detail)
    }
    
  };

  const filtered = useMemo(() => {
    let list = [...task];
    if (search) list = list.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
    );
    return list;
  }, [task, search]);

  if(loading){
    return <Spinner loading={loading}/>
  }
 

    return(
        <>
          <div className="mt-8 space-y-5">
            {fetcherror && <ErrorCom fetcherror={fetcherror}/>}
            {deleteerror && <ErrorCom deleteerror={deleteerror}/>}
            {statuserror && <ErrorCom statuserror={statuserror}/>}
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-around">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          onClick={() => setModal({})}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add task
        </button>
      </div>

      <p className="text-xs text-gray-400">{filtered.length} task{filtered.length !== 1 ? "s" : ""} found</p>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-16 flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/></svg>
          </div>
          <p className="text-sm font-medium text-gray-600">No tasks found</p>
          <button onClick={() => setModal({})} className="mt-2 px-4 py-2 bg-blue-700 text-white text-sm rounded-lg hover:bg-blue-800 transition">Add task</button>

    </div>
    )}
     {/* Task grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => (
          <TaskCard
            key={t.id}
            task={t}
            onEdit={(t) => setModal(t)}
            onDelete={(t) => setDeleteTarget(t)}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {modal !== null && (
        <Modal
          task={modal?.id ? modal : null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
      {deleteTarget && (
        <ConfirmModal
          task={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>


    </>
    )
}
export default TaskCom