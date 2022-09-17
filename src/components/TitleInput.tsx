import { SetStateAction, useState, useEffect } from "react";

import { StyleSheet, View, Text, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_TITLE_KEY = "@title_today";

export default function TitleInput() {
  const [title, setTitle] = useState<string>("");

  const onChangeTitle = (payload: SetStateAction<string>) => {
    setTitle(payload);
  };

  const onSaveTitle = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_TITLE_KEY, title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const onLoadTitle = async () => {
      try {
        const value = await AsyncStorage.getItem(STORAGE_TITLE_KEY);

        if (value === null) return;

        setTitle(value);
      } catch (error) {
        console.log(error);
      }
    };

    onLoadTitle();
  }, []);

  return (
    <View style={styles.textInput}>
      <Text style={styles.titleLabel}>Today's Title</Text>
      <TextInput
        placeholder="What is your focus for today?"
        style={styles.titleInput}
        returnKeyType="done"
        value={title}
        onChangeText={onChangeTitle}
        onSubmitEditing={onSaveTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
  },
  titleLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#006de9",
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 15,
  },
  titleInput: {
    fontSize: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#808080",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 20,
  },
});
