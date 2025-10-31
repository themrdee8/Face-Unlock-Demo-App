import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const router = useRouter();
  const logout = () => router.push("/");

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.textStyle}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginLeft: 24,
    marginVertical: 34,
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  headerText: { fontSize: 30, fontWeight: "600" },
  textStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
});
