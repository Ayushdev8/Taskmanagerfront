import { Badge } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatusChange }){
    const STATUSES = ["Todo", "In Progress", "Done"];
    const priorityConfig = {
        Low: { bg: "bg-green-100 text-green-800", dot: "bg-green-500" },
        Medium: { bg: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-500" },
        High: { bg: "bg-red-100 text-red-800", dot: "bg-red-500" },
    };
    return(
        <>
            <div className={`bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3 hover:border-gray-200 transition group ${task.status === "Done" ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold text-gray-800 leading-snug ${task.status === "Done" ? "line-through text-gray-400" : ""}`}>{task.title}</p>
          {task.description && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>}
        </div>
        <div className="flex gap-1   transition flex-shrink-0">
          <button onClick={() => onEdit(task)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-400 text-gray-900 hover:text-blue-600 transition">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onClick={() => onDelete(task)} className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-400 focus:bg-red-500 text-gray-900 hover:text-red-600 transition">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge label={task.priority} config={priorityConfig} />
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{task.category}</span>
      </div>
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-50">
        {task.dueDate
          ? <span className="text-xs text-gray-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {task.dueDate}
            </span>
          : <span />}
        <select value={task.status} onChange={e => onStatusChange(task.id, e.target.value)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition cursor-pointer">
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
    </div>
        </>
    )
}
export default TaskCard