const jwt=require("jsonwebtoken");


const checkLogin=function (req,res,next){
 
    if(req.cookies.token){
     
        const data=jwt.verify(req.cookies.token,"shhhhh")
        req.body.data=data;

        next();
    }

    else{
        res.redirect("/api/login");
    }
    


}





module.exports=checkLogin;



