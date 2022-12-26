import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import colors from "../Colors";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      closeLoginModal();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={[styles.container, { marginTop: 22 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={[styles.container, { marginTop: 22 }]}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, marginBottom: 22 }}>
              Todo <Text style={{ fontWeight: "300", color: colors.pink }}>App</Text>
            </Text>
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
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={[styles.addList, { borderRadius: 50 }]}
              onPress={() => signUp()}
              disabled={!email || !password}
            >
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

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
    height: 48,
    width: 300,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userEmail: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "600",
  },
});
