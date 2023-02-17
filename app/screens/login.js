import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { login } from "../api";
import BookButton from "../components/book-button";

const LoginScreen = ({ setUser, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const onPress = () => {
    // dummy on press with 2 sec delay
    setIsLoading(true);
    (async () => {
      try {
        const data = await login(email, password);
        setUser(data.data.data.id);
        AsyncStorage.setItem("user", data.data.data.id.toString());
      } catch (e) {
        console.log(e);
        setIsError(true);
      }
      setIsLoading(false);
    })();
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: "#0066FF", fontSize: 20, fontWeight: "600" }}>
        Login
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      {isError && (
        <Text style={{ color: "red", marginTop: 10, textAlign: "center" }}>
          Invalid email or password
        </Text>
      )}
      <BookButton onPress={onPress} text="Login" isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: "20%",
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: "#F4F0E9",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 20,
  },
});

export default LoginScreen;
