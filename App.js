import React from "react";
import { StyleSheet } from "react-native";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./screens/Register";
import MockScreen from "./screens/MockScreen";
import Home from "./screens/Home";
import BookSlot from "./components/BookSlot";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: true }}
        initialRouteName="MockScreen"
      >
        <Stack.Screen name="MockScreen" component={MockScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Register"
          component={Register}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BookSlot" component={BookSlot} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
