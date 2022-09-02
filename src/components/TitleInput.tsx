import { StyleSheet, View, Text, TextInput } from "react-native";

export default function TitleInput() {
  return (
    <View>
      <Text style={styles.titlelabel}>Today's Title</Text>
      <TextInput
        placeholder="What is your focus for today?"
        style={styles.titleinput}
        multiline
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titlelabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#006de9",
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 15,
  },
  titleinput: {
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0.5,
    borderColor: "#808080",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
});
