import React, { useEffect ,useState} from 'react'
import {Navigate} from "react-router-dom"

function User({children}) {
  const user=localStorage.getItem("User")
  if(!user){
    return <Navigate to="/login" replace/>
  }
return children


}

export default User