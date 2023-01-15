const express=require('express');
const dotenv =require("dotenv");
require('./db/conn')
const app = express();
// const port=3000;
const rout=require('./route/routee')
dotenv.config({path:'./config.env'})
const usermodel = require('./model/userschema');
// to connect the database   mongodb
// const password=encodeURIComponent("Sum!t@970");
// console.log(password)
app.use(rout);
const Port=process.env.PORT;
//using the middleware
const middleware= (req,res,next)=>{
    console.log("Hello this is the middleware");
    next();
}
// middleware()
// handling the get request   
// app.get('/',middleware,(req,res)=>{
// res.send("Hello world this is sumit server side!")
// })
// app.get('/about',(req,res)=>{
//     res.send("Hello world this is sumit server side and you are on the about page!")
//     }) 
// to run the server 
app.listen(Port,()=>{
    console.log (` app is running successfully! at ${Port} `)
})

