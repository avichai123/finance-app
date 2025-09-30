const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const login = async(req , res) =>{
    try {
        const {phoneNumber , password} = req.body;
        const user = await User.findOne({where:{phoneNumber}});

        if(!user){
            return res.status(401).json({message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch){
            return res.status(401).json({message:"User or password not match"});
        }

        const token = jwt.sign(
            {id:user.id , phoneNumber:user.phoneNumber},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        res.status(200).json({token});
    }catch(error){
        res.status(500).json({message:e.message});
    }
}

module.exports = {
    login,
}