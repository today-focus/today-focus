import { useRef, useMemo, useCallback } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

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
          <TouchableOpacity>
            <Text>Temporary Awesome Text 🧐</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
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
