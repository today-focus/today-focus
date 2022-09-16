import { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

export default function RoutineTemplate({
  cardTitleList,
  setRoutineTitleList,
}: {
  cardTitleList: string[];
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
}) {
  const handleRoutineTemplateClick = async () => {
    const copyCardTitleList = cardTitleList.slice(0, -1);
    const newCardTitleList = [...copyCardTitleList, "untitled routine"];
    const initialTodoList = [
      {
        id: `${Date.now()}`,
        routineTitle: "untitled",
        text: "",
        isChecked: false,
      },
    ];

    await AsyncStorage.setItem(
      "@routine_untitled routine",
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
