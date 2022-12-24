import React, { useState } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors, { backgroundColors } from "../Colors";

const AddListModal = ({ addList, closeModal }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(backgroundColors[0]);

  const renderColors = () => {
    return backgroundColors.map((color) => (
      <TouchableOpacity
        key={color}
        style={[styles.colorSelect, { backgroundColor: color }]}
        onPress={() => setColor(color)}
      />
    ));
  };
  const addTodoList = () => {
    const list = { name, color };
    addList(list);
    setName("");
    closeModal();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={closeModal}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>

      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>Create todo list</Text>
        <TextInput style={styles.input} placeholder="List name?" onChangeText={(text) => setName(text)} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>{renderColors()}</View>

        <TouchableOpacity style={[styles.create, { backgroundColor: color }]} onPress={addTodoList} disabled={!name}>
          <Text style={{ color: colors.white, fontWeight: "600" }}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.turq,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default AddListModal;
