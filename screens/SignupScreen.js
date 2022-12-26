import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import colors from "../Colors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signUp = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(userCredential.user, {
        displayName: userName,
      });
      navigation.navigate("Home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={[styles.container, { marginTop: 22 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={[styles.container, { marginTop: 22 }]}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, marginBottom: 22 }}>
              Todo <Text style={{ fontWeight: "300", color: colors.pink }}>App</Text>
            </Text>
            {error ? <Text style={{ color: colors.red, marginBottom: 20 }}>{error}</Text> : null}
            <TextInput
              style={[styles.input, { borderColor: colors.pink }]}
              placeholder="User Name"
              onChangeText={(text) => setUserName(text)}
              value={userName}
            />
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
            <TouchableOpacity style={styles.login} onPress={() => signUp()} disabled={!email || !password}>
              <Text style={{ color: colors.white, fontWeight: "700" }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ marginTop: 10 }}>
                Have an acount already? <Text style={{ color: colors.pink }}>Login</Text>
              </Text>
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
  login: {
    backgroundColor: colors.turq,
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    width: 300,
    marginBottom: 20,
  },
  input: {
    height: 48,
    width: 300,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
});
