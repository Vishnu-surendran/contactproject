import React, { useEffect ,useState} from 'react'
import {Outlet,Navigate} from "react-router-dom"
function Loginroute({children}) {
  const user=localStorage.getItem("User")
  if(user){
    return <Navigate to="/" replace/>
  }
return children


}

export default Loginroute