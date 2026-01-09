const express=require("express")
require("dotenv").config()
const port=process.env.PORT||8001
const path=require("path")
const {connectToMongoDB}=require("./connect")
const urlRoute=require("./routes/url")
const cookieParser=require("cookie-parser")
const app=express()
const URL=require("./models/urls")
const staticRoute=require("./routes/staticRouter")
const userRoute=require("./routes/user")
const {restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth")
connectToMongoDB(process.env.MONGO_URL).then(()=>console.log("Connected to MongoDB....."))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json())
app.use("/url",restrictToLoggedinUserOnly,urlRoute)
app.use("/",checkAuth,staticRoute)
app.use("/user",userRoute)




app.get("/:shortId",async (req,res)=>{
const shortId=req.params.shortId
const entry=await URL.findOneAndUpdate({shortId
},{$push:{
    visitHistory:{timestamp:Date.now()}
}})
if(!entry){
    return res.status(404).send("Invalid short URL")
}
res.redirect(entry.redirectURL)
})


app.listen(port,()=>console.log(`Server started at port:${port}`))