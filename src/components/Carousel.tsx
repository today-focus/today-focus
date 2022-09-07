import { useState } from "react";

import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  View,
} from "react-native";

import { ICarousel, ICardData } from "../types";

export default function Carousel({ cards, cardWidth, gap, offset }: ICarousel) {
  const [cardNum, setCardNum] = useState<number>(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newCardNum = Math.round(
      e.nativeEvent.contentOffset.x / (cardWidth + gap),
    );

    setCardNum(newCardNum);
  };

  const renderCards = (curIndex: number) => {
    const scaleValue = cardNum === curIndex ? 1 : 0.8;
    const opacityValue = cardNum === curIndex ? 1 : 0.6;
    const translateYValue = cardNum === curIndex ? 0 : 15;

    return (
      <View
        style={[
          styles.carouselCard,
          {
            width: cardWidth,
            transform: [
              { scaleY: scaleValue },
              { translateY: translateYValue },
            ],
            opacity: opacityValue,
            marginHorizontal: gap / 2,
          },
        ]}
      />
    );
  };

  const renderIndicators = (curIndex: number) => {
    const indicatorColor = curIndex === cardNum ? "#fff" : "#3e3e3e";

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
        keyExtractor={(card: ICardData) => `routine_${card.index}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={({ index }: ICardData) => renderCards(index)}
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
    backgroundColor: "#006de9",
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
