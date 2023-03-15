import React from 'react'
import Formlayout from '../Layouts/Formlayout'
import { useForm } from "react-hook-form";
import {useNavigate,Link} from "react-router-dom"
import axios from "axios"

function Signupformpage() {
  const { register, handleSubmit,  formState: { errors } } = useForm();
  
  const navigate=useNavigate()
  const Submit=async(data)=>{
    try{
const response=await axios.post("http://localhost:4000/api/user/signup",data)
if(response){
    navigate("/login")
}

    }catch(error){
console.log(error)
    }
}
  return (
   <Formlayout>
    <h1 className="text-4xl font-medium">Register</h1>
      
        <form action="" className="my-10" onSubmit={handleSubmit(Submit)}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="email">
                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                    <input id="email" name="email" type="email" {...register("email", { required:"This field required" })} className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address"/>
                <p className='text-red-600'>{errors.email?.message}</p>
                </label>
                <label htmlFor="password">
                    <p className="font-medium text-slate-700 pb-2">Password</p>
                    <input id="password" name="password" type="password" {...register("password", { required:"This field is required" })} className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter your password"/>
                    <p className='text-red-600'>{errors.password?.message}</p>
                </label>
              
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Signup</span>
                </button>
                <p className="text-center">Registered ?  <Link to="/login" className="text-indigo-600 font-medium inline-flex space-x-1 items-center"><span>Login  </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg></span></Link></p>
            </div>
        </form>
   </Formlayout>
  )
}

export default Signupformpage