
const registerController = async(req, res)=> {
   try{
    const { name, email, password, isSeller } = req.body;
    console.log(name)
    
        // const { name, email, password, isSeller } = req.body;
        
        // const existingUser = await User.findOne({
        //   where: {
        //     email
        //   }
        // });
        // if (existingUser !== null) {
        //     return res.status(403).json({ err: 'User already exists' });
        //   }
    }
    catch(e) {
return res.status(500).send(e);
   }
}
module.exports = registerController