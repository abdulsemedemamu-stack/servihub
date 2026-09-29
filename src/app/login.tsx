import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Backend authentication will be connected later.
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Back */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </Pressable>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Ionicons name="construct" size={25} color="#FFFFFF" />
            </View>

            <Text style={styles.welcome}>Welcome back 👋</Text>

            <Text style={styles.title}>Sign in to ServiHub</Text>

            <Text style={styles.subtitle}>
              Find trusted professionals and manage your services in one place.
            </Text>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={21} color="#94A3B8" />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={21} color="#94A3B8" />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!showPassword}
                style={styles.input}
              />

              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={10}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={21}
                  color="#64748B"
                />
              </Pressable>
            </View>
          </View>

          {/* Forgot password */}
          <Pressable
            onPress={() => router.push("/forgot-password")}
            style={styles.forgotButton}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          {/* Login */}
          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.loginText}>Sign In</Text>

            <View style={styles.arrowCircle}>
              <Ionicons name="arrow-forward" size={18} color="#2563EB" />
            </View>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />

            <Text style={styles.orText}>OR</Text>

            <View style={styles.divider} />
          </View>

          {/* Google */}
          <Pressable
            style={({ pressed }) => [
              styles.googleButton,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.googleIcon}>
              <Text style={styles.googleG}>G</Text>
            </View>

            <Text style={styles.googleText}>Continue with Google</Text>
          </Pressable>

          {/* Register */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>

            <Pressable onPress={() => router.push("/register")}>
              <Text style={styles.registerLink}>Create account</Text>
            </Pressable>
          </View>

          {/* Terms */}
          <Text style={styles.terms}>
            By continuing, you agree to ServiHub's{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  keyboard: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 25,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  header: {
    alignItems: "center",
    marginTop: 22,
    marginBottom: 28,
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  welcome: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563EB",
    marginBottom: 7,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#64748B",
    textAlign: "center",
    marginTop: 9,
    maxWidth: 330,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  inputWrapper: {
    height: 56,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 11,
    color: "#0F172A",
    fontSize: 15,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 22,
  },

  forgotText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },

  loginButton: {
    height: 58,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 23,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  orText: {
    marginHorizontal: 13,
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
  },

  googleButton: {
    height: 56,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  googleIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  googleG: {
    fontSize: 21,
    fontWeight: "800",
    color: "#4285F4",
  },

  googleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

  registerText: {
    color: "#64748B",
    fontSize: 14,
  },

  registerLink: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 5,
  },

  terms: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 22,
    paddingHorizontal: 15,
  },

  termsLink: {
    color: "#64748B",
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.65,
  },

  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});
