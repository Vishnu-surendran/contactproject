import React from 'react'

function Formlayout({children}) {
  return (
    <div>
   <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
       {children}
    </div>
    
    </div>
  )
}

export default Formlayout