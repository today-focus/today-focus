import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function RoutineTemplate() {
  const handleCardClick = () => {
    console.log("Would you like to create a new routine?");
  };

  return (
    <TouchableOpacity onPress={handleCardClick}>
      <View style={styles.templateContainer}>
        <Entypo
          name="plus"
          size={24}
          color="#1a81f4"
          style={{
            paddingTop: 30,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  templateContainer: {
    flex: 1,
    alignItems: "center",
  },
});
