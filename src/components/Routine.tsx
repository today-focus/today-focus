import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Routine() {
  return (
    <View>
      <Text style={styles.routineLabel}>Today Routine</Text>
      <TextInput style={styles.routineInput} multiline />
    </View>
  );
}

const styles = StyleSheet.create({
  routineLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#006de9",
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 15,
  },
  routineInput: {
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
});
