import supabase from "../config/supabaseClient.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const signup = async(req,res)=>{

 const {name,email,password} = req.body

 const hashed = await bcrypt.hash(password,10)

 const {data,error} = await supabase
 .from("users")
 .insert([{name,email,password:hashed}])
 .select()

 if(error) return res.status(400).json(error)

 res.json({message:"User created"})
}

export const login = async(req,res)=>{

 const {email,password} = req.body

 const {data,error} = await supabase
 .from("users")
 .select("*")
 .eq("email",email)
 .single()

 if(error) return res.status(400).json({msg:"User not found"})

 const match = await bcrypt.compare(password,data.password)

 if(!match) return res.status(400).json({msg:"Invalid password"})

 const token = generateToken(data.id)

 res.json({token})
}