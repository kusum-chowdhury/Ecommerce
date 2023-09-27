const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

//function to register user
const registerController = async(req, res)=> {
   try{
    const { name, email, password, isSeller } = req.body;
    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));
    const user = {name, email, password: hashedPassword, isSeller};
    const createdUser = await User.create(user);
    return res.status(200).send(`Welcome ${createdUser.name}, thanks for signing up`);
   }
    catch(e) {
        console.log(">> ", e)
    return res.status(500).json({err: e});
   }
}

//login funtionality
const loginController = async(req, res)=> {
    try{
        const {email, password} = req.body;
        const userExists = await User.findOne({where: {email}});
        if(!userExists){
         return res.status(401).json({message: "user not found"});
        }
        const passwordMatched = bcrypt.compareSync(password, userExists.password);
       if(!passwordMatched){
         return res.status(401).json({Message: "incorrect password or email"})
       }
       const payload = {user: {id: userExists.id}};
       const token = await jwt.sign(payload, "secret message", {
         expiresIn: 450000,
       } )
       res.cookie("t", token, {expire: new Date() + 10000 });
       console.log("success")
       return res.status(200).json({ token });
    }catch(e){
        console.log(">>", e)
        return res.status(500).send(e);
    }
}

const logoutController = async(req, res) => {
    try {
      res.clearCookie('t');
    } catch (e) {
      // Handle any potential errors here
      console.error(e);
      return res.status(500).json({
        message: "Internal Server Error"
      });
    }
  };

module.exports ={ registerController, loginController, logoutController}