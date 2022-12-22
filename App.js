import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import mockData from "./mockData";

const App = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState(mockData);
  const [user, setUser] = useState({});

  const toggleAddTodoVisible = () => {
    setAddTodoVisible(!addTodoVisible);
  };
  const addList = (list) => {
    setLists((prev) => {
      const newLists = [...prev, { ...list, id: prev.length + 1, todos: [] }];
      return newLists;
    });
  };
  const updateList = (list) => {
    setLists((prev) => prev.map((item) => (item.id === list.id ? list : item)));
  };

  return (
    <View style={styles.container}>
      <Modal visible={addTodoVisible} animationType="slide" onRequestClose={() => toggleAddTodoVisible()}>
        <AddListModal closeModal={() => toggleAddTodoVisible()} addList={addList} />
      </Modal>
      <StatusBar style="auto" />

      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{ fontWeight: "300", color: colors.pink }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addList} onPress={() => toggleAddTodoVisible()}>
          <AntDesign name="plus" size={16} color={colors.pink} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TodoList list={item} updateList={updateList} />}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.turq,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.turq,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.pink,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});

export default App;
