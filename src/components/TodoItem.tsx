import { SetStateAction } from "react";

import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function TodoItem({
  id,
  text,
  isChecked,
  onCheckboxPress,
  onChangeText,
  onSaveTodo,
}: {
  id: string;
  text: string;
  isChecked: boolean;
  onCheckboxPress?: () => void;
  onChangeText?: (text: SetStateAction<string>) => void;
  onSaveTodo?: () => Promise<void>;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <Pressable
          style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
          onPress={onCheckboxPress}
        >
          {isChecked && <Entypo name="check" size={18} color="#006de9" />}
        </Pressable>
      </View>
      <View style={styles.textInput}>
        <TextInput
          placeholder="Click Here"
          style={[styles.todoInput, isChecked && styles.checkedTodoInput]}
          returnKeyType="done"
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={onSaveTodo}
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
    backgroundColor: "#fff",
  },
  textInput: {
    width: "100%",
  },
  todoInput: {
    fontSize: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
  checkedTodoInput: {
    fontSize: 15,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "#808080",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});
