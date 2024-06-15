import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import Login from "./screens/Login";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <Login />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
