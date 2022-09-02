import { StyleSheet, View, Text, TextInput } from "react-native";

export default function Routine() {
  return (
    <View>
      <Text style={styles.routinlabel}>Today Routine</Text>
      <TextInput style={styles.routineinput} multiline />
    </View>
  );
}

const styles = StyleSheet.create({
  routinlabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#006de9",
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 15,
  },
  routineinput: {
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
});
