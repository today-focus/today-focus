import { Dispatch, SetStateAction, useState } from "react";
import { TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import getDateFormat from "../utils/getDateFormat";

type Props = {
  cardTitle: string;
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
};

export default function CardTitle({
  cardTitle: prevRoutineTitle,
  setRoutineTitleList,
}: Props) {
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

    if (prevRoutineList !== null) {
      if (prevRoutineList.length === 0) {
        await AsyncStorage.setItem(
          `@routine_${routineTitle}`,
          JSON.stringify(initialTodoList),
        );
      } else {
        await AsyncStorage.setItem(`@routine_${routineTitle}`, prevRoutineList);
      }
    }

    await AsyncStorage.removeItem(`@routine_${prevRoutineTitle}`);
  };

  const updateRoutineTitleList = async () => {
    const routineTitleList = await AsyncStorage.getItem("@routineTitleList");

    if (routineTitleList !== null) {
      const copyRoutineTitleList = JSON.parse(routineTitleList);

      const prevTitleIndex = copyRoutineTitleList.indexOf(prevRoutineTitle);

      copyRoutineTitleList[prevTitleIndex] = routineTitle;

      await AsyncStorage.setItem(
        "@routineTitleList",
        JSON.stringify(copyRoutineTitleList),
      );

      setRoutineTitleList(copyRoutineTitleList as SetStateAction<string[]>);
    }
  };

  const handleEndEditing = async () => {
    await updateRoutineTitle();
    await updateRoutineTitleList();
  };

  return (
    <View>
      <TextInput
        value={routineTitle}
        onChangeText={onChangeTitle}
        onEndEditing={handleEndEditing}
      />
    </View>
  );
}
