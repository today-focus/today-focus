import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import TitleInput from "./src/components/TitleInput";
import Routine from "./src/components/Routine";

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => console.log("pressed!")}
            underlayColor="#006de9"
            activeOpacity={0.5}
          >
            <Text style={styles.btnText}>Today</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contents}>
          <TitleInput />
          <Routine />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006de9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
  },
  btnText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  contents: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 20,
    marginTop: 50,
  },
});
