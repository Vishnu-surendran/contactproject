import { createSlice, configureStore } from "@reduxjs/toolkit"


const user={
  contacts:null,
  state:null,
  isLoading:null,
  error:null,
  contact:null
}

const userManagement = createSlice({
    name: 'users',
    initialState: user,
    reducers: {
       Allcontacts(state,action){
        state.contacts=action.payload
       },editstatus(state,action){
        state.state=action.payload
       },loadingstatus(state,action){
state.isLoading=action.payload
       },Addcontact(state,action){
        state.contacts.push(action.payload)
       },Deletecontact(state,action){
        const contactindex=state.contacts.findIndex((contact)=>contact._id===action.payload)
state.contacts.splice(contactindex,1)
       },setError(state,action){
        state.error=action.payload
       },editContact(state,action){
    
        const contact=state.contacts.find((data)=>data._id===action.payload.data.contactid)
        contact.name=action.payload.data.name
        contact.email=action.payload.data.email
        contact.address=action.payload.data.address
        contact.phone=action.payload.data.phone
 
       },singlecontact(state,action){
        state.contact=action.payload
       }
    }
})

export const useractions = userManagement.actions

const store = configureStore({
    reducer: { userAuth: userManagement.reducer,}
})

export default store