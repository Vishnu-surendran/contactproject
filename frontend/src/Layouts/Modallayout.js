import React from 'react'

function Modallayout({children}) {
  return (
    <div>
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
{children}
</div>
    </div>
  )
}

export default Modallayout