import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import tooltipImg from "../assets/tap-here-icon.png";

type RootStackParamList = {
  MainScreen: undefined;
  WelcomeScreen: undefined;
};

type Props = StackScreenProps<RootStackParamList, "WelcomeScreen">;

function WelcomeScreen({ navigation }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("MainScreen")}>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={tooltipImg}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 60,
  },
  tinyLogo: {
    width: 60,
    height: 60,
  },
});

export default WelcomeScreen;
