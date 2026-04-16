import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Spinner from "../ui/spinner";
import ErrorCom from "../ui/error";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate()
  const{ setIsAuthenticated } = useContext(AuthContext)
  const [error,setError]= useState("")
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/api/token/",{
        email:form.email,
        password:form.password,
      },
      {
        headers:{
          "Content-Type":"application/json"
        },
      },
    )
      console.log(res.data)
      setLoading(false)
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setIsAuthenticated(true)
      toast.success("Login Succesful")
      alert("Login Successful");
      navigate("/")
    } catch(err) {
      console.log(err.response?.data || err);
      toast.error("Invalid Credentials")
      setLoading(false)
      setError(err.response?.data?.detail)
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* Left Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-10">
       {error && <ErrorCom error={error}/>}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5"
        >
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Welcome Back 👋
          </h2>

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 outline-none"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-green-500 cursor-pointer">Register</Link>
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
        <div className="text-center px-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome Back 💼
          </h1>
          <p className="text-gray-600">
            Login to continue your journey and manage your account.
          </p>
        </div>
      </div>
    </div>
  )

}
export default LoginPage