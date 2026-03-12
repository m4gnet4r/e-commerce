import {useState, useContext} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Register =()=>{
    const {login}=useContext(AuthContext);
    const navigate= useNavigate();
    const [form,setForm] =useState({
        name:"",
        email:"",
        password:""
    })
    const [loading,setLoading] =useState(false);
    const [error,setError] = useState("");
    
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError("");
        try{
            const res = await API.post("/auth/register",form);
            login(res.data);
            navigate("/");
        }catch(err){
            setError(err.response?.data?.message || "Registration  failed");
            console.log(err.response);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="min-h-[80vh] flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md border p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
                {error && (<p className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</p>)}
                <input type="text" name="name" placeholder="Full Name" className="border p-2 w-full rounded mb-4" value={form.name} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Email" className="border p-2 w-full rounded mb-4" value={form.email} onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" className="border p-2 w-full rounded mb-4" value={form.password} onChange={handleChange} required/>
                <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">{loading? "Creating account..." : "Register"}</button>
                <p className="text-center mt-4 text-sm">Already have an account?{" "}<Link to="/login" className="text-blue-500">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;