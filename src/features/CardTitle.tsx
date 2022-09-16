import { Dispatch, SetStateAction, useState } from "react";
import { TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const prevRoutineList = await AsyncStorage.getItem(
      `@routine_${prevRoutineTitle}`,
    );

    if (prevRoutineList !== null) {
      await AsyncStorage.setItem(`@routine_${routineTitle}`, prevRoutineList);
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

  const handleEndEditing = () => {
    updateRoutineTitle();
    updateRoutineTitleList();
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
