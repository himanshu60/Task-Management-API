const express = require("express");
require("dotenv").config();
const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

// user register Route
userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validate if all required fields are provided
    if (!email || !name || !password) {
      return res.status(401).send({ error: "Please Fill All The details" });
    }

    const hash = await bcrypt.hash(password, 10);
    const isExist = await userModel.findOne({ email });

    if (isExist) {
      res.status(400).json({ msg: "User already exists" });
    } else {
      const user = new userModel({ name, email, password: hash });
      await user.save();
      res.status(200).json({ msg: "User register sucessfull" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
});

// user Login Route

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const passmatch = await bcrypt.compare(password, user.password);
      if (passmatch) {
        const token = jwt.sign({ userID: user._id }, process.env.KEY, {
          expiresIn: "1d",
        }); // Token expiration time (e.g., 1 day)
        res
          .status(200)
          .json({ message: "User Login SucessFully", token: token });
      } else {
        res.status(401).json({ message: "Wrong Credentials" });
      }
    } else {
      res.status(401).json({ message: "User Not Found!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", error: error.msg });
  }
});

module.exports = { userRouter };
