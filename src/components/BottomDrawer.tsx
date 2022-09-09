import { useRef, useMemo, useCallback } from "react";

import { Dimensions, StyleSheet, View } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

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
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["20%", "100%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
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
          <Carousel
            cards={mockCards}
            cardWidth={screenWidth * 0.67}
            gap={screenWidth * 0.08}
            offset={screenWidth * 0.1}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  bottomSheetBackground: {
    backgroundColor: "#006de9",
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 30,
    backgroundColor: "#006de9",
  },
});
