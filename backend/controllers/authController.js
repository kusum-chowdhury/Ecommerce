const bcrypt = require('bcrypt');
const User = require('../models/userModel');

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
module.exports = registerController