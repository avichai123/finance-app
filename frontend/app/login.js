import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { login } from "../api/auth";
import { getUserToken, storeUserDetails } from "../utils/authStorage";
import * as LocalAuthentication from 'expo-local-authentication';


export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error , setError] = useState('');

  useEffect(() => {
    const checkBiometric = async() =>{
      const isLoggedIn = await getUserToken();
      if(isLoggedIn){
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage:'Login with faceID'
        });
        if(result.success) router.push('/');
      }
    }

    checkBiometric();
  }, [])

  const handleLogin = async () => {
    console.log("Logging in:", phone, password);
    try{
      const details = await login(phone , password);
      await storeUserDetails(details.token , details.user);
      router.push("/"); 
    }catch(error){
      setError(error.message);
    }
     
  };
  if(error) return <View style={styles.container}><Text style={styles.error}>{error}</Text></View>
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: {fontSize:24 , fontWeight:'bold' , color:'red'}
});
