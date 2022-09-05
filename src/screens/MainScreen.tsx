import { useState, useEffect, useRef, useMemo, useCallback } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import BottomSheet from "@gorhom/bottom-sheet";

import TitleInput from "../components/TitleInput";
import Routine from "../components/Routine";

type RootStackParamList = {
  MainScreen: undefined;
  WelcomeScreen: undefined;
};

type Props = StackScreenProps<RootStackParamList, "MainScreen">;

export default function MainScreen({ navigation }: Props) {
  const [date, setDate] = useState<string>("");
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["20%", "100%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    const today = new Date();
    const currentDate = `${today.toLocaleString("en-us", {
      month: "short",
    })}, ${today.getUTCDate()}`;

    setDate(currentDate);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.header}>
          <TouchableHighlight
            onPress={() => console.log("pressed!")}
            underlayColor="#006de9"
            activeOpacity={0.5}
          >
            <Text style={styles.btnText}>{date}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contents}>
          <TitleInput />
          <Routine />
        </View>
        <View style={styles.bottomSheetContainer}>
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
            onChange={handleSheetChanges}
          >
            <View style={styles.contentContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("WelcomeScreen")}
              >
                <Text>Temporary Awesome Text 🧐</Text>
              </TouchableOpacity>
            </View>
          </BottomSheet>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#006de9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 100,
  },
  btnText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  contents: {
    flex: 1.8,
    backgroundColor: "#FFFFFF",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    paddingHorizontal: 20,
    marginTop: 50,
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  bottomSheetBackground: {
    backgroundColor: "#006de9",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#006de9",
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
});
