import axios from "axios"
import { useState   } from "react"
export default function SendMoney() {
    const [email,setEmail] = useState("")
    const [amount,serAmount] = useState("")
    const send = async()=>{
        const token=localStorage.getItem("token")
        await axios.post(
            "http://localhost:5000/api/account/transfer",
            {receiverEmail:email,amount},
            {
                headers:{
                   Authorization:`Bearer ${token}` 
                }
            }
        )
        alert("Money Sent")
    }
    return (
        <div>
            <h2>Send Money</h2>
            <input placeholder="Reciver Email"
            onChange={(e)=>serEmail(e.target.value)}/>
            <input placeholder="Amount"
            onChange={(e)=>setAmount(e.target.value)}/>
            <button onClick={send}>Send</button>
        </div>
    )
}