
const { register,login,getusers } = require("../Controllers/UserControllers");
const express = require("express");

const router = express.Router();

//Register
router.post("/register", register)
  
  //Login
router.post("/login",login );
router.get("/users",getusers );

module.exports = router;