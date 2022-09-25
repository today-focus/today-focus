import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "./src/screens/OnboardingScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import MainScreen from "./src/screens/MainScreen";

import { RootStackParamList } from "./src/types";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState<string | null>(null);

  useEffect(() => {
    const getInitialValue = async () => {
      try {
        const initialValue = await AsyncStorage.getItem("@isOnboarded");

        if (initialValue !== null) {
          setIsOnboarded("true");
        } else {
          setIsOnboarded("false");
        }
      } catch (error) {
        console.log("Error @isOnboarded", error);
      }
    };

    getInitialValue();
  }, []);

  return (
    <NavigationContainer>
      {isOnboarded !== null && (
        <Stack.Navigator>
          {isOnboarded === "true" && (
            <>
              <Stack.Screen
                name="OnboardingScreen"
                component={OnboardingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                  headerShown: false,
                  presentation: "transparentModal",
                }}
              />
            </>
          )}
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
