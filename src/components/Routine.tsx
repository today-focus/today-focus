import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Routine() {
  return (
    <View style={styles.textInput}>
      <Text style={styles.routineLabel}>Today Routine</Text>
      <TextInput style={styles.routineInput} returnKeyType="done" />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
  },
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
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 20,
  },
});
