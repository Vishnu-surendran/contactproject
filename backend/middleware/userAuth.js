

const jwt=require("jsonwebtoken")

const userCollection=require("../models/userModel")

const userAuthentication=async(req,res,next)=>{

const{authorization}=req.headers

if(!authorization){
    return res.status(401).json({message:"Unauthorized access"})
}

const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.PRIVATEKEY);

    const user = await userCollection.findOne({ _id: id }).select("_id");

    req.user = user._id;

    next();
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: "Token is not valid" });
  }

}

module.exports=userAuthentication