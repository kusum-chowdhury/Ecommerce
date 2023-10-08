const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1] //{"bearer" {token}}
    if(!token){
        return res.status(401).json({
            err: "token not found"
        })
    }

    const decode = jwt.verify(token, "secret message");
    const user = await User.findOne({where: {id: decode.user.id}});
    if(!user){
        return res.send(404).json({
            err: "user not found"
        });
    }
    req.user = user;
    next();
}

const isSeller = async(req, res, next)=> {
    console.log(req.user.isSeller);
    if(req.user.isSeller){
        next();
    } else {
        return res.status(401).json({
            err: "you are not a seller"
        })
    }
}

module.exports = {isAuthenticated, isSeller};