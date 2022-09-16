import { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

import getDateFormat from "../utils/getDateFormat";

export default function RoutineTemplate({
  cardTitleList,
  setRoutineTitleList,
}: {
  cardTitleList: string[];
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
}) {
  const handleRoutineTemplateClick = async () => {
    const dateMilliseconds = Date.now();

    const copyCardTitleList = cardTitleList.slice(0, -1);
    const newCardTitleList = [
      ...copyCardTitleList,
      getDateFormat(dateMilliseconds),
    ];
    const initialTodoList = [
      {
        id: dateMilliseconds,
        routineTitle: getDateFormat(dateMilliseconds),
        text: "",
        isChecked: false,
      },
    ];

    await AsyncStorage.setItem(
      `@routine_${getDateFormat(dateMilliseconds)}`,
      JSON.stringify(initialTodoList),
    );

    await AsyncStorage.setItem(
      "@routineTitleList",
      JSON.stringify(newCardTitleList),
    );

    setRoutineTitleList(newCardTitleList);
  };

  return (
    <TouchableOpacity onPress={handleRoutineTemplateClick}>
      <View style={styles.templateContainer}>
        <Entypo name="plus" size={24} color="#1a81f4" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  templateContainer: {
    height: Dimensions.get("screen").height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
