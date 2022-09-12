import { Animated } from "react-native";

export type RootStackParamList = {
  MainScreen: undefined;
  WelcomeScreen: undefined;
  BottomDrawer: undefined;
}

export interface IRoutineItem {
  id: string;
  text: string;
  isChecked: boolean;
}

export interface ICardData {
  index: number;
  routineTitle: string;
  routineList: IRoutineItem[];
}

export interface ICarousel {
  cards: ICardData[];
  cardWidth: number;
  gap: number;
  offset: number;
}

export interface ICarouselCard extends ICarousel{
  curIndex: number;
  cardNum: number;
  scrollX: Animated.Value;
}

export interface IPageIndicator {
  data: ICardData[];
  pageWidth: number;
  scrollX: Animated.Value;
}
