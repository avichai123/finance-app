import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { login } from "../api/auth";
import { storeUserDetails, getUserToken } from "../utils/authStorage";
import { authenticateWithFaceId } from "../utils/biometricAuth";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPasswordLogin, setShowPasswordLogin] = useState(false); // 🔹 מצב למעבר בין Face ID לסיסמה

  const handleLogin = async () => {
    try {
      const details = await login(phone, password);
      await storeUserDetails(details.token, details.user);
      router.replace("/transaction");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFaceId = async () => {
    const hasSession = await getUserToken();
    if (!hasSession) {
      Alert.alert("No session found", "Please log in with your password first.");
      setShowPasswordLogin(true);
      return;
    }

    const success = await authenticateWithFaceId();
    if (success) {
      router.replace("/transaction");
    } else {
      Alert.alert(
        "Face ID failed",
        "You can try again or use your password instead.",
        [
          { text: "Try Again", onPress: handleFaceId },
          { text: "Use Password", onPress: () => setShowPasswordLogin(true) },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      {showPasswordLogin ? (
        <>
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.faceIdBtn} onPress={handleFaceId}>
            <Image source={require("../assets/Face_ID.webp")} style={styles.faceIcon} />
            <Text style={styles.faceText}>Login with Face ID</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowPasswordLogin(true)}>
            <Text style={styles.altLoginText}>Use password instead</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.registerText}>
          Don’t have an account?{" "}
          <Text style={styles.linkText}>Create one</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  error: { fontSize: 16, color: "red", textAlign: "center", marginVertical: 10 },

  // Face ID button
  faceIdBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  faceIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  faceText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  altLoginText: {
    textAlign: "center",
    color: "#007AFF",
    fontSize: 15,
    marginTop: 20,
    textDecorationLine: "underline",
  },
  registerText: {
    textAlign: "center",
    marginTop: 25,
    color: "#333",
    fontSize: 15,
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
