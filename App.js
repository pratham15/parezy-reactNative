import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import BookParking from "./app/screens/book-parking";
import LoginScreen from "./app/screens/login";
import SelectParking from "./app/screens/select-parking";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import ParkingSpots from "./app/screens/parking-spots";
import { Button } from "react-native";
import ParkingHistory from "./app/screens/parking-history";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  console.log("User", user);
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        if (data === null) return;
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          {user === null ? (
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="SelectParking"
                options={{
                  title: "Select Parking",
                  headerBackVisible: false,
                  headerRight: () => (
                    <Button
                      title="Logout"
                      onPress={() => {
                        console.log("pressed");
                        setUser(null);
                        AsyncStorage.removeItem("user");
                      }}
                    />
                  ),
                }}
                component={SelectParking}
              />
              <Stack.Screen
                name="BookParking"
                options={{
                  title: "Book Parking",
                }}
                component={BookParking}
              />
              <Stack.Screen
                name="ParkingSpots"
                options={{ title: "Parking Spots" }}
                component={ParkingSpots}
              />
              <Stack.Screen
                name="ParkingHistory"
                options={{ title: "Parking History" }}
                component={ParkingHistory}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
