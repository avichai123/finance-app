import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserDetails = async(token , user) =>{
    try{
        await AsyncStorage.setItem('userToken' , token);
        await AsyncStorage.setItem('user' , JSON.stringify(user));
    }catch(error){
        console.error(error);
    }
}

export const getUserToken = async() => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token;
    }catch(error){
        console.error(error);
        return null;        
    }
}

export const getUserDetails = async() => {
    try {
        const user = await AsyncStorage.getItem('user');
        return JSON.parse(user);
    }catch(error){
        console.error(error);
    }
}

