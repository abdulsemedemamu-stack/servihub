import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const OTP_LENGTH = 6;
const INITIAL_TIME = 45;

export default function VerificationScreen() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(INITIAL_TIME);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, "");

    if (!numericValue) {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];

    // Handle pasted/multiple digits
    if (numericValue.length > 1) {
      const digits = numericValue.slice(0, OTP_LENGTH).split("");

      digits.forEach((digit, i) => {
        if (index + i < OTP_LENGTH) {
          updatedOtp[index + i] = digit;
        }
      });

      setOtp(updatedOtp);

      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();

      return;
    }

    updatedOtp[index] = numericValue;
    setOtp(updatedOtp);
    setError("");

    // Move to next input
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Hide keyboard after last digit
    if (index === OTP_LENGTH - 1) {
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setError("");
    setLoading(true);

    // Frontend demo only.
    // Real OTP verification will be connected to the backend later.
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        router.replace("/home");
      }, 900);
    }, 1200);
  };

  const handleResend = () => {
    if (timer > 0) return;

    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setSuccess(false);
    setTimer(INITIAL_TIME);

    inputRefs.current[0]?.focus();

    // Real OTP resend API will be connected later.
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </Pressable>

          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="briefcase" size={20} color="#FFFFFF" />
            </View>

            <Text style={styles.logoText}>
              Servi<Text style={styles.logoBlue}>Hub</Text>
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* Main */}
        <View style={styles.content}>
          {/* Verification icon */}
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <Ionicons
                name={success ? "checkmark" : "shield-checkmark"}
                size={42}
                color="#2563EB"
              />
            </View>
          </View>

          <Text style={styles.title}>
            {success ? "Account verified!" : "Verify your account"}
          </Text>

          <Text style={styles.subtitle}>
            {success
              ? "Your account has been successfully verified."
              : "We've sent a 6-digit verification code to your phone or email."}
          </Text>

          {!success && (
            <>
              {/* Demo contact */}
              <View style={styles.contactBox}>
                <View style={styles.contactIcon}>
                  <Ionicons name="mail-outline" size={20} color="#2563EB" />
                </View>

                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>
                    Verification code sent to
                  </Text>

                  <Text style={styles.contactValue}>your email address</Text>
                </View>

                <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
              </View>

              {/* OTP inputs */}
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[
                      styles.otpInput,
                      digit !== "" && styles.otpInputActive,
                      error !== "" && styles.otpInputError,
                    ]}
                    value={digit}
                    onChangeText={(value) => handleChange(value, index)}
                    onKeyPress={(event) => handleKeyPress(event, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    selectTextOnFocus
                    editable={!loading}
                  />
                ))}
              </View>

              {/* Error */}
              {error !== "" && (
                <View style={styles.errorContainer}>
                  <Ionicons name="alert-circle" size={17} color="#DC2626" />

                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {/* Resend */}
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code?</Text>

                {timer > 0 ? (
                  <Text style={styles.timerText}>
                    Resend in {formatTime(timer)}
                  </Text>
                ) : (
                  <Pressable onPress={handleResend}>
                    <Text style={styles.resendButton}>Resend code</Text>
                  </Pressable>
                )}
              </View>

              {/* Verify button */}
              <Pressable
                style={[
                  styles.verifyButton,
                  !isComplete && styles.verifyButtonDisabled,
                ]}
                onPress={handleVerify}
                disabled={!isComplete || loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.verifyButtonText}>Verify account</Text>

                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </>
                )}
              </Pressable>

              {/* Security note */}
              <View style={styles.securityBox}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#64748B"
                />

                <Text style={styles.securityText}>
                  Your verification code helps keep your ServiHub account
                  secure.
                </Text>
              </View>
            </>
          )}

          {success && (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={24} color="#22C55E" />

              <Text style={styles.successText}>
                Redirecting you to ServiHub...
              </Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Need help? </Text>

          <Pressable>
            <Text style={styles.helpText}>Contact support</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
  },

  header: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  logoBlue: {
    color: "#2563EB",
  },

  headerSpacer: {
    width: 44,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 28,
  },

  iconOuter: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  iconInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: "#64748B",
    textAlign: "center",
    maxWidth: 350,
    marginBottom: 24,
  },

  contactBox: {
    width: "100%",
    maxWidth: 430,
    minHeight: 70,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  contactTextContainer: {
    flex: 1,
  },

  contactLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 3,
  },

  contactValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 9,
    marginBottom: 16,
  },

  otpInput: {
    width: 48,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    fontSize: 23,
    fontWeight: "800",
    color: "#0F172A",
  },

  otpInputActive: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },

  otpInputError: {
    borderColor: "#DC2626",
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    paddingHorizontal: 8,
  },

  errorText: {
    color: "#DC2626",
    fontSize: 13,
    flexShrink: 1,
  },

  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginBottom: 24,
  },

  resendText: {
    fontSize: 14,
    color: "#64748B",
  },

  timerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },

  resendButton: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2563EB",
  },

  verifyButton: {
    width: "100%",
    maxWidth: 430,
    height: 56,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#2563EB",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  verifyButtonDisabled: {
    opacity: 0.45,
  },

  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  securityBox: {
    width: "100%",
    maxWidth: 430,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 12,
  },

  securityText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  successBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  successText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "700",
  },

  footer: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    fontSize: 13,
    color: "#64748B",
  },

  helpText: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "700",
  },
});
