
const userCollection=require("../models/userModel")

const jwt=require("jsonwebtoken")

const contactCollection=require("../models/contactModel")


/* Creating a token */


const createToken=async(id)=>{
    return jwt.sign({id},process.env.PRIVATEKEY,{expiresIn:"2d"})
}



/* User signup */

const userSignup=async(req,res)=>{
const{email,password}=req.body

try{
const response=await userCollection.signup(email,password)
res.status(200).json(response)
}catch(error){
    res.status(400).json(error.message)
}

}


/* User Login */

const userLogin=async(req,res)=>{
    const{email,password}=req.body

    try{
const response=await userCollection.login(email,password)

const token=await createToken(response._id)

res.status(200).json(token)
    }catch(error){
        res.status(400).json(error.message)
    }
}

/* Creating a new contact */

const createContact=async(req,res)=>{
    const{name,phone,email,address}=req.body
    const userId=req.user
if(req.body){
    try{
const response=await contactCollection.newContact(name,phone,email,address,userId)
console.log(response,"jk");
res.status(200).json(response)
    }catch(error){
        res.status(400).json(error.message)
    }
}else{
    res.status(400).json({message:"Something went wrong"})
}
    
}


/* Edit a contact */

const editContact=async(req,res)=>{
    const{name,phone,email,address,contactid}=req.body
    if(req.body){
        try{
    const response=await contactCollection.editContact(name,phone,email,address,contactid)
    res.status(200).json(response)
        }catch(error){
            res.status(400).json(error.message)
        }
    }else{
        res.status(400).json({message:"Something went wrong"})
    }
        

}

/* Fetching all contacts */


const allContacts=async(req,res)=>{
    const userId=req.user
try{
const response=await contactCollection.find({userId:userId})
res.status(200).json(response)
}catch(error){
res.status(400).json({message:'Unable to get contacts'})
}

}

/* Delete a contact */

const removeContact=async(req,res)=>{
const{contactid}=req.body
try{
    const response=await contactCollection.deleteContact(contactid)
    res.status(200).json({message:"Contact deleted Successfully"})
}catch(error){
    res.status(400).json({message:error.message})
}

}


module.exports={
    userSignup,userLogin,createContact,editContact,allContacts,removeContact
}