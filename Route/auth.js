const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/Users");

//Register
router.post("/register", async (req, res) => {
    
    try {
      // new secure Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      // Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      //   save and return response
      
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //Login
  router.post("/login", async (req, res) => {
    
    try {
        console.log("Connected",req.body.userName,req.body.password);
      const user = await User.findOne({ username: req.body.userName });
      !user && res.status(400).json("No user found");
  
      const validPassword = await bcrypt.compare(
       
        req.body.password,
        user.password
      );
      !validPassword && res.status(400).json("Invalid password");
  
      res.status(200).json(user);
      // res.send(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;