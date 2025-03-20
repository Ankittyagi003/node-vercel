const mongoose=require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB);

const userSchema=mongoose.Schema({
name:String,
email:{
    type:String,
    unique:true
},
password:String,
profilepic:{
    type:String,
    default:"/"
}
});




module.exports=mongoose.model("user",userSchema);













