import { SetStateAction, useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { TodoItemType, TodoListItem } from "../types";

import TodoItem from "./TodoItem";

export default function TodoList({
  todoItemList,
  storageKey = "@todos_today",
  isModalOkPressed,
}: TodoListItem) {
  const [todos, setTodos] = useState<TodoItemType[]>(todoItemList);

  const onCheckboxPress = async (index: number) => {
    const newTodos = [...todos];

    if (newTodos[index].text !== "") {
      newTodos[index].isChecked = !newTodos[index].isChecked;

      setTodos(() => newTodos);

      await AsyncStorage.setItem(storageKey, JSON.stringify(todos));
    }
  };

  const onChangeText = (index: number, text: string) => {
    const newTodos = [...todos];

    newTodos[index].text = text;

    if (text === "") {
      newTodos[index].isChecked = false;
    }

    setTodos(() => newTodos);
  };

  const onSaveTodo = async (index: number) => {
    try {
      if (index + 1 === todos.length) {
        const newTodo = {
          id: Date.now(),
          routineTitle: todos[index].routineTitle,
          text: "",
          isChecked: false,
        };

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify([...todos, newTodo]),
        );
        setTodos(prevTodos => [...prevTodos, newTodo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditTodo = async () => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify([...todos]));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteTodo = async (index: number) => {
    try {
      if (todos.length === 1) {
        const newTodos = [...todos];

        newTodos[index].text = "";
        newTodos[index].isChecked = false;
        setTodos([...newTodos]);

        return;
      }

      const newTodos = todos.filter((item, filterIndex) => {
        return index !== filterIndex;
      });

      setTodos(() => newTodos);

      await AsyncStorage.setItem(storageKey, JSON.stringify(newTodos));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onLoadTodos = async () => {
      try {
        const itemList = await AsyncStorage.getItem(storageKey);

        if (itemList === null) return;

        setTodos(JSON.parse(itemList) as TodoItemType[]);
      } catch (error) {
        console.log(error);
      }
    };

    onLoadTodos();
  }, [storageKey]);

  useEffect(() => {
    const routineItemList = async () => {
      try {
        const index = Number(
          await AsyncStorage.getItem("@current_routineTemplate"),
        );
        const routineTemplateIds = JSON.parse(
          String(await AsyncStorage.getItem("@routineTitleList")),
        ) as string[];
        const routineTemplate = JSON.parse(
          String(
            await AsyncStorage.getItem(`@routine_${routineTemplateIds[index]}`),
          ),
        ) as TodoItemType[];
        const newTodos = [
          ...routineTemplate
            .map(routineTemplateItem => ({
              id: routineTemplateItem.id,
              text: routineTemplateItem.text,
              isChecked: routineTemplateItem.isChecked,
            }))
            .filter(
              routineTemplateItem =>
                !todos.map(todo => todo.id).includes(routineTemplateItem.id),
            ),
          ...todos,
        ];

        setTodos(() => newTodos);

        await AsyncStorage.setItem(storageKey, JSON.stringify(newTodos));
      } catch (error) {
        console.log(error);
      }
    };

    if (isModalOkPressed !== 0 && storageKey === "@todos_today") {
      routineItemList();
    }
  }, [isModalOkPressed, storageKey]);

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
        index={index}
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
        onEditTodo={async () => {
          await onEditTodo();
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
        automaticallyAdjustContentInsets={false}
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
