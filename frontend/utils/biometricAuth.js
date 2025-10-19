import * as LocalAuthentication from "expo-local-authentication";

export const authenticateWithFaceId = async () => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Face ID",
    });
    return result.success;
  } catch (err) {
    console.error("Face ID Error:", err);
    return false;
  }
};
