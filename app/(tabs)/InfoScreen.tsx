import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome To Face Unlock</Text>
      </View>
      <View style={styles.personal}>
        <Text style={styles.personalText}>Your Personal Information</Text>
        <Text style={styles.personalText}>Name: Lewis Hamilton</Text>
        <Text style={styles.personalText}>Age: 40</Text>
        <Text style={styles.personalText}>Height: 5&apos;11</Text>
        <Text style={styles.personalText}>Home: Monaco</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  headerText: { fontSize: 30, fontWeight: "600" },
  personal: {
    marginLeft: 24,
    marginVertical: 34,
  },
  personalText: {
    marginBottom: 8,
    fontSize: 15,
  },
});
