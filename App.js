import React, { useState, useEffect, createContext } from "react";
import { LogBox } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";

const Stack = createNativeStackNavigator();
export const UserContext = createContext({});

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userWatcher = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  };

  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. " +
      "It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. " +
      "See https://github.com/reactimport HomeScreen from './screens/HomeScreen'‰-native-async-storage/async-storage",
  ]);

  useEffect(() => {
    userWatcher();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          {loading ? (
            <Stack.Screen name="Loading" component={LoadingScreen} />
          ) : !user ? (
            <Stack.Group>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
