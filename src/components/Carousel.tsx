import { useRef, Dispatch, SetStateAction } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ICarouselStyle } from "../types";

import CarouselCard from "./CarouselCard";
import Paginator from "./Paginator";

interface IProps extends ICarouselStyle {
  routineTitleList: string[];
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

export default function Carousel({
  routineTitleList,
  setRoutineTitleList,
  cardWidth,
  gap,
  offset,
  setModalVisible,
}: IProps) {
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  const onScrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: scrollX },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const cardTitleList = routineTitleList.concat("routineTemplate");

  const onRenderModal = (index: number) => {
    setModalVisible(true);

    AsyncStorage.setItem("@current_routineTemplate", index.toString());
  };

  return (
    <View style={styles.carouselContainer}>
      <Animated.FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={cardTitleList}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: string) => `routine_${item}`}
        onScroll={onScrollEvent}
        pagingEnabled
        renderItem={({ index }) => (
          <Pressable onLongPress={() => onRenderModal(index)}>
            <CarouselCard
              cardTitleList={cardTitleList}
              cardIndex={index}
              setRoutineTitleList={setRoutineTitleList}
              cardWidth={cardWidth}
              gap={gap}
              offset={offset}
              scrollX={scrollX}
            />
          </Pressable>
        )}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + gap}
        snapToAlignment="start"
      />
      <Paginator
        data={cardTitleList}
        scrollX={scrollX}
        pageWidth={cardWidth + gap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    height: "80%",
  },
  carouselCard: {
    padding: 5,
    borderRadius: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
});
