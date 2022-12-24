import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator, TextInput } from "react-native";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import { AntDesign } from "@expo/vector-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import colors from "./Colors";

const App = () => {
  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(true);
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listsLoading, setListsLoading] = useState(true);

  const toggleAddTodoVisible = () => {
    setAddTodoVisible(!addTodoVisible);
  };
  const closeLoginModal = () => {
    setLoginModalVisible(false);
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
      setListsLoading(false);
    } catch (err) {
      alert(err.message);
    }
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
  const signIn = async () => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      closeLoginModal();
    } catch (error) {
      alert(error.message);
    }
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUser(user);
    //     setUserLoading(false);
    //   } else {
    //     signInAnonymously(auth)
    //       .then(({ user }) => {
    //         setUser(user);
    //         setUserLoading(false);
    //       })
    //       .catch((error) => {
    //         if (error) {
    //           alert("Oh no, something went wrong");
    //         }
    //       });
    //   }
    // });
  };

  useEffect(() => {
    if (user) {
      getLists();
    }
  }, [user]);

  return !user ? (
    <View style={styles.container}>
      <Modal visible={loginModalVisible} animationType="slide" onRequestClose={() => closeLoginModal()}>
        <TextInput
          style={[styles.input, { borderColor: colors.pink }]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, { borderColor: colors.pink }]}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          textContentType="password"
        />
        <TouchableOpacity style={styles.addList} onPress={() => signIn()}>
          <AntDesign name="plus" size={16} color={colors.pink} />
        </TouchableOpacity>
      </Modal>
    </View>
  ) : listsLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.turq} />
    </View>
  ) : (
    <View style={styles.container}>
      <Modal visible={addTodoVisible} animationType="slide" onRequestClose={() => toggleAddTodoVisible()}>
        <AddListModal closeModal={() => toggleAddTodoVisible()} addList={addList} />
      </Modal>
      <View>
        <Text>User: {user.email}</Text>
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
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
});

export default App;
