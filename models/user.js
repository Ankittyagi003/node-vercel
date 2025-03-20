const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://tyagiiankit254:gxb7U9V5crQa2KG9@cluster2.cmiii.mongodb.net/");

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













