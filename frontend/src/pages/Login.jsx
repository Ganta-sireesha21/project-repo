import axios from "axios"
import { useState, useContext  } from "react"
import { AuthContext } from "../context/AuthContext"
export default function Login() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const {login} = useContext(AuthContext)
    const handleLogin = async()=> {
        const res = await axios.post(
            "http://localhost:5000/api/auth/login",
            {email,password}

        )
        login(res.data.token)
    }
    return (
        <div>
            <h2>Login</h2>
               <input onChange={(e)=>setEmail(e.target.value)} placeholder="email"/>
               <input onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
               <button onClick={handleLogin}>Login</button>
        </div>
    )
}