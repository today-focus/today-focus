import { useState } from "react";

import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  View,
} from "react-native";

import { ICarousel, ICardData } from "../types";

import CarouselCard from "./CarouselCard";

export default function Carousel({ cards, cardWidth, gap, offset }: ICarousel) {
  const [cardNum, setCardNum] = useState<number>(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newCardNum = Math.round(
      e.nativeEvent.contentOffset.x / (cardWidth + gap),
    );

    setCardNum(newCardNum);
  };

  const renderIndicators = (curIndex: number) => {
    const indicatorColor = curIndex === cardNum ? "#fff" : "#a4a4a4";

    return (
      <View
        key={`indicator_${curIndex}`}
        style={[styles.indicator, { backgroundColor: indicatorColor }]}
      />
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{ paddingHorizontal: offset + gap / 2 }}
        data={cards}
        decelerationRate="fast"
        horizontal
        keyExtractor={({ index }: ICardData) => `routine_${index}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={({ item }) => (
          <CarouselCard
            cards={cards}
            cardWidth={cardWidth}
            gap={gap}
            offset={offset}
            curIndex={item.index}
            cardNum={cardNum}
          />
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + gap}
        snapToAlignment="start"
      />
      <View style={styles.indicatorContainer}>
        {Array.from({ length: cards.length }, (_, curIndex) => curIndex).map(
          curIndex => renderIndicators(curIndex),
        )}
      </View>
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
  indicator: {
    width: 6,
    height: 6,
    backgroundColor: "#000",
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});
