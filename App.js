import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InformationScreen1 from "./Information1";
import InformationScreen2 from "./Information2";
import InformationScreen3 from "./Information3";
import LoginScreen from "./LogInScreen";
import SignInScreen from "./SignUpScreen";
import StatsScreen from "./Stats";
import HomeScreen from "./HomeScreen";
import ForgotPassword from "./ForgotPassword";
import SplashScreen from "./SplashScreen";
import AccountScreen from "./Account";
import AccountDetails from "./AccountDetails";
import IncomeScreen from "./Income";
import ExpensesScreen from "./Expenses";
import SavingsScreen from "./Savings";
import GoalScreen from "./Goal";
import { auth } from "./Firebase";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Account") {
            iconName = "ios-home";
          } else if (route.name === "Stats") {
            iconName = "ios-stats-chart-sharp";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Account"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Stats"
        component={StatsScreen}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Information1"
        component={InformationScreen1}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Information2"
        component={InformationScreen2}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Information3"
        component={InformationScreen3}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="LogIn"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Forgot"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={MyTabs}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Add"
        component={AccountScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OptDetails"
        component={AccountDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Income"
        component={IncomeScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Expenses"
        component={ExpensesScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Savings"
        component={SavingsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Goal"
        component={GoalScreen}
      />

    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
