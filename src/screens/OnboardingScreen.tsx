import { SetStateAction, useRef, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Dimensions,
  Image,
  ImageSourcePropType,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewToken,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import onboardingFirst from "../assets/onboarding-1.png";
import onboardingSecond from "../assets/onboarding-2.png";
import onboardingThird from "../assets/onboarding-3.png";

import Paginator from "../components/Paginator";

import { RootStackParamList } from "../types";

type Props = StackScreenProps<RootStackParamList, "OnboardingScreen">;

const onboardingSlides = [
  {
    id: "1",
    image: onboardingFirst,
    title: "Make Your Own Routine",
    description:
      "Tap the bottom drawer sheet, and start to create your own routine.",
  },
  {
    id: "2",
    image: onboardingSecond,
    title: "Set Up Your Routine",
    description:
      "Tap the routine card. Edit the title of your card, and add routine items on the list.",
  },
  {
    id: "3",
    image: onboardingThird,
    title: "Get Your Stuff Done",
    description:
      "Long press the card to upload them as your focus for today. And get your stuff done.",
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setCurrentIndex(viewableItems[0].index as SetStateAction<number>);
    },
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onScrollEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { x: scrollX },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const scrollToNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      slidesRef?.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const scrollToSkip = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      slidesRef?.current?.scrollToIndex({ index: onboardingSlides.length - 1 });
    }
  };

  const handleStartButton = async () => {
    await AsyncStorage.setItem("@isOnboarded", "true");

    navigation.replace("MainScreen");
  };

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      image: ImageSourcePropType;
      title: string;
      description: string;
    };
  }) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={{
            height: "70%",
            width: screenWidth * 0.8,
            resizeMode: "contain",
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ height: screenHeight * 0.7, backgroundColor: "#fff" }}>
        <Animated.FlatList
          automaticallyAdjustContentInsets={false}
          data={onboardingSlides}
          decelerationRate="fast"
          horizontal
          keyExtractor={item => `onboarding_${item.id}`}
          onScroll={onScrollEvent}
          onViewableItemsChanged={viewableItemsChanged}
          pagingEnabled
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          snapToAlignment="start"
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <View
        style={{
          height: screenHeight * 0.25,
          backgroundColor: "#fff",
        }}
      >
        <Paginator
          data={Object.keys(onboardingSlides)}
          scrollX={scrollX}
          pageWidth={screenWidth}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {currentIndex !== onboardingSlides.length - 1 ? (
            <>
              <TouchableOpacity
                style={(styles.button, styles.buttonSkip)}
                onPress={scrollToSkip}
              >
                <Text style={styles.btnText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={scrollToNext}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleStartButton}>
              <Text style={styles.btnText}>Go Routine!</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    marginTop: 14,
    maxWidth: "70%",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: "rgba(0, 109, 233, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSkip: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 10,
    backgroundColor: "#C6C2C2",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
