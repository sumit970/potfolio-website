const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const userschema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  country: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
  cpassword: {
    type: "string",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },
      message: {
        type: "string",
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userschema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    // console.log(token);
    this.tokens = this.tokens.concat({ token: token });

    await this.save();
    return token;
  } catch (err) {
    // res.send(err)

    console.error(err);
  }
};
userschema.methods.addmessage = async function (name, email, message) {
  try {
    this.messages = this.messages.concat({ name, email, message });
    await this.save();
    return this.messages;
  } catch (error) {
    console.error(error);
  }
};

userschema.pre("save", async function (next) {
  console.log("saving the hashed password...");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

const usermodel = new mongoose.model("USER", userschema);
module.exports = usermodel;
