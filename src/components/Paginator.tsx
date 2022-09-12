import { Animated, StyleSheet, View } from "react-native";

import { IPageIndicator } from "../types";

export default function Paginator({
  data,
  scrollX,
  pageWidth,
}: IPageIndicator) {
  const renderIndicators = (curIndex: number) => {
    const inputRange = [
      (curIndex - 1) * pageWidth,
      curIndex * pageWidth,
      (curIndex + 1) * pageWidth,
    ];

    const indicatorScaleX = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    const indicatorOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        key={`indicator_${curIndex}`}
        style={[
          styles.indicator,
          {
            transform: [{ scaleX: indicatorScaleX }],
            opacity: indicatorOpacity,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: data.length }, (_, curIndex) => curIndex).map(
        curIndex => renderIndicators(curIndex),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    width: 12,
    height: 6,
    backgroundColor: "#fff",
    marginTop: 15,
    marginHorizontal: 5,
    borderRadius: 50,
  },
});
