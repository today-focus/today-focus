import { useState, useRef } from "react";

import {
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  View,
} from "react-native";

import { ICarousel, ICardData } from "../types";

import CarouselCard from "./CarouselCard";
import Paginator from "./Paginator";

export default function Carousel({ cards, cardWidth, gap, offset }: ICarousel) {
  const [cardNum, setCardNum] = useState<number>(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newCardNum = Math.round(
      e.nativeEvent.contentOffset.x / (cardWidth + gap),
    );

    setCardNum(newCardNum);
  };

  const onScrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: scrollX },
        },
      },
    ],
    {
      listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => onScroll(e),
      useNativeDriver: true,
    },
  );

  return (
    <View style={styles.carouselContainer}>
      <Animated.FlatList
        automaticallyAdjustContentInsets={false}
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={cards}
        decelerationRate="fast"
        horizontal
        keyExtractor={({ index }: ICardData) => `routine_${index}`}
        onScroll={onScrollEvent}
        pagingEnabled
        renderItem={({ item }) => (
          <CarouselCard
            cards={cards}
            cardWidth={cardWidth}
            gap={gap}
            offset={offset}
            curIndex={item.index}
            cardNum={cardNum}
            scrollX={scrollX}
          />
        )}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + gap}
        snapToAlignment="start"
      />
      <Paginator data={cards} scrollX={scrollX} pageWidth={cardWidth + gap} />
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
