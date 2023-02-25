import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { getParkings } from "../api";
import * as Location from "expo-location";
// add zoomed in deltas
const INITIAL_REGION = {
  latitude: 28.5254504,
  longitude: 77.5741509,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c * 1000; // Distance in m
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// marker for parking zones 28.52459150639689, 77.57428848897463
const MARKERS = [
  {
    coordinate: { latitude: 28.52459150639689, longitude: 77.57428848897463 },
    title: "Parking 1",
  },
  {
    coordinate: { latitude: 28.527311024096882, longitude: 77.57782587493048 },
    title: "Parking 2",
  },
  {
    coordinate: { latitude: 28.528109483267226, longitude: 77.57384348471962 },
    title: "Parking 3",
  },
];

const HomeScreen = ({ navigation, route }) => {
  const [parkings, setParkings] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    const timeout = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Highest,
      });
      setLocation(location);
    }, 5000);
    return () => clearInterval(timeout);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Login")} title="Login" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getParkings();
        if (response.status === 200) setParkings(response.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", maxHeight: 80 }}>
        <View style={styles.location}>
          <Text style={{ fontSize: 12, marginBottom: 5 }}>
            Current Location
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Shiv Nadar IoE
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "black",
            borderRadius: 10,
          }}
          onPress={() => Linking.openURL("https://snuxplore.com/")}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "600" }}
          >
            Navigate
          </Text>
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "600" }}
          >
            Campus
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
        Available Parkings Nearby
      </Text>
      {parkings.map((parking, i) => (
        <TouchableOpacity
          style={styles.button}
          key={parking.name}
          // on press open maps with set coordinate
          onPress={() => {
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&destination=${MARKERS[i].coordinate.latitude},${MARKERS[i].coordinate.longitude}`
            );
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="car" size={24} color="black" />
            <View style={{ paddingLeft: 15 }}>
              <Text style={{ paddingBottom: 2 }}>{parking.name}</Text>
              <Text style={{ fontSize: 10, color: "#565656" }}>
                {location !== null &&
                  getDistanceFromLatLonInKm(
                    MARKERS[i].coordinate.latitude,
                    MARKERS[i].coordinate.longitude,
                    location.coords.latitude,
                    location.coords.longitude
                  ).toFixed(0)}{" "}
                metres
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
      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20 }}>
        Around You
      </Text>
      <MapView
        style={{ height: "45%", width: "100%" }}
        provider={PROVIDER_GOOGLE}
        showUserLocation={true}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
      >
        {MARKERS.map((m, id) => (
          <Marker key={id} coordinate={m.coordinate} title={m.title} />
        ))}
      </MapView>
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
  location: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "60%",
    marginRight: "5%",
  },
});

export default HomeScreen;
