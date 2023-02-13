import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const NewBooking = () => {
  const [model, setModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
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
        <Button title="Book" />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "-70%",
          width: "100%",
          height: 100,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
            padding: 10,
          }}
        >
          <View
            style={{ borderWidth: 0.5, borderColor: "black", borderRadius: 10 }}
          >
            <Button title="Close" color="black" />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View>
            <Text style={{ color: "black" }}>{plateNumber}</Text>
            <Text>{model}</Text>
          </View>
          <View>
            <Text>Booking Confirmed</Text>
          </View>
        </View>
      </View>
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
