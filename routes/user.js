const express = require("express");

const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../model/User");

router.post("/website/signup", async (req, res) => {
  try {
    const { username, email, password, newsletter } = req.body;

    const token = uid2(16);
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);

    if (!req.body.username) {
      return res.json({ message: "there is not a username" });
    }

    if (req.body.email !== null) {
      return res.json({ message: "email already saved" });
    } else {
      const newUser = new User({
        email: email,
        username: username,
        password: password,
        newsletter: newsletter,
        token: token,
        salt: salt,
        hash: hash,
      });
      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/website/login", async (req, res) => {
  try {
    const anUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (anUser) {
      res.json(anUser);
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;
