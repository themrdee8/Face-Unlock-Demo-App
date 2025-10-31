import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

//Register
async function registerFace(base64Image: string) {
  await AsyncStorage.setItem("registeredFace", base64Image);
  return { success: true, message: "Face registered successfully." };
}

//Verify
async function verifyFace(newBase64: string) {
  const stored = await AsyncStorage.getItem("registeredFace");
  if (!stored) {
    return { success: false, messsage: "No face registered yet." };
  }

  let matchCount = 0;
  const length = Math.min(stored.length, newBase64.length, 500);
  for (let i = 0; i < length; i++) {
    if (stored[i] === newBase64[i]) matchCount++;
  }
  const similarity = (matchCount / length) * 100;
  const isMatch = similarity > 85;

  return {
    success: isMatch,
    message: isMatch
      ? "Face verified successfully."
      : "Face verification failed",
  };
}

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const [cameraType, setCameraType] = useState<"front" | "back">("front");
  const router = useRouter();

  //Asks for permission on mount
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Checking permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Camera permission is required to use Face Unlock
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraType = () => {
    setCameraType((previous) => (previous === "front" ? "back" : "front"))
  }

  const handleRegister = async () => {
    if (!cameraRef.current) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current?.takePictureAsync({ base64: true });

      if (!photo.base64) {
        Alert.alert("Error", "Failed to capture image data. Try again");
        return;
      }
      const response = await registerFace(photo.base64);
      Alert.alert("Register", response.message);

      if (response.success) router.push("/(tabs)/InfoScreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to register face");
    } finally {
      setIsCapturing(false);
    }
  };

  const handleVerify = async () => {
    if (!cameraRef.current) return;
    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });

      if (!photo.base64) {
        Alert.alert("Error", "Failed to capture image data. Try again");
        return;
      }

      const response = await verifyFace(photo.base64);
      Alert.alert("Verify", response.message);

      if (response.success) router.push("/(tabs)/InfoScreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to verify face");
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={cameraType}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            !isCameraReady && { backgroundColor: "#94a3b8" },
          ]}
          onPress={handleRegister}
          disabled={!isCameraReady || isCapturing}
        >
          {isCapturing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register Face</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            !isCameraReady && { backgroundColor: "#94a3b8" },
          ]}
          onPress={handleVerify}
          disabled={!isCameraReady || isCapturing}
        >
          {isCapturing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Face Unlock</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.buttonText}>Switch Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 12,
    alignItems: "center",
    borderRadius: 14,
    marginBottom: 16,
    marginHorizontal: 6
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
    backgroundColor: '#fff'
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
