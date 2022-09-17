import { useRef, Dispatch, SetStateAction } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

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
          <Pressable onLongPress={() => setModalVisible(true)}>
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
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
