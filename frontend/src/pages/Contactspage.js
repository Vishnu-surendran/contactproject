import React,{useState,useEffect} from 'react'
import Confirmationmodal from '../components/Confirmationmodal'
import Editcontact from '../components/Editcontact'
import { useDispatch,useSelector } from 'react-redux'
import {useLoaderData,useNavigate} from "react-router-dom"
import { useractions } from '../store/store'
import axios from 'axios'
function Contactspage() {
	const data=useLoaderData()
	const dispatch=useDispatch()
	const navigate=useNavigate()
	const {contacts,state}=useSelector((state)=>state.userAuth)
    const [contactdata, setcontactdata] = useState(false)
    const [search, setsearch] = useState("")

useEffect(() => {
	dispatch(useractions.Allcontacts(data))
}, [])


const newcontact=()=>{

	setcontactdata(null)
	dispatch(useractions.editstatus(true))
	
}

const deleteContact=async(contactid)=>{

	const user=localStorage.getItem("User")
	const{token}=JSON.parse(user)
const response=await axios.delete("http://localhost:4000/api/user/contacts/delete/"+contactid,{headers:{Authorization:`Bearer ${token}` }})
dispatch(useractions.Deletecontact(contactid))
}


const editContact=(id)=>{
const contact=contacts.find((data)=>data._id===id)
setcontactdata(contact)
dispatch(useractions.editstatus(true))
}

const Logout=()=>{
localStorage.removeItem("User")
navigate("/login")
}


  return (
    <div>
        <div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Contacts</h2>
			<span className="text-xs">All Contacts</span>
		</div>
		<div className="flex items-center justify-between">
			{contacts?.length!== 0 && (<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd" />
				</svg>
				<input className="bg-gray-50 outline-none ml-1 block " type="text" name="" onChange={(e)=>setsearch(e.target.value)} placeholder="search..."/>
          </div>)}
			
				<div className="lg:ml-40 ml-10 space-x-8">
					<button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"onClick={()=>newcontact()} >New Contact</button>
				</div>
				<div className="lg:ml-40 ml-10 space-x-8">
					<button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"onClick={Logout} >Logout</button>
				</div>
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				{contacts?.length===0 ? <h1 className='text-center'>No Contacts found</h1>: <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					{ <table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Name
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Phone number
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Email
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Address
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							
							{contacts?.filter((data)=>{
								return search.toLowerCase() ==="" ? data : data.name.toLowerCase().includes(search)
							}).map((contact)=>{
return<tr key={contact._id}>
<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	<div className="flex items-center">
		
			<div className="ml-3">
				<p className="text-gray-900 whitespace-no-wrap">
					{contact.name}
				</p>
			</div>
		</div>
</td>
<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	<p className="text-gray-900 whitespace-no-wrap">{contact.phone}</p>
</td>
<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	<p className="text-gray-900 whitespace-no-wrap">
	{contact.email}
	</p>
</td>
<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
	<p className="text-gray-900 whitespace-no-wrap">
	{contact.address}
	</p>
</td>
<td className="px-5 py-5 space-x-4 border-b border-gray-200 bg-white text-sm ">
<div className='sm:space-y-4 md:space-x-4'>
<button className="bg-green-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={()=>editContact(contact._id)}>Edit</button>
<button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={()=>deleteContact(contact._id)}>Delete</button>

</div>

</td>
</tr>
							})}
							
							
						</tbody>
					</table> }
					{/* {Delete && (<Confirmationmodal cancel={cancelDelete}/>)} */}

                    
				 </div> }
				
				 {state && (<Editcontact data={contactdata}/>)}
			</div>
		</div>
	</div>
    </div>
  )
}

export default Contactspage