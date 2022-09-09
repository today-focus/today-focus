import { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import TitleInput from "../components/TitleInput";
import Routine from "../components/Routine";
import BottomDrawer from "../components/BottomDrawer";
import TodoList from "../components/TodoList";

export default function MainScreen() {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const currentDate = `${today.toLocaleString("en-us", {
      month: "short",
    })}, ${today.getDate()}`;

    setDate(currentDate);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
          <TodoList />
        </View>
        <BottomDrawer />
      </KeyboardAvoidingView>
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
    color: "#fff",
  },
  contents: {
    flex: 1.8,
    backgroundColor: "#fff",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 20,
    marginTop: 50,
  },
});
