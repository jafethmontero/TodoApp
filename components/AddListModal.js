import React, { Component } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import mockData from "../mockData";

export default class AddListModal extends Component {
  backgroundColors = ["#9AADBF", "#6D98BA", "#D3B99F", "#C17767", "#210203", "#3581B8", "#FCB07E"];

  state = {
    name: "",
    color: this.backgroundColors[0],
  };

  renderColors = () => {
    return this.backgroundColors.map((color) => (
      <TouchableOpacity
        key={color}
        style={[styles.colorSelect, { backgroundColor: color }]}
        onPress={() => this.setState({ color })}
      />
    ));
  };

  addTodoList = () => {
    const { name, color } = this.state;
    mockData.push({
      name,
      color,
      todos: [],
    });

    this.setState({name: ""});
    this.props.closeModal();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={{ position: "absolute", top: 64, right: 32 }} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create todo list</Text>
          <TextInput
            style={styles.input}
            placeholder="List name?"
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
            {this.renderColors()}
          </View>

          <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]} onPress={this.addTodoList}>
            <Text style={{ color: colors.white, fontWeight: "600" }}>Create</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

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
