import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

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

        if(!token) return null;

        const decode = jwtDecode(token);
        const now = Date.now() / 1000;

        if(decode.exp && decode.exp < now){
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userDetails');
            return null;
        }
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

