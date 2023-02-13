import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getParkings } from "../api";
const SelectParking = ({ navigation, route }) => {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        console.log("fetching...");
        const response = await getParkings();
        console.log(response.data.data);
        if (response.status === 200) setParkings(response.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: "#0066FF", fontSize: 20, fontWeight: "600" }}>
        Select Parking
      </Text>
      {parkings.map((parking) => (
        <TouchableOpacity
          style={styles.button}
          key={parking.name}
          onPress={() => navigation.navigate("BookParking", { parking })}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="car" size={24} color="black" />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ paddingBottom: 2 }}>{parking.name}</Text>
              <Text style={{ fontSize: 10, color: "#565656" }}>
                200 Metres away
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="arrow-top-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F0E9",
    paddingHorizontal: 30,
    paddingTop: 20,
    height: "100%",
  },
  button: {
    marginTop: 15,
    borderBottomColor: "#BEBBB8",
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
    maxHeight: 50,
    alignItems: "center",
  },
});

export default SelectParking;
