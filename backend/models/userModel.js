const mongoose=require("mongoose")

const bcrypt=require("bcrypt")
const schema=mongoose.Schema

const userSchema=new schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.statics.signup=async function(email,password){

const salt=await bcrypt.genSalt(10)
const hash=await bcrypt.hash(password,salt)

const userExist=await this.findOne({email:email})
if(userExist){
    throw new Error("Email already exist")
}else{
    const response=await this.create({email:email,password:hash})
    return response
}

}


userSchema.statics.login=async function(email,password){

    const user=await this.findOne({email:email})
    if(!user){
        throw new Error("User not found")
    }
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            throw new Error("Wrong password")
        }
            return user
    
}


module.exports=mongoose.model("User",userSchema)