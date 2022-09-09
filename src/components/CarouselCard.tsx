import { FlatList, StyleSheet, Text, View } from "react-native";

import { ICarouselCard, IRoutineItem } from "../types";

import RoutineTemplate from "./RoutineTemplate";
import TodoItem from "./TodoItem";

export default function CarouselCard({
  cards,
  cardWidth,
  gap,
  curIndex,
  cardNum,
}: ICarouselCard) {
  const scaleValue = cardNum !== curIndex ? 0.8 : 1;
  const translateYValue = cardNum !== curIndex ? 15 : 0;
  const opacityValue =
    cardNum !== curIndex || curIndex === cards.length - 1 ? 0.6 : 1;

  const renderItem = (item: IRoutineItem) => {
    const lastTemplateItem = cards.length - 1;

    return curIndex !== lastTemplateItem ? (
      <TodoItem
        id={item.id}
        description={item.description}
        status={item.status}
      />
    ) : (
      <RoutineTemplate />
    );
  };

  return (
    <View
      style={[
        styles.carouselCard,
        {
          width: cardWidth,
          marginHorizontal: gap / 2,
          padding: 15,
          transform: [{ scaleY: scaleValue }, { translateY: translateYValue }],
          opacity: opacityValue,
        },
      ]}
    >
      <Text>{cards[curIndex].routineTitle}</Text>
      <FlatList
        contentContainerStyle={{}}
        automaticallyAdjustContentInsets={false}
        data={cards[curIndex].routineList}
        keyExtractor={({ id }: IRoutineItem) =>
          `routine_${cards[curIndex].routineTitle}_${id}`
        }
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
