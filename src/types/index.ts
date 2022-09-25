import { Animated } from "react-native";

export type RootStackParamList = {
  OnboardingScreen: undefined;
  WelcomeScreen: undefined;
  MainScreen: undefined;
  BottomDrawer: undefined;
}

export type TodoItemType = {
  id: number;
  routineTitle?: string;
  text: string;
  isChecked: boolean;
}

export type TodoListItem = {
  todoItemList: TodoItemType[];
  storageKey?: string;
  isModalOkPressed?: number;
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
