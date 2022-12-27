import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AddListModal from "../components/AddListModal";
import TodoList from "../components/TodoList";
import { db } from "../firebaseConfig";
import colors from "../Colors";

const HomeScreen = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [listsLoading, setListsLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  const toggleAddTodoVisible = () => {
    setAddTodoVisible(!addTodoVisible);
  };
  const getLists = async () => {
    const collectionRef = collection(db, `users/${user.uid}/lists`);
    try {
      const listsSnap = await getDocs(collectionRef);
      const allLists = [];
      listsSnap.forEach((list) => {
        allLists.push({ id: list.id, ...list.data() });
      });
      setLists(allLists);
    } catch (err) {
      alert(err.message);
    }
    setListsLoading(false);
  };
  const addList = async (list) => {
    const newList = { ...list, todos: [] };
    try {
      const doc = await addDoc(collection(db, `users/${user.uid}/lists`), newList);
      setLists((prev) => {
        return [...prev, { id: doc.id, ...newList }];
      });
    } catch (err) {
      alert(err.message);
    }
  };
  const updateList = async (list) => {
    const { name, color, todos } = list;
    const updatedList = { name, color, todos };
    const listRef = doc(db, `users/${user.uid}/lists/${list.id}`);
    try {
      await updateDoc(listRef, updatedList);
      setLists((prev) => prev.map((item) => (item.id === list.id ? list : item)));
    } catch (error) {
      alert(error.message);
    }
  };
  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };
  const deleteList = async (list) => {
    const listRef = doc(db, `users/${user.uid}/lists/${list.id}`);
    try {
      await deleteDoc(listRef);
      setLists((prev) => {
        const newList = prev.filter((item) => item.id !== list.id);
        return newList;
      });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getLists();
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%", position: "absolute", top: 50, paddingHorizontal: 10}}>
        <Text style={styles.userDisplayName}>{user.displayName}</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Text style={{ fontWeight: "600", color: colors.pink }}>Log out</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={addTodoVisible} animationType="slide" onRequestClose={() => toggleAddTodoVisible()}>
        <AddListModal closeModal={() => toggleAddTodoVisible()} addList={addList} />
      </Modal>

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
        {listsLoading ? (
          <ActivityIndicator size="large" color={colors.turq} />
        ) : (
          <FlatList
            data={lists}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showHorizontalScrollIndicator={false}
            renderItem={({ item }) => <TodoList list={item} updateList={updateList} deleteList={deleteList} />}
            keyboardShouldPersistTaps="always"
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

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
  userDisplayName: {
    fontSize: 15,
    fontWeight: "600",
  },
});
