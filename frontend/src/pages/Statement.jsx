import { useEffect,useState } from "react";
import axios from "axios"
export default function Statement() {
    const [tx,setTx] = useState([])
    useEffect(()=>{
        const fetch=async()=>{
            const token = localStorage.getItem("token")
            const res = await axios.get(
                "http://localhost:5000/api/account/statement",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            setTx(res.data)
        }
        fetch()
    }, [])
    return (
        <table>
   <thead>
    <tr>
     <th>Type</th>
     <th>Amount</th>
    </tr>
   </thead>

   <tbody>
   {tx.map((t)=>(
    <tr key={t.id}>
     <td style={{color:t.transaction_type==="credit"?"green":"red"}}>
      {t.transaction_type}
     </td>
     <td>{t.amount}</td>
    </tr>
   ))}
   </tbody>
  </table>
    )
}