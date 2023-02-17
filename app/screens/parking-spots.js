import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { getBookings, updateBooking } from "../api";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const ParkingSpots = ({ navigation, route }) => {
  const { name } = route.params;
  const [bookings, setBookings] = useState([]);

  const updateBookingHandler = (id) =>
    updateBooking(id)
      .then(() => getBookingsData())
      .catch((e) => console.log(e));

  const getBookingsData = async () => {
    try {
      const data = await getBookings(name);
      setBookings(data.data.data === null ? [] : data.data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBookingsData();
  }, [name]);

  return (
    <SafeAreaView style={{ backgroundColor: "#F4F0E9" }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 10,
          flex: 1,
          minHeight: 40,
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 30,
          marginTop: 30,
          backgroundColor: "F4F0E9",
        }}
      >
        <TextInput
          style={{
            width: "80%",
            borderRightWidth: 1,
            borderColor: "black",
            minHeight: 40,
            paddingLeft: 10,
          }}
          placeholder="Search for vehicle..."
        />
        <TouchableOpacity
          style={{
            width: "20%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            minHeight: 39,
            backgroundColor: "#0066FF",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          borderWidth: 0.4,
          borderColor: "black",
          borderRadius: 20,

          paddingHorizontal: 20,
          margin: 30,

          minHeight: "80%",
        }}
      >
        {bookings.map((booking) => (
          <View
            style={styles.button}
            key={booking.id}
            // onPress={() => navigation.navigate("BookParking", { parking })}
          >
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <AntDesign name="car" size={24} color="black" />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ paddingBottom: 2 }}>{booking.plate}</Text>
                <Text style={{ fontSize: 10, color: "#565656" }}>
                  {booking.model}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.out}
              onPress={() => updateBookingHandler(booking.id)}
            >
              <Text style={{ color: "white" }}>Out</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  out: {
    backgroundColor: "#0066FF",
    maxHeight: 40,
    paddingVertical: 5,
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    maxWidth: 60,
  },
});

export default ParkingSpots;
