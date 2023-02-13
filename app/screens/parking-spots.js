import { StyleSheet, Text, View } from "react-native";

const ParkingSpots = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Parking Spots</Text>
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

export default ParkingSpots;
