const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mongouser");

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













