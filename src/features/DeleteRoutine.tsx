import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  cardTitleList: string[];
  cardIndex: number;
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
};

export default function DeleteRoutine({
  cardTitleList,
  cardIndex,
  setRoutineTitleList,
}: Props) {
  const deleteRoutine = async () => {
    const copyCardTitleList = cardTitleList.slice(0, -1);
    const newRoutineTitleList = copyCardTitleList.filter(
      title => title !== cardTitleList[cardIndex],
    );

    console.log("newRoutineTitleList :", newRoutineTitleList);
    setRoutineTitleList(newRoutineTitleList);

    await AsyncStorage.removeItem(`@routine_${cardTitleList[cardIndex]}`);
    await AsyncStorage.setItem(
      "@routineTitleList",
      JSON.stringify(newRoutineTitleList),
    );
  };

  return (
    <TouchableOpacity style={styles.closeBtnContainer} onPress={deleteRoutine}>
      <AntDesign
        name="close"
        size={18}
        color="#808080"
        style={styles.closeBtn}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  closeBtnContainer: {
    zIndex: 999,
  },
  closeBtn: {
    position: "absolute",
    top: 3,
    right: 0,
  },
});
