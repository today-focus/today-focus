import {
  SetStateAction,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import Carousel from "./Carousel";

export default function BottomDrawer({
  setModalVisible,
}: {
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { width: screenWidth } = useWindowDimensions();
  const [routineTitleList, setRoutineTitleList] = useState<string[]>([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["50%", "100%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    const setRoutineTemplate = async () => {
      try {
        await AsyncStorage.setItem(
          "@routine_routineTemplate",
          JSON.stringify([
            {
              id: `${Date.now()}`,
              routineTitle: "",
              text: "",
              isChecked: false,
            },
          ]),
        );
      } catch (error) {
        console.log(error);
      }
    };

    setRoutineTemplate();
  }, []);

  useEffect(() => {
    const getLatestRountineTitleList = async () => {
      try {
        const latestRoutineTitleList = await AsyncStorage.getItem(
          "@routineTitleList",
        );

        if (latestRoutineTitleList !== null) {
          setRoutineTitleList(JSON.parse(latestRoutineTitleList) as string[]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLatestRountineTitleList();
  }, []);

  return (
    <BottomSheetModalProvider>
      <Pressable
        onPress={handlePresentModalPress}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
      >
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
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.handleIndicator}
            onChange={handleSheetChanges}
          >
            <BottomSheetView style={styles.contentContainer}>
              <Carousel
                routineTitleList={routineTitleList}
                setRoutineTitleList={setRoutineTitleList}
                cardWidth={screenWidth * 0.67}
                gap={screenWidth * 0.08}
                offset={screenWidth * 0.1}
                setModalVisible={setModalVisible}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </Pressable>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 109, 233, 0.8)",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  bottomSheetBackground: {
    backgroundColor: "rgba(0, 109, 233, 0.8)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  handleIndicator: {
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
