let express=require("express");
const { join } = require("path");
var methodOverride = require('method-override')
const dbmodel = require("./conn/conn");
let app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.set("views","views")
app.set("view engine","ejs")

app.get("/",async (req,res)=>{
    let data=await dbmodel.find();
 
    res.render("home",{data})
})


app.get("/form",(req,res)=>{
    res.render("form")
})


app.post("/form",(req,res)=>{
    let {name,email}=req.body
    let doc=new dbmodel({
        name:name,
        email:email,
    })
    doc.save()
    res.redirect("/")
})
app.put("/users/:id",async (req,res)=>{
    let _id=req.params.id;
    let user=await dbmodel.findOne({_id:_id})
    if(user.ispromoted==null)
    {
        let data= await dbmodel.findByIdAndUpdate(_id,{ispromoted:true},{new:true})
       
    }
   else if(user.ispromoted==true){
    let data= await dbmodel.findByIdAndUpdate(_id,{ispromoted:false},{new:true})
  
   }
   else if(user.ispromoted==false)
   {
    let data= await dbmodel.findByIdAndUpdate(_id,{ispromoted:true},{new:true})
    
   }
   res.redirect("/") 
})

app.delete("/users/:id",async(req,res)=>{
    try{
     
    const deleteUser=await dbmodel.findByIdAndDelete(req.params.id)
       res.redirect("/")
    }
    catch(e){
        res.send(e)
    }
})


app.listen(4000,()=>{
    console.log("running")
})