import "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { render, screen } from "@testing-library/react-native";

import OnboardingScreen from "../screens/OnboardingScreen";

import { RootStackParamList } from "../types";

const Stack = createStackNavigator<RootStackParamList>();

describe("Testing OnboardingScreen", () => {
  it("OnboardingScreen contains the skip button and next button", async () => {
    const component = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );

    render(component);

    const skipButton = await screen.findByText(/skip/i);
    const nextButton = await screen.findByText(/next/i);
    expect(skipButton).toBeTruthy();
    expect(nextButton).toBeTruthy();
  });
});
