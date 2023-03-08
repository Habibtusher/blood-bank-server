const Users = require("../models/Users");
const bcrypt = require("bcrypt");

const register =  async (req, res) => {

    try {
      // new secure Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Create new user
      const user ={
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      const newUser = await Users.create(user);
      res.status(201).json({
        status: "success",
        message: "New User Created!",
        data: newUser,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  const login = async (req, res) => {
    
    try {
        console.log("Connected",req.body.userName,req.body.password);
      const user = await Users.findOne({ username: req.body.userName });
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
  }
  const getusers = async (req,res) =>{
    try {
        const users = await Users.find();
        res.status(201).json({
          status: "success",
          message: "success",
          data: users,
        });
      } catch (error) {
        res.status(500).json(err)
      }
  }
  module.exports = { register,login,getusers };