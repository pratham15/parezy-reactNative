import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { login } from "../api";
import BookButton from "../components/book-button";

const LoginScreen = ({ setUser, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onPress = () => {
    // dummy on press with 2 sec delay
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      // const data = await login("a", "a");
      // console.log(data.data.data);
      setUser("asd");
    }, 2000);
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
