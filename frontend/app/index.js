import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground, Alert } from "react-native";
import { useRouter } from "expo-router";
import { getUserToken } from "../utils/authStorage";
import { authenticateWithFaceId } from "../utils/biometricAuth";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    let timeout;

    const checkLogin = async () => {
      const token = await getUserToken();

      timeout = setTimeout(async () => {
        if (token) {
          try {
            const success = await authenticateWithFaceId();
            if (success) {
              router.replace("/transaction");
            } else {
              Alert.alert(
                "Face ID failed",
                "You can log in with your password instead.",
                [{ text: "OK", onPress: () => router.replace("/login") }]
              );
            }
          } catch (error) {
            console.error("Face ID error:", error);
            router.replace("/login");
          }
        } else {
          router.replace("/login");
        }
      }, 1500);
    };

    checkLogin();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background_image.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>💸 Finance App</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
});
