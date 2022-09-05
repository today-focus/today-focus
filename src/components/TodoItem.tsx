import { useState } from "react";
import { Pressable, StyleSheet, View, TextInput } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function TodoItem() {
  const [checked, setChecked] = useState<boolean>(false);

  const onCheckboxPress = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <Pressable
          style={[styles.checkboxBase, checked && styles.checkboxChecked]}
          onPress={onCheckboxPress}
        >
          {checked && <Entypo name="check" size={18} color="#006de9" />}
        </Pressable>
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Click Here"
          style={styles.todoInput}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  checkbox: {
    paddingVertical: 10,
  },
  checkboxBase: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#006de9",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#ffffff",
  },
  textInput: {
    width: "100%",
  },
  todoInput: {
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});
