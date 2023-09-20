const jwt = require("jsonwebtoken");
const User = require('../models/users');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};        
        User.findById(req.userData.userId)
        .then((result) => {
            if(result !== null) {
                next();
            }
            else {
                return res.status(401).json({
                    "message": "User Unauthorized"
                })
            }
        })
        .catch((err) => {
            return res.status(401).json({
                "message": "User Unauthorized",
                err: err
            });
        })
    } catch(err) {
        console.log("Error: ", err);
        return res.status(401).json({
            "message": "User Unauthorized",
            err
        })
    }
}