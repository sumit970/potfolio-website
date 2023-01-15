const mongoose=require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'})
const DB=process.env.DATABASE;

mongoose.set('strictQuery', false);
mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify: false
}).then(()=>{
    console.log("connection Successfull ");
}).catch((err)=>{
    console.log('No connection to Mongo'+err);
})
//database connected successfully
