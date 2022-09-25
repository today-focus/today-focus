import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import tooltipImg from "../assets/tap-here-icon.png";

import { RootStackParamList } from "../types";

type Props = StackScreenProps<RootStackParamList, "WelcomeScreen">;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.replace("MainScreen");
      }}
    >
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
