const bcrypt = require("bcryptjs");

const User = require("../models/users");

const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((result) => {
          console.log(result);
          return res.status(200).json({
            message: "User Authenticated Successfully",
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
          return res.status(500).json({
            message: "User Not Authenticated",
          });
        });
    })
    .catch((err) => {
      console.log("Error: ", err);
      return res.status(500).json({
        message: "User Not Authenticated",
      });
    });
};

exports.loginUser = (req, res, next) => {
  console.log("Entered User Login");
  let userData = {};
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) {
        return res.status(403).json({ message: "User Not Found" });
      }

      userData = result;
      return bcrypt.compare(req.body.password, result.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: "Password Not Matched" });
      }

      const token = jwt.sign(
        { email: userData.email, userId: userData._id },
        "secret_for_jwt",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "User Logged In Successfully",
        token: token,
        expiresIn: 3600,
        userId: userData._id
      });

    });
};
