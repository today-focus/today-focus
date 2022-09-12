import { SetStateAction, useState, useEffect } from "react";

import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import TodoItem from "./TodoItem";

type TodoItemType = { id: string; text: string; isChecked: boolean };

const STORAGE_TODOS_KEY = "@todos";

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItemType[]>([
    {
      id: `${Date.now()}`,
      text: "",
      isChecked: false,
    },
  ]);

  const onCheckboxPress = async (index: number) => {
    const newTodos = [...todos];

    if (newTodos[index].text !== "") {
      newTodos[index].isChecked = !newTodos[index].isChecked;

      setTodos([...newTodos]);
    }

    await AsyncStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(todos));
  };

  const onChangeText = (index: number, text: string) => {
    const newTodos = [...todos];

    newTodos[index].text = text;

    if (text === "") {
      newTodos[index].isChecked = false;
    }

    setTodos([...newTodos]);
  };

  const onSaveTodo = async (index: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(todos));

      if (index + 1 === todos.length) {
        const newTodo = {
          id: `${Date.now()}`,
          text: "",
          isChecked: false,
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLoadTodos = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_TODOS_KEY);

      if (value !== null) {
        setTodos(JSON.parse(value) as TodoItemType[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem(STORAGE_TODOS_KEY);

    onLoadTodos();
  }, []);

  const onDeleteTodo = async (index: number) => {
    try {
      const newTodos = todos.filter((item, filterIndex) => {
        return index !== filterIndex;
      });

      setTodos([...newTodos]);

      await AsyncStorage.setItem(STORAGE_TODOS_KEY, JSON.stringify(newTodos));
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: TodoItemType;
    index: number;
  }) => {
    return (
      <TodoItem
        id={item.id}
        text={item.text}
        isChecked={item.isChecked}
        onCheckboxPress={() => {
          onCheckboxPress(index);
        }}
        onChangeText={(text: SetStateAction<string>) => {
          onChangeText(index, text.toString());
        }}
        onSaveTodo={async () => {
          await onSaveTodo(index);
        }}
        onDeleteTodo={() => {
          onDeleteTodo(index);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
