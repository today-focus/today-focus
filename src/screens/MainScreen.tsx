import { useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import TitleInput from "../components/TitleInput";
import Routine from "../components/Routine";
import TodoList from "../components/TodoList";
import RenderModal from "../components/RenderModal";
import BottomDrawer from "../components/BottomDrawer";

export default function MainScreen() {
  const [date, setDate] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalOkPressed, setIsModalOkPressed] = useState(0);

  useEffect(() => {
    const today = new Date();
    const currentDate = `${today.toLocaleString("en-us", {
      month: "short",
    })}, ${today.getDate()}`;

    setDate(currentDate);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
        <View style={styles.contentsContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.todayRoutineContainer}>
              <TitleInput />
              <Routine />
              <TodoList
                isModalOkPressed={isModalOkPressed}
                todoItemList={[
                  {
                    id: Date.now(),
                    text: "",
                    isChecked: false,
                  },
                ]}
              />
              <RenderModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setIsModalOkPressed={setIsModalOkPressed}
              />
            </View>
          </TouchableWithoutFeedback>
          <BottomDrawer setModalVisible={setModalVisible} />
        </View>
      </View>
    </KeyboardAvoidingView>
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
    marginTop: 60,
  },
  btnText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#fff",
  },
  contentsContainer: {
    flex: 1.8,
    backgroundColor: "#fff",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    marginTop: 30,
  },
  todayRoutineContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
