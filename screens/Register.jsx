import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Register({ navigation }) {
  const [formState, setFormState] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    nameError: "",
    phoneNumberError: "",
    emailError: "",
    passwordError: "",
  });
  const [refreshing, setRefreshing] = useState(false);

  const handleChange = (name, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}Error`]: "",
    }));
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formState.name) {
      errors.nameError = "Name cannot be Empty";
      valid = false;
    }

    if (!formState.phoneNumber) {
      errors.phoneNumberError = "Phone Number cannot be empty";
      valid = false;
    } else if (!/^[6-9]\d{9}$/.test(formState.phoneNumber)) {
      errors.phoneNumberError = "Phone number is not in required format";
    }

    if (!formState.email) {
      errors.emailError = "Email Id cannot be empty";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.emailError = "Invalid Email Id";
      valid = false;
    }

    if (!formState.password) {
      errors.passwordError = "Password cannot be empty";
      valid = false;
    } else if (formState.password.length < 6) {
      errors.passwordError = "Password must be at least 6 characters";
      valid = false;
    }

    setFormState((prevState) => ({
      ...prevState,
      ...errors,
    }));

    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      // Submit form
      console.log("Form submitted");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setFormState({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        nameError: "",
        phoneNumberError: "",
        emailError: "",
        passwordError: "",
      });
      setRefreshing(false);
    }, 500);
  };

  const handleNavigation = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}> Welcome to Interview Scheduler </Text>
          </View>
          <View style={styles.formContainer}>
            <Text
              style={{
                fontSize: 26,
                marginBottom: 10,
              }}
            >
              Register to continue
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.textInputLabel}>Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter your Name"
                value={formState.name}
                onChangeText={(text) => handleChange("name", text)}
              />
              {formState.nameError ? (
                <Text style={styles.errorText}>{formState.nameError}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInputLabel}>Phone Number</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter your Phone Number"
                value={formState.phoneNumber}
                onChangeText={(text) => handleChange("phoneNumber", text)}
              />
              {formState.phoneNumberError ? (
                <Text style={styles.errorText}>
                  {formState.phoneNumberError}
                </Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInputLabel}>Email Id</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter your Email Id"
                value={formState.email}
                onChangeText={(text) => handleChange("email", text)}
              />
              {formState.emailError ? (
                <Text style={styles.errorText}>{formState.emailError}</Text>
              ) : null}
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textInputLabel}>Password</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter your Password"
                secureTextEntry
                value={formState.password}
                onChangeText={(text) => handleChange("password", text)}
              />
              {formState.passwordError ? (
                <Text style={styles.errorText}>{formState.passwordError}</Text>
              ) : null}
            </View>
            <Pressable style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
              <Text>Already have an account?</Text>

              <TouchableOpacity
                onPress={handleNavigation}
                style={{ marginHorizontal: 10 }}
              >
                <Text style={{ color: "#03a9f4" }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <Text
        onPress={() => navigation.navigate("MockScreen")}
        style={{
          backgroundColor: "lightblue",
          padding: 10,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20",
        }}
      >
        Mock Screen
      </Text>
    </SafeAreaView>
  );
}

export default Register;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 5,
  },
  textInputLabel: {
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 5,
  },
  errorContainer: {
    height: 20,
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: "#fff",
  },
  formContainer: {
    width: "95%",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#03A9F4",
    height: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
