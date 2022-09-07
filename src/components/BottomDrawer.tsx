import { useRef, useMemo, useCallback } from "react";

import { Dimensions, StyleSheet, View } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import Carousel from "./Carousel";

const mockCards = [
  {
    index: 1,
    contents: "test text",
  },
  {
    index: 2,
    contents: "test text",
  },
  {
    index: 3,
    contents: "test text",
  },
  {
    index: 4,
    contents: "test text",
  },
  {
    index: 5,
    contents: "test text",
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
    paddingTop: 20,
    backgroundColor: "#006de9",
  },
});
