import { Dispatch, SetStateAction } from "react";
import { Animated } from "react-native";

export type RootStackParamList = {
  MainScreen: undefined;
  WelcomeScreen: undefined;
  BottomDrawer: undefined;
}

export type TodoItemType = {
  id: number;
  routineTitle: string;
  text: string;
  isChecked: boolean;
}

export type TodoListItem = {
  cardTitleList: string[];
  cardIndex: number;
  setRoutineTitleList: Dispatch<SetStateAction<string[]>>;
  todoItemList: TodoItemType[];
  storageKey?: string;
}

export interface ICarouselStyle {
  cardWidth: number;
  gap: number;
  offset: number;
}

export interface IPageIndicator {
  data: string[];
  pageWidth: number;
  scrollX: Animated.Value;
}
