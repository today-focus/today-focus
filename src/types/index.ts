export type RootStackParamList = {
  MainScreen: undefined;
  WelcomeScreen: undefined;
  BottomDrawer: undefined;
};

export interface ICardData {
  index: number;
  contents?: string;
}

export interface ICarousel {
  cards: ICardData[];
  cardWidth: number;
  gap: number;
  offset: number;
}
