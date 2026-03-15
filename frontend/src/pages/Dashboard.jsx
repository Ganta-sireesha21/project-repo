import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const [balance,setBalance] = useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchBalance = async ()=>{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/account/balance",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setBalance(res.data.balance)
}

fetchBalance()
    },[])
    return(
        <div>
            <h1>Dashboard</h1>
            <h2>your balance: ₹{balance} </h2>
            <button onClick={()=>navigate("/send-money")}>
                Send Money
            </button>
            <button onClick={()=>navigate("/statement")}>
                View Statement
            </button>
        </div>
    )
}