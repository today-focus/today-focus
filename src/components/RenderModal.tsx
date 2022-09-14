import { SetStateAction } from "react";

import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function RenderModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<SetStateAction<boolean>>;
}) {
  const onOkPress = () => {};

  return (
    <View style={styles.centeredView}>
      {modalVisible && (
        <>
          <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");

              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Add more task?</Text>
                <View style={styles.contentView}>
                  <Pressable
                    style={styles.button}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.cancelBtn}>Cancel</Text>
                  </Pressable>
                  <Pressable style={styles.button} onPress={onOkPress}>
                    <Text style={styles.okBtn}>Ok</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            style={styles.buttonOpen}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: 10,
    margin: 20,
  },
  contentView: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  okBtn: {
    color: "#006de9",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelBtn: {
    color: "#006de9",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    padding: 15,
    textAlign: "center",
  },
});
