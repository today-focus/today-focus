import { SetStateAction, useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { TodoItemType, TodoListItem } from "../types";

import TodoItem from "./TodoItem";
import RoutineTemplate from "./RoutineTemplate";

export default function TodoList({
  cardTitleList,
  cardIndex,
  setRoutineTitleList,
  todoItemList,
  storageKey = "@todos_today",
}: TodoListItem) {
  const [todos, setTodos] = useState<TodoItemType[]>(todoItemList);

  const onCheckboxPress = async (index: number) => {
    const newTodos = [...todos];

    if (newTodos[index].text !== "") {
      newTodos[index].isChecked = !newTodos[index].isChecked;

      setTodos([...newTodos]);
    }

    await AsyncStorage.setItem(storageKey, JSON.stringify(todos));
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
      await AsyncStorage.setItem(storageKey, JSON.stringify(todos));

      if (index + 1 === todos.length) {
        const newTodo = {
          id: `${Date.now()}`,
          routineTitle: "",
          text: "",
          isChecked: false,
        };

        setTodos(prevTodos => [...prevTodos, newTodo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem(storageKey);
    // AsyncStorage.removeItem("@todos_today");
    // AsyncStorage.removeItem("@routineTitleList");
    // AsyncStorage.removeItem("@routine_routineTemplate");
    // AsyncStorage.removeItem("@routine_untitled routine");

    const onLoadTodos = async () => {
      try {
        const itemList = await AsyncStorage.getItem(storageKey);

        if (itemList !== null) {
          setTodos(JSON.parse(itemList) as TodoItemType[]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    onLoadTodos();
  }, [storageKey]);

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
    const routineCardLastIndex = cardTitleList.length - 1;

    return cardIndex !== routineCardLastIndex ? (
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
    ) : (
      <RoutineTemplate
        cardTitleList={cardTitleList}
        setRoutineTitleList={setRoutineTitleList}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
