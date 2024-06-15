import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const { width } = Dimensions.get("window");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = () => {
    let emailError = "";
    let passwordError = "";

    if (!validateEmail(email)) {
      emailError = "Please enter a valid email address";
    }

    if (!validatePassword(password)) {
      passwordError = "Password must be at least 6 characters long";
    }

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (!emailError && !passwordError) {
      setLoading(true);
      fetch("https://interviewscheduler-yhcz.onrender.com/api/auth/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data.success) {
            // Handle the successful login response here
            alert("Login successful!");
          } else {
            // Handle the error response here
            alert(data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.message === "Network request failed") {
            alert(
              "Network error occurred. Please check your internet connection."
            );
          } else {
            alert("An error occurred. Please try again later.");
          }
        });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh action, you can call an API or reset state here
    setTimeout(() => {
      setRefreshing(false);
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }, 500);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView style={Styles.container} behavior="padding">
      <ScrollView
        contentContainerStyle={Styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="handled" // Ensures taps outside text inputs dismiss the keyboard
      >
        <TouchableOpacity
          activeOpacity={1}
          style={Styles.container}
          onPress={dismissKeyboard}
        >
          <Text style={Styles.title}>Login to Continue</Text>
          <View style={Styles.inputBoxContainer}>
            <View style={Styles.inputBox}>
              <Text style={Styles.label}>Email ID</Text>
              <TextInput
                style={Styles.textInputBox}
                placeholder="Enter your email id"
                onChangeText={(text) => setEmail(text)}
                value={email}
                onFocus={() => setEmailError("")}
              />
              {emailError && (
                <Text style={Styles.errorText}>{emailError}</Text>
              )}
            </View>
            <View style={Styles.inputBox}>
              <Text style={Styles.label}>Password</Text>
              <TextInput
                style={Styles.textInputBox}
                placeholder="Enter your password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
                onFocus={() => setPasswordError("")}
              />
              {passwordError && (
                <Text style={Styles.errorText}>{passwordError}</Text>
              )}
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#8ED1FC" />
            ) : (
              <TouchableOpacity
                style={[Styles.button, loading && Styles.disabledButton]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={Styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // padding: 16,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: "center",
    marginTop:100
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  inputBoxContainer: {
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 20,
    paddingVertical: 30,
    maxWidth: 400,
    borderRadius: 15,
    width: width - 40, // Ensure some distance from left and right
    alignItems: "center",
  },
  inputBox: {
    width: "100%",
    marginVertical: 5,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    marginHorizontal: 5,
  },
  textInputBox: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 12,
  },
  buttonText: {
    color: "#ffff",
    // fontWeight: 600,
    fontSize: 16,
  },
  button: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D47A1",
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#BDBDBD",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default Login;
