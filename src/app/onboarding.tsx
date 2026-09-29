import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>S</Text>
        </View>

        <Text style={styles.logoText}>ServiHub</Text>
      </View>

      {/* Illustration */}
      <View style={styles.illustration}>
        <Text style={styles.illustrationIcon}>🛠️</Text>
        <Text style={styles.illustrationIcon}>👨‍🔧</Text>
        <Text style={styles.illustrationIcon}>🏠</Text>
      </View>

      {/* Text */}
      <View style={styles.content}>
        <Text style={styles.title}>Find Trusted Services{"\n"}Near You</Text>

        <Text style={styles.description}>
          Discover trusted professionals, book services, and get your tasks done
          easily with ServiHub.
        </Text>
      </View>

      {/* Dots */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/onboarding-two")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      {/* Skip */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.skipText}>Skip</Text>
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

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  logoIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
  },

  logoText: {
    fontSize: 23,
    fontWeight: "800",
    color: "#0F172A",
    marginLeft: 10,
  },

  illustration: {
    flex: 1,
    maxHeight: 300,
    marginTop: 35,
    borderRadius: 30,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 18,
  },

  illustrationIcon: {
    fontSize: 55,
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
    marginTop: 25,
    gap: 7,
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

  skipButton: {
    alignItems: "center",
    paddingTop: 18,
  },

  skipText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "600",
  },
});
