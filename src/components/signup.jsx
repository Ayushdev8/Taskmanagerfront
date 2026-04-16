import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../ui/spinner";
import api from "../api";
import ErrorCom from "../ui/error";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate()
  const [passworderr,setPassworderr] =useState("")
  const [registererror,setResgisterError] = useState("")
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_no: "",
    password: "",
    password2:"",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   if (form.password !== form.password2) {
      setPassworderr("Password do not match")
      return;
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      

      const res= await api.post("/api/register/",{
        first_name:form.first_name,
        last_name:form.last_name,
        email:form.email,
        username:form.username,
        password:form.password,
        password2:form.password2,
        phone_no:form.phone_no,
      },
    {
      headers:{
        "Content-Type":"application/json",
      }
    },)

    console.log(res.data)
    setLoading(false)
    navigate("/login")
    toast.success("Registered succesfully")
      
    alert("Registered Successfully");
    } catch (err) {
      const message = err.response?.data?.message || "registration failed"
      console.log(err);
      setResgisterError(err.response?.data?.detail)
      setLoading(false)
    } 
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 flex-col justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-12">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Build Your Future 🚀
        </h1>

        <p className="text-gray-600 mb-8 text-lg">
          Join our platform and explore powerful tools designed to grow your skills and career.
        </p>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-blue-500 text-white p-2 rounded-full">✓</span>
            <p className="text-gray-700">Secure & Fast Authentication</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-purple-500 text-white p-2 rounded-full">✓</span>
            <p className="text-gray-700">User Friendly Dashboard</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-green-500 text-white p-2 rounded-full">✓</span>
            <p className="text-gray-700">Real-time Data Access</p>
          </div>
        </div>

        
        <div className="mt-10 p-5 bg-white rounded-2xl shadow-md">
          <p className="text-gray-600 italic">
            “Start your journey with us and unlock endless possibilities.”
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-10">
        {registererror && <ErrorCom registererror={registererror}/>}
        
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-4"
        >
          {passworderr && <ErrorCom passworderr={passworderr}/>}
          <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to get started
          </p>
        </div>


          
          <div className="flex gap-3">
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              placeholder="First Name"
              className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="last_name"
              value={form.last_name}
              placeholder="Last Name"
              className="w-1/2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <input
            type="text"
            name="username"
            value={form.username}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone_no"
            value={form.phone_no}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password2"
            value={form.password2}
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={handleChange}
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to ="/login" className="text-blue-500 cursor-pointer hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register