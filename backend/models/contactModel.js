const mongoose=require("mongoose")

const bcrypt=require("bcrypt")
const schema=mongoose.Schema

const contactSchema=new schema({
    userId:{
type:String,
required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})


contactSchema.statics.newContact=async function(name,phone,email,address,userId){

if(name && phone && email && address && userId){
    const contactExist=await this.findOne({name:{$regex:new RegExp(name),$options:"i"}})
    if(contactExist){
        throw new Error("Contact already exists")
    }else{
        const contact=await this.create({userId:userId,name:name,phone:phone,email:email,address:address})
        return contact
    }
   
}else{
    throw new Error("Fill out all fields")
}

}


contactSchema.statics.editContact=async function(name,phone,email,address,contactid){
  
        const response=await this.updateOne({_id:contactid},{name:name,email:email,phone:phone,address:address},{new:true})
        if(response){
        return response
        }else{
            throw new Error("Unable to update contact")
        }
    
 
}


contactSchema.statics.deleteContact=async function(contactid){
    const response=await this.deleteOne({_id:contactid})
  
    if(!response){
        throw new Error("Unable to delete")
    }else{
        return response
    }
}



module.exports=mongoose.model("contact",contactSchema)
