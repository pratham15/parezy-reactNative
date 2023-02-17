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

  const getBookingsData = async () => {
    try {
      const data = await getBookings(name, true);
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
      <ScrollView
        style={{
          paddingHorizontal: 20,

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
            <View>
              <Text>
                {new Date(booking.created_at).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>
              <Text>
                {new Date(booking.updated_at).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </Text>
            </View>
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
