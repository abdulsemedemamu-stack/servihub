import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function OnboardingThreeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.logo}>ServiHub</Text>

        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.illustration}>
        <Text style={styles.mainIcon}>📅</Text>
        <Text style={styles.check}>✓</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Book Services{"\n"}With Ease</Text>

        <Text style={styles.description}>
          Request a service, choose a convenient time, communicate with your
          professional, and track your booking.
        </Text>
      </View>

      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>Let's Get Started</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 28,
    paddingTop: 60,
    paddingBottom: 35,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 23,
    fontWeight: "800",
    color: "#2563EB",
  },

  skip: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
  },

  illustration: {
    flex: 1,
    maxHeight: 300,
    marginTop: 35,
    borderRadius: 30,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
  },

  mainIcon: {
    fontSize: 105,
  },

  check: {
    position: "absolute",
    bottom: 55,
    right: 80,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#22C55E",
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 45,
  },

  content: {
    marginTop: 35,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    color: "#0F172A",
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: "#64748B",
    marginTop: 15,
  },

  dots: {
    flexDirection: "row",
    gap: 7,
    marginTop: 25,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBD5E1",
  },

  activeDot: {
    width: 25,
    backgroundColor: "#2563EB",
  },

  button: {
    height: 58,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 24,
    marginLeft: 12,
  },

  backButton: {
    alignItems: "center",
    paddingTop: 18,
  },

  backText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});
