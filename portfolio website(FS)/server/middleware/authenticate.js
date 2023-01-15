const jwt = require("jsonwebtoken");
const user = require("../model/userschema");
const bodyParser = require('body-parser');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtlogin;
    const verifytoken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifytoken);
    const rootuser = await user.findOne({
      _id: verifytoken._id,
      "tokens.token": token,
    });
    req.token = token;
    req.rootuser = rootuser;
    req.userID = rootuser._id;

    if (!rootuser) {
      throw new Error("user not found");
      // res.statu s(404).json({ message: "user ids  not found" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("no token provided");
  }
};

// authenticate()
// console.log()

module.exports = authenticate;
