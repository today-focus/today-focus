import { SetStateAction } from "react";

import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";

export default function TodoItem({
  id,
  index,
  text,
  isChecked,
  onCheckboxPress,
  onChangeText,
  onSaveTodo,
  onEditTodo,
  onDeleteTodo,
}: {
  id: number;
  index: number;
  text: string;
  isChecked: boolean;
  onCheckboxPress?: () => void;
  onChangeText?: (text: SetStateAction<string>) => void;
  onSaveTodo?: () => Promise<void>;
  onEditTodo?: () => Promise<void>;
  onDeleteTodo?: () => void;
}) {
  const onDragNDrop = () => {};

  const handleKeyPress = ({
    nativeEvent: { key: keyValue },
  }: {
    nativeEvent: { key: string };
  }) => {
    if (keyValue === "Backspace" && text === "" && index !== 0) {
      if (!onDeleteTodo) return;

      onDeleteTodo();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDragNDrop} activeOpacity={0.5}>
        <MaterialIcons name="drag-indicator" size={20} color="#A9A9A9" />
      </TouchableOpacity>
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
          onEndEditing={onEditTodo}
          onSubmitEditing={onSaveTodo}
          onKeyPress={handleKeyPress}
        />
        <TouchableOpacity onPress={onDeleteTodo} activeOpacity={0.5}>
          {text !== "" && <AntDesign name="delete" size={16} color="#808080" />}
        </TouchableOpacity>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
  todoInput: {
    flex: 1,
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
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});
