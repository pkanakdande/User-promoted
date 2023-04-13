const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/promoted-api")
.then(res=>{
    console.log("connected")
})
.catch(res=>{
    console.log("error")
})

const createSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,
    unique:true},
    ispromoted:{type:Boolean,
    default:null}

})
const dbmodel=mongoose.model("user-data",createSchema)
module.exports=dbmodel