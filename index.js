 const express=require("express")
const app= express();
const path= require("path");
const userModel =require("./models/user.js")
const  cookieParser=require("cookie-parser");
const cors=require("cors");

const jwt=require("jsonwebtoken");
const checkLogin = require("./middleware.js");
const upload = require("./multer.js");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"publics")));
app.use(cookieParser());
app.set("view engine","ejs");



app.get("/api/login",(req,res)=>{
  res.render("login");
})





app.get("/",(req,res)=>{
  res.render("form")


});




app.post("/api/photo",upload.single("image"),checkLogin,async(req,res)=>{
   const data=req.body;    
   if(!req.file){
    return res.send("please select image file")
   }
  const user= await userModel.findById(data.data.userid);
      console.log(user);
     user.profilepic=req.file.filename;
     await user.save();
     res.redirect("/api/profile")
     

});






app.get("/api/register",(req,res)=>{

  res.render("register");
       
});


app.post("/api/create",async(req,res)=>{
   let{name,email,password}=req.body;
    if(name=="" ||email=="" ||password==""){
      return res.send("All fields are mandatory")
    }

   let user= await userModel.findOne({email});

   if(user){
   return res.send("user is already present");
   }
   
   let create= await userModel.create(req.body);
   
   const token=jwt.sign({email,userid:create._id},"shhhhh");

   res.cookie("token",token,{maxAge:1000*60*60});
    
   res.redirect("/api/profile");


});


app.post("/api/access",async(req,res)=>{
  let{email,password}=req.body;
  console.log(req.body);
   if(email=="" ||password==""){
     return res.send("All fields are mandatory")
   }

  let user= await userModel.findOne({email});

  if(user && user.password==password){
    const token=jwt.sign({email,userid:user._id},"shhhhh");
    res.cookie("token",token,{maxAge:1000*60*60});
    return  res.redirect("/api/profile");
  }

else{
 return res.send("user detail are in correct");
}

});




app.get("/api/profile",checkLogin,async(req,res)=>{
  
   const data=req.body.data;
     
   const user= await userModel.findById(data.userid);

  res.render("profile",{user});
})



app.get("/api/:id",async(req,res)=>{
   const user=  await userModel.findById( req.params.id);

   res.render("edit",{user}); 

})





app.post("/api/edit/:id",async(req,res)=>{
  const user=  await userModel.findById( req.params.id);

  if(user){
    const user=  await userModel.findByIdAndUpdate( req.params.id,req.body,{new:true});
    res.redirect("/api/profile");

    
  }else{
    res.send("user is not edit");
  }

})




app.listen(3001,()=>{
    console.log(`this is good port`);
});

