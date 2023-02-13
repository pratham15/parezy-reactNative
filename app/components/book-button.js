import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const BookButton = ({ onPress, isLoading, text = "Book" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={{ color: "white" }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0066FF",
    maxHeight: 40,
    marginTop: 20,
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BookButton;
