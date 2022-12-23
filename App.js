import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import colors from "./Colors";

const App = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState({});

  const toggleAddTodoVisible = () => {
    setAddTodoVisible(!addTodoVisible);
  };
  const getLists = async () => {
    const collectionRef = collection(db, "users/FRyuXyCrcUTYvzd39mQElAhho352/lists");
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
  };
  const addList = async (list) => {
    const newList = { ...list, todos: [] };
    try {
      const res = await addDoc(collection(db, "users/FRyuXyCrcUTYvzd39mQElAhho352/lists"), newList);
      getLists();
    } catch (err) {
      alert(err.message);
    }
  };
  const updateList = (list) => {
    setLists((prev) => prev.map((item) => (item.id === list.id ? list : item)));
  };
  const signIn = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        signInAnonymously(auth)
          .then(({ user }) => {
            setUser(user);
          })
          .catch((error) => {
            if (error) {
              alert("Oh no, something went wrong");
            }
          });
      }
    });
  };

  useEffect(() => {
    if (user) {
      getLists();
    }
    signIn();
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={addTodoVisible} animationType="slide" onRequestClose={() => toggleAddTodoVisible()}>
        <AddListModal closeModal={() => toggleAddTodoVisible()} addList={addList} />
      </Modal>
      <View>
        <Text>User: {user.uid}</Text>
      </View>
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
