import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ICarouselStyle, TodoItemType } from "../types";

import TodoList from "./TodoList";
import CardTitle from "../features/CardTitle";

interface ICarouselCard extends ICarouselStyle {
  cardTitleList: string[];
  cardIndex: number;
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
  scrollX: Animated.Value;
}

export default function CarouselCard({
  cardTitleList,
  cardIndex,
  setRoutineTitleList,
  cardWidth,
  gap,
  scrollX,
}: ICarouselCard) {
  const [todoItemList, setTodoItemList] = useState<TodoItemType[]>([]);

  const inputRange = [
    (cardIndex - 1) * (cardWidth + gap),
    cardIndex * (cardWidth + gap),
    (cardIndex + 1) * (cardWidth + gap),
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

  useEffect(() => {
    const onLoadTodos = async () => {
      try {
        const todoItems = await AsyncStorage.getItem(
          `@routine_${cardTitleList[cardIndex]}`,
        );

        if (todoItems !== null) {
          setTodoItemList(JSON.parse(todoItems) as TodoItemType[]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    onLoadTodos();
  }, [cardTitleList, cardIndex]);

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
      {cardIndex !== cardTitleList.length - 1 && (
        <CardTitle
          cardTitle={cardTitleList[cardIndex]}
          setRoutineTitleList={setRoutineTitleList}
        />
      )}
      <TodoList
        cardTitleList={cardTitleList}
        cardIndex={cardIndex}
        setRoutineTitleList={setRoutineTitleList}
        todoItemList={todoItemList}
        storageKey={`@routine_${cardTitleList[cardIndex]}`}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  carouselCard: {
    height: "100%",
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
