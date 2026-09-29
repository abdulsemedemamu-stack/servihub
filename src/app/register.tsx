import React, { useState } from "react";
import {
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

type Role = "customer" | "provider";

export default function RegisterScreen() {
  const [role, setRole] = useState<Role>("customer");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.subtitle}>
              Join ServiHub and get started today.
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressActive} />
          <View style={styles.progressInactive} />
          <View style={styles.progressInactive} />
        </View>

        <Text style={styles.sectionTitle}>How will you use ServiHub?</Text>

        <Text style={styles.sectionSubtitle}>
          Choose the account type that best describes you.
        </Text>

        {/* Customer */}
        <Pressable
          onPress={() => setRole("customer")}
          style={[styles.roleCard, role === "customer" && styles.selectedCard]}
        >
          <View
            style={[
              styles.roleIcon,
              role === "customer" && styles.selectedIcon,
            ]}
          >
            <Ionicons
              name="person-outline"
              size={28}
              color={role === "customer" ? "#FFFFFF" : "#2563EB"}
            />
          </View>

          <View style={styles.roleContent}>
            <Text style={styles.roleTitle}>I'm a Customer</Text>

            <Text style={styles.roleDescription}>
              Find professionals and book services.
            </Text>
          </View>

          <View
            style={[styles.radio, role === "customer" && styles.radioSelected]}
          >
            {role === "customer" && <View style={styles.radioInner} />}
          </View>
        </Pressable>

        {/* Provider */}
        <Pressable
          onPress={() => setRole("provider")}
          style={[styles.roleCard, role === "provider" && styles.selectedCard]}
        >
          <View
            style={[
              styles.roleIcon,
              role === "provider" && styles.selectedIcon,
            ]}
          >
            <Ionicons
              name="construct-outline"
              size={28}
              color={role === "provider" ? "#FFFFFF" : "#2563EB"}
            />
          </View>

          <View style={styles.roleContent}>
            <Text style={styles.roleTitle}>I'm a Service Provider</Text>

            <Text style={styles.roleDescription}>
              Offer your skills and find new customers.
            </Text>
          </View>

          <View
            style={[styles.radio, role === "provider" && styles.radioSelected]}
          >
            {role === "provider" && <View style={styles.radioInner} />}
          </View>
        </Pressable>

        {/* Personal information */}
        <Text style={styles.sectionTitle}>Personal information</Text>

        {/* Full name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full name</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#94A3B8" />

            <TextInput
              placeholder="Enter your full name"
              placeholderTextColor="#94A3B8"
              style={styles.input}
            />
          </View>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email address</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#94A3B8" />

            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>
        </View>

        {/* Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone number</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#94A3B8" />

            <TextInput
              placeholder="+251 9XX XXX XXX"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />

            <TextInput
              placeholder="Create a strong password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              style={styles.input}
            />
          </View>
        </View>

        {/* Provider extra info */}
        {role === "provider" && (
          <View style={styles.providerNotice}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color="#2563EB"
            />

            <Text style={styles.providerNoticeText}>
              As a provider, you'll complete your professional profile after
              registration.
            </Text>
          </View>
        )}

        {/* Continue */}
        <Pressable
          onPress={() => router.push("/verification")}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>

          <View style={styles.arrowCircle}>
            <Ionicons name="arrow-forward" size={19} color="#2563EB" />
          </View>
        </Pressable>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>

          <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.loginLink}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    paddingHorizontal: 24,
    paddingBottom: 35,
  },

  header: {
    marginTop: 10,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: {
    marginTop: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 7,
  },

  progressContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 25,
    marginBottom: 30,
  },

  progressActive: {
    height: 5,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#2563EB",
  },

  progressInactive: {
    height: 5,
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#E2E8F0",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 17,
  },

  roleCard: {
    minHeight: 94,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  selectedCard: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },

  roleIcon: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedIcon: {
    backgroundColor: "#2563EB",
  },

  roleContent: {
    flex: 1,
    marginLeft: 13,
  },

  roleTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  roleDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
    marginTop: 4,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },

  radioSelected: {
    borderColor: "#2563EB",
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#2563EB",
  },

  inputGroup: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },

  inputWrapper: {
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    height: "100%",
    marginLeft: 10,
    color: "#0F172A",
    fontSize: 14,
  },

  providerNotice: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 15,
    padding: 14,
    marginBottom: 18,
  },

  providerNoticeText: {
    flex: 1,
    marginLeft: 9,
    color: "#475569",
    fontSize: 12,
    lineHeight: 18,
  },

  continueButton: {
    height: 58,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8,
  },

  continueText: {
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

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 22,
  },

  loginText: {
    color: "#64748B",
    fontSize: 14,
  },

  loginLink: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 5,
  },

  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
});
