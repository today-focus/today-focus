import { useState } from "react";
import { Pressable, StyleSheet, View, TextInput } from "react-native";

import { Entypo } from "@expo/vector-icons";

export default function TodoItem() {
  const [checked, setChecked] = useState<boolean>(false);

  const onCheckboxPress = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkbox}>
        <Pressable
          style={[styles.checkboxbase, checked && styles.checkboxchecked]}
          onPress={onCheckboxPress}
        >
          {checked && <Entypo name="check" size={18} color="#006de9" />}
        </Pressable>
      </View>
      <View style={styles.textinput}>
        <TextInput
          placeholder="Click Here"
          style={styles.todoinput}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  checkbox: {
    paddingVertical: 10,
  },
  checkboxbase: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#006de9",
    backgroundColor: "transparent",
  },
  checkboxchecked: {
    backgroundColor: "#ffffff",
  },
  textinput: {
    width: "100%",
  },
  todoinput: {
    fontSize: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 5,
  },
});
