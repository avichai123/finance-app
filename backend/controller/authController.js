const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findUserByPhoneNumber, createUser } = require('../services/authService');

const login = async(req , res) =>{
    try {
        const {phoneNumber , password} = req.body;
        const user = await findUserByPhoneNumber(phoneNumber);

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
        res.status(200).json({token , user:{
            id:user.id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phoneNumber
        }});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const register = async(req , res) => {
    try{
        const {phoneNumber , password , name ,email} = req.body;

        if(!phoneNumber || !password || !name){
            return res.status(400).json({message:"Missing fileds"});
        }

        const existUser = await findUserByPhoneNumber(phoneNumber);

        if(existUser){
            return res.status(409).json({message:"User already exist"});
        }

        const newUser = await createUser(phoneNumber , password , name , email);

        res.status(201).json({message:"User account created successfully!"});

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    login,
    register
}