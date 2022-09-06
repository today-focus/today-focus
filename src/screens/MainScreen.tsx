/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import TitleInput from "../components/TitleInput";
import Routine from "../components/Routine";
import BottomDrawer from "../components/BottomDrawer";

export default function MainScreen() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const currentDate = `${today.toLocaleString("en-us", {
      month: "short",
    })}, ${today.getUTCDate()}`;

    setDate(currentDate);
  }, []);

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
            <Text style={styles.btnText}>{date}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contents}>
          <TitleInput />
          <Routine />
        </View>
        <BottomDrawer />
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
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  contents: {
    flex: 1.8,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  bottomSheetBackground: {
    backgroundColor: "#006de9",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#006de9",
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
});
