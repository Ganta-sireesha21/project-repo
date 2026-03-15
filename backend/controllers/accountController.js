import supabase from "../config/supabaseClient.js";
export const getBalance = async(req,res) => {
    const {data} = await supabase
    .from("users")
    .select("balance")
    .eq("id",req.userId)
    .single()
res.json(data)
}
export const transfer = async(req,res) => {
    const {receiverEmail, amount} = req.body
    const {data:sender} = await supabase
    .from("users")
    .select("*")
    .eq("id", req.userId)
    .single()

    if (sender.balance < amount)
        return res.status(400).json({msg:"Insufficient balance"})

     const {data:receiver} = await supabase
     .from("users")
     .select("*")
     .eq("email",receiverEmail)
     .single()

   await supabase
   .from("users")
   .update({balance:sender.balance-amount})
   .eq("id",sender.id)

   await supabase
    .from("users")
    .update({balance: receiver.balance + amount})
    .eq("id",receiver.id)

     await supabase.from("transactions").insert([
  {
   sender_id:sender.id,
   receiver_id:receiver.id,
   amount,
   transaction_type:"debit"
  },
  {
   sender_id:sender.id,
   receiver_id:receiver.id,
   amount,
   transaction_type:"credit"
  }
 ])

 res.json({msg:"Transfer successful"})
 }

export const statement = async(req,res)=>{

 const {data} = await supabase
 .from("transactions")
 .select("*")
 .or(`sender_id.eq.${req.userId},receiver_id.eq.${req.userId}`)

 res.json(data)
}