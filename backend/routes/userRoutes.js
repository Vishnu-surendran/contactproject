const express=require("express")

const router=express.Router()
const userAuthentication=require("../middleware/userAuth")
const {userLogin,userSignup,allContacts,createContact,editContact,removeContact}=require("../controllers/userControllers")

/* Public Routes */

router.post("/signup",userSignup)

router.post("/login",userLogin)


/* User Authenticated Routes */

router.use(userAuthentication)

router.post("/contacts/create",createContact)

router.get("/contacts",allContacts)

router.patch("/contacts/edit",editContact)

router.delete("/contacts/delete",removeContact)


module.exports=router

