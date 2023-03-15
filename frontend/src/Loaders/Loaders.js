

import axios from "axios"
import Login from "../components/Login"
export default async function Contactsfetch() {
  
  const user=localStorage.getItem("User")
  if(user){
    const{token}=JSON.parse(user)
    const response=await axios.get("http://localhost:4000/api/user/contacts",{headers:{Authorization:`Bearer ${token}` }})
    return response.data
  }
return <Login/>
}

 