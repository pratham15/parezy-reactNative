import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NewBooking from "../components/new-booking";
import { useEffect, useState } from "react";
import { getBookings } from "../api";
import { useIsFocused } from "@react-navigation/native";

const BookParking = ({ navigation, route }) => {
  const { name } = route.params?.parking;
  const [bookings, setBookings] = useState([]);
  const isFocused = useIsFocused();
  const getBookingsData = async () => {
    try {
      console.log("Fetching bookings data");
      const data = await getBookings(name, false);
      setBookings(data.data.data === null ? [] : data.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBookingsData();
  }, [name, isFocused]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", maxHeight: 80 }}>
        <View style={styles.location}>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>
            Current Location
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "black",
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("ParkingSpots", { name })}
        >
          <Text style={{ color: "white", textAlign: "center" }}>{name}</Text>
          <Text style={{ color: "white", textAlign: "center" }}>Spots</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          maxHeight: 80,
          marginTop: "5%",
        }}
      >
        <View
          style={{
            width: "35%",
            marginRight: "5%",
            padding: 20,
            borderWidth: 1.5,
            borderColor: "black",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 12, marginBottom: 5 }}>Status</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {bookings.length}/100
          </Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: "#0066FF",
            borderRadius: 10,
            width: "60%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={() =>
            navigation.navigate("ParkingHistory", {
              name,
            })
          }
        >
          <View>
            <Text style={{ fontSize: 12, marginBottom: 5, color: "white" }}>
              Parking
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              History
            </Text>
          </View>
          <MaterialCommunityIcons
            name="arrow-top-right"
            size={30}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <NewBooking name={name} refresh={getBookingsData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: "10%",
    backgroundColor: "#F4F0E9",
  },
  location: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "60%",
    marginRight: "5%",
  },
});

export default BookParking;
