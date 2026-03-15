import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const handleSignup=async (e)=>{
        e.preventDefault()
    try{
        await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
                name,
                email,
                password
            }
        )
        alert("Signup Succesful")
        navigate("/login")
    }catch(err){
        alert("Signup Failed")
    }

    }
    return (
        <div style={{textAlign:"center"}}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
               />
               <br/><br/>
               <input 
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               />
               <br/><br/>
               <input
               type="password"
               placeholder="Password" 
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
               />
               <br/><br/>
               <button type ="submit">
                Signup
               </button>
            </form>
        </div>
    )
}