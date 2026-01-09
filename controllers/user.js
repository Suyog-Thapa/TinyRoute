const User=require("../models/user")
let uuidv4;
(async () => {
  uuidv4 = (await import("uuid")).v4;
})();

const {setUser}=require("../service/auth")
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  
  return res.redirect("/login");  
}

async function handleUserLogIn(req,res){
const {name,email,password}=req.body
const user=await User.findOne({email,password})
if(!user)
    return res.render("login",{
error:"Invalid Email or Password"
    })

const token=setUser(user)
res.cookie('uid',token)
return res.redirect("/")
}
module.exports={
    handleUserSignUp,handleUserLogIn
}