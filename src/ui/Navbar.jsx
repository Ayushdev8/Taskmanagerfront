import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function NavbarCom(){
  const { UserDetail,IsAuthenticated,setIsAuthenticated } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false);

    function logout(){
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      setIsAuthenticated(false)
    }
    return(
        <>
            <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-blue-600">TaskManager</h1>

      {/* Desktop */}
      <div className="hidden md:flex gap-8 items-center text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/tasks" className="hover:text-blue-500">Tasks</Link>
          {IsAuthenticated ? (<>
                <h1 className="text-semibold text-xl text-blue-300">Hi {UserDetail.username}</h1>
                <button onClick={logout} className="bg-red-400 focus:bg-red-600 text-white px-6 py-2 rounded-xl">Logout</button>

          </>):
          (<>
              <Link to ="/login" className="bg-green-500 focus:bg-blue-600 text-white px-6 py-2 rounded-xl">
            Login
          </Link>
          <Link to ="/signup" className="bg-green-500 focus:bg-blue-600 text-white px-6 py-2 rounded-xl">
            Register
          </Link>
          </>)
          }
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl hover:bg-gray-100">
          {menuOpen ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden">
            {IsAuthenticated ? (<>
                <h1 className="text-semibold text-xl text-blue-300">Hi {UserDetail.username}</h1>
                <button onClick={logout} className="bg-red-400 focus:bg-red-600 text-white px-6 py-2 rounded-xl">Logout</button>

          </>):
          (<>
              <Link to ="/login" className="bg-green-500 focus:bg-blue-600 text-white px-6 py-2 rounded-xl">
            Login
          </Link>
          <Link to ="/signup" className="bg-green-500 focus:bg-blue-600 text-white px-6 py-2 rounded-xl">
            Register
          </Link>
          </>)
          }
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/tasks" className="hover:text-blue-500">Tasks</Link>
          
        </div>
      )}
    </nav>

        </>
    )
}
export default NavbarCom