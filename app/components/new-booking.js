import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { bookParking } from "../api";

const NewBooking = ({ name, refresh }) => {
  const [model, setModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const [isConfirm, setIsConfirm] = useState(false);
  const [confirmModel, setConfirmModel] = useState("");
  const [confirmPlateNumber, setConfirmPlateNumber] = useState("");

  const book = () => {
    bookParking(1, name, model, plateNumber)
      .then((res) => {
        console.log(res.data);
        refresh();
        setConfirmModel(model);
        setConfirmPlateNumber(plateNumber);
        setIsConfirm(true);
        setModel("");
        setPlateNumber("");
        // set is confirm to false after 3 secs
        setTimeout(() => {
          setIsConfirm(false);
        }, 3000);
      })
      .catch((e) => console.log(e));
  };
  return (
    <View style={{ marginTop: "10%" }}>
      <Text style={{ color: "#0066FF", fontSize: 20, fontWeight: "600" }}>
        Booking
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Model"
        autoCapitalize="none"
        autoCorrect={false}
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Plate Number"
        autoCapitalize="none"
        autoCorrect={false}
        value={plateNumber}
        onChangeText={setPlateNumber}
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Book" onPress={book} />
      </View>
      {isConfirm && (
        <View
          style={{
            position: "absolute",
            bottom: "-70%",
            width: "100%",
            height: 100,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <View>
                <AntDesign name="car" size={24} color="black" />
              </View>
              <View>
                <Text
                  style={{ color: "black", fontSize: 20, fontWeight: "600" }}
                >
                  {confirmPlateNumber}
                </Text>
                <Text>{confirmModel}</Text>
              </View>
            </View>
            <View style={{ paddingRight: 10 }}>
              <Text style={{ color: "#0066FF" }}>Booking</Text>
              <Text style={{ color: "#0066FF" }}>Confirmed</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    paddingLeft: 20,
  },
  container: {
    backgroundColor: "#0066FF",
    maxHeight: 40,
    marginTop: 20,
    flex: 1,
    zIndex: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default NewBooking;
