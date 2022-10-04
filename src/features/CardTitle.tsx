import { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import getDateFormat from "../utils/getDateFormat";
import { TodoItemType } from "../types";

interface IProps {
  cardTitle: string;
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
}

export default function CardTitle({
  cardTitle: prevRoutineTitle,
  setRoutineTitleList,
}: IProps) {
  const [routineTitle, setRoutineTitle] = useState<string>(prevRoutineTitle);

  const onChangeTitle = (value: SetStateAction<string>) => {
    setRoutineTitle(value);
  };

  const updateRoutineTitle = async () => {
    const dateMilliseconds = Date.now();
    const initialTodoList = [
      {
        id: dateMilliseconds,
        routineTitle: getDateFormat(dateMilliseconds),
        text: "",
        isChecked: false,
      },
    ];

    const prevRoutineList = await AsyncStorage.getItem(
      `@routine_${prevRoutineTitle}`,
    );

    if (prevRoutineList === null) return;

    if (prevRoutineList.length === 0) {
      await AsyncStorage.setItem(
        `@routine_${routineTitle}`,
        JSON.stringify(initialTodoList),
      );
    } else {
      const newPrevRoutineList = JSON.parse(prevRoutineList).map(
        (item: TodoItemType) => {
          return { ...item, routineTitle };
        },
      );

      await AsyncStorage.setItem(
        `@routine_${routineTitle}`,
        JSON.stringify(newPrevRoutineList),
      );
    }

    await AsyncStorage.removeItem(`@routine_${prevRoutineTitle}`);
  };

  const updateRoutineTitleList = async () => {
    const routineTitleList = await AsyncStorage.getItem("@routineTitleList");

    if (routineTitleList === null) return;

    const copyRoutineTitleList = JSON.parse(routineTitleList);

    const prevTitleIndex = copyRoutineTitleList.indexOf(prevRoutineTitle);

    copyRoutineTitleList[prevTitleIndex] = routineTitle;

    await AsyncStorage.setItem(
      "@routineTitleList",
      JSON.stringify(copyRoutineTitleList),
    );

    setRoutineTitleList(copyRoutineTitleList as SetStateAction<string[]>);
  };

  const handleEndEditing = async () => {
    await updateRoutineTitle();
    await updateRoutineTitleList();
  };

  return (
    <View style={styles.textInput}>
      <TextInput
        style={styles.titleInput}
        value={routineTitle}
        onChangeText={onChangeTitle}
        onEndEditing={handleEndEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
  },
  titleInput: {
    fontSize: 16,
    fontWeight: "700",
    color: "#006de9",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#808080",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 20,
    marginTop: 12,
  },
});
