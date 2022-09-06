import { SetStateAction, useState, useEffect } from "react";
import { Pressable, StyleSheet, View, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Entypo } from "@expo/vector-icons";

const STORAGE_TODO_KEY = "@todo";

export default function TodoItem() {
  const [checked, setChecked] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");

  const onCheckboxPress = () => {
    setChecked(!checked);
  };

  const onChangeTodo = (payload: SetStateAction<string>) => {
    setTodo(payload);
  };

  const onSaveTodo = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_TODO_KEY, todo);
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadTodo = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_TODO_KEY);

      if (value !== null) {
        setTodo(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLoadTodo();
  }, []);

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
          value={todo}
          onChangeText={onChangeTodo}
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
