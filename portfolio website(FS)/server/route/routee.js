const express = require("express");

const jwt = require("jsonwebtoken");
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
require("../db/conn");
const usermodel = require("../model/userschema");
router.use(express.json());
// router.use(express.json());
const mongoose = require("mongoose");
//async function  to create a new hash password for a user authentication
const bcrypt = require("bcrypt");
var cookieParser = require('cookie-parser');
router.use(cookieParser());
const cors = require("cors");
const authenticate = require("../middleware/authenticate");
const { response } = require("express");
router.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}));


router.use(function (req, res, next) {

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

})

router.get("/", (req, res) => {
  // const apidata=usermodel.find({})
  // res.cookie('log','sumit')
  res.json({ message: "  hello this is my message!" });
  console.log("this is route from the route page");
});

router.post("/register", async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const { name, email, password, cpassword, country } = req.body;
  if (!name || !email || !country || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Enter the data properly in the given field" });
  }

  if (password !== cpassword) {
    return res.json({ error: "password didn't match" });
  }

  try {
    const userExist = await usermodel.findOne({ email: email });
    if (userExist) {
      return res.status(200).json({ error: "User already exists" });
    }
    const user = new usermodel({
      name: name,
      email: email,
      password: password,
      cpassword: cpassword,
      country: country,
    });
    const token = await user.generateAuthToken();
    console.log(token);
    // The res.cookie() function is used to set the cookie name to value .
    // the value parameter may be a string or object converting to JSON.
     
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 60000000),
    //   httpOnly: true,
    // });


    const response = await user.save();

    if (response) {
      res.cookie("jwtregister", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
  
      });
      // console.log(user)
      console.log(response);
      res.status(201).json({ message: "user registered successfully" });
    }
      // secure:true
  } catch (err) {
    console.log(err);
  }
  // res.json({ data: req.body });
});

//login functionality for user

router.post("/login", async (req, res) => {
  console.log("Hello world! this is message from post request of /login");
  // res.header("Access-Control-Allow-Origin", "*");
  const username = req.body.email;
  const password = req.body.password;
  const userfind = await usermodel.findOne({ email: username });

  const isMatch = await bcrypt.compare(password,userfind.password);
  if (isMatch) {

    const token = await userfind.generateAuthToken();
    res.cookie("jwtlogin", token, {
      expires: new Date(Date.now() + 360000000),
      httpOnly: true
    });
    console.log("\n password match successfuly");
    res.status(200).json({ success: "password match successfuly" });
    console.log(token);
  }
  // secure:true

  else {
    res.status(400).json({ message: "Oops password didn't match" });
    console.log("\n Oops password did not match ");
  }

  // result == true
});

router.get('/about',authenticate,(req,res) => {
   
  // console.log("hello my about");
  res.send(req.rootuser);
})

router.get('/getdata',authenticate,(req,res) => {
// res.cookie("about","sumit ka cookie");
//  console.log("hello my about");
 res.send(req.rootuser);
})

router.post('/contact',authenticate,async(req,res) => {
  try {
    const{name,email,message} = req.body
    if(!name||!email||!message){
      console.log(" no name or email or message")
      return res.json({error:"input field is empty"})
    }

     const usercontact=await usermodel.findOne({_id:req.userID})
     if(usercontact){
      const usermessage=await usercontact.addmessage(name,email,message)
     await usercontact.save();
     res.status(201).json({message:"contact updated successfully"})
    
    }
    

  } catch (error) {
    console.log(error);
    
  }
  })
  router.get('/logout',(req,res) => {
    res.clearCookie('jwtlogin',{path:'/'});
   res.status(201).json({message: 'Successfuly logged out'});
 })

module.exports = router;
