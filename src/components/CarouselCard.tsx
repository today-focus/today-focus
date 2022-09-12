import { Animated, Dimensions, FlatList, StyleSheet, Text } from "react-native";

import { ICarouselCard, IRoutineItem } from "../types";

import RoutineTemplate from "./RoutineTemplate";
import TodoItem from "./TodoItem";

export default function CarouselCard({
  cards,
  cardWidth,
  gap,
  curIndex,
  cardNum,
  scrollX,
}: ICarouselCard) {
  const inputRange = [
    (curIndex - 1) * (cardWidth + gap),
    curIndex * (cardWidth + gap),
    (curIndex + 1) * (cardWidth + gap),
  ];

  const cardScaleY = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
    extrapolate: "clamp",
  });

  const cardTranslateY = scrollX.interpolate({
    inputRange,
    outputRange: [15, 0, 15],
    extrapolate: "clamp",
  });

  const cardOpacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.3, 1, 0.3],
    extrapolate: "clamp",
  });

  const renderItem = (item: IRoutineItem) => {
    const lastTemplateItem = cards.length - 1;

    return curIndex !== lastTemplateItem ? (
      <TodoItem id={item.id} text={item.text} isChecked={item.isChecked} />
    ) : (
      <RoutineTemplate />
    );
  };

  return (
    <Animated.View
      style={[
        styles.carouselCard,
        {
          marginHorizontal: gap / 2,
          padding: 15,
          transform: [{ scaleY: cardScaleY }, { translateY: cardTranslateY }],
          opacity: cardOpacity,
        },
      ]}
    >
      <Text>{cards[curIndex].routineTitle}</Text>
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={cards[curIndex].routineList}
        keyExtractor={({ id }: IRoutineItem) =>
          `routine_${cards[curIndex].routineTitle}_${id}`
        }
        renderItem={({ item }) => renderItem(item)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  carouselCard: {
    width: Dimensions.get("screen").width * 0.67,
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
