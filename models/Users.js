const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 40,
      unique: true,
    },
    mobile: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    bloodGroup: {
        type: String,
        default: "",
      },
    lastDonate:{
        type:String,
        default:""
      },
    fbUrl:{
        type:String,
        default:""
      }
  },
 
);

module.exports = mongoose.model("user", UserSchema);
