const User = require("../models/user");
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
 }
module.exports.signup = async(req,res)=>{
    try{let{username,passward,email}=req.body;
    const newUser = new User({username,email});
    const registeredUser=await User.register(newUser,passward);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","welcome to Wonderlust world");
        res.redirect("/listings");
    })
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
 }
 
 module.exports.login = async(req,res)=>{
     // res.send("user registered successfully");
   req.flash("success","welcome back wonderlust");
   let redirectUrl = res.locals.redirectUrl || "/listings"
   res.redirect(redirectUrl);
}
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("listings");
    })
}