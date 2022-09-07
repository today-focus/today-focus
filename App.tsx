import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from "./src/screens/MainScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";

import { RootStackParamList } from "./src/types";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false, presentation: "transparentModal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
