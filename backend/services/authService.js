const User = require("../models/user")

const findUserByPhoneNumber = async(phoneNumber) =>{
    if(!phoneNumber){
        throw new Error("Phone number is required");
    }

    const existUser = await User.findOne({where:{phoneNumber}});

    return existUser;
}

const createUser = async(phoneNumber , password , name ,email=null) => {
    if(!password || !phoneNumber || !name){
        throw new Error("Missing filed");
    }

    const newUser = await User.create({
        phoneNumber,
        password,
        name,
        email
    });

    return newUser;
}

module.exports = {
    findUserByPhoneNumber,
    createUser
}