import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { register } from "../api/auth";

export default function Register() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error , setError] = useState('');

  const handleRegister = async () => {
    try{
      await register(phone , name , password);
      router.push("/login"); 
    }catch(error){
      setError(error.message);
    }
  };

  if(error) return <View style={styles.container}><Text style={styles.error}>{error}</Text></View>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  error: {fontSize:24 , fontWeight:'bold' , color:'red'}
});
