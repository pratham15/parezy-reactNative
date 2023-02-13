import { StyleSheet, Text, View } from "react-native";

const ParkingHistory = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Parking History</Text>
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
});

export default ParkingHistory;
