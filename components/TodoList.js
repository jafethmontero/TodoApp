import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import AddTodoModal from "./AddTodoModal";

const TodoList = ({ list, updateList }) => {
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  const toggleAddTodoModalVisible = () => {
    setAddTodoModalVisible(!addTodoModalVisible);
  };

  return (
    <View>
      <Modal
        visible={addTodoModalVisible}
        animationType="slide"
        onRequestClose={() => toggleAddTodoModalVisible()}
      >
        <AddTodoModal
          list={list}
          closeModal={() => toggleAddTodoModalVisible()}
          updateList={updateList}
        />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={() => toggleAddTodoModalVisible()}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});

export default TodoList;
