import { useCallback, useMemo, useRef } from "react";

import { Dimensions, StyleSheet, View } from "react-native";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { MaterialIcons } from "@expo/vector-icons";

import Carousel from "./Carousel";

const mockCards = [
  {
    index: 0,
    routineTitle: "Morning Routine",
    routineList: [
      { id: "1662706569216", text: "침대 정리", isChecked: false },
      { id: "1662706569217", text: "아침 운동", isChecked: false },
    ],
  },
  {
    index: 1,
    routineTitle: "Work Routine",
    routineList: [
      { id: "1662706569218", text: "자료 조사", isChecked: false },
      { id: "1662706569219", text: "미팅 준비", isChecked: false },
    ],
  },
  {
    index: 2,
    routineTitle: "Diet Routine",
    routineList: [
      { id: "1662706569220", text: "비타민 복용", isChecked: false },
      { id: "1662706569221", text: "커피 한잔", isChecked: false },
    ],
  },
  {
    index: 3,
    routineTitle: "Bedtime Routine",
    routineList: [
      { id: "1662706569222", text: "강아지 산책", isChecked: false },
      { id: "1662706569223", text: "요가 스트레칭", isChecked: false },
    ],
  },
  {
    index: 4,
    routineTitle: "",
    routineList: [{ id: "", text: "", isChecked: false }],
  },
];

const { width: screenWidth } = Dimensions.get("screen");

export default function BottomDrawer() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["50%", "100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.bottomSheetContainer}>
        <MaterialIcons
          name="drag-handle"
          size={24}
          color="#fff"
          title="Present Modal"
          onPress={handlePresentModalPress}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Carousel
              cards={mockCards}
              cardWidth={screenWidth * 0.67}
              gap={screenWidth * 0.08}
              offset={screenWidth * 0.1}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006de9",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  bottomSheetBackground: {
    backgroundColor: "#006de9",
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006de9",
  },
});
