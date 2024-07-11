import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

function Home() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDateTimePicker = () => {
    showMode("datetime");
  };

  const handleBookSlot = () => {
    if (!selectedOption) {
      alert("Please select an option to book a slot.");
      return;
    }
    alert(`Slot booked for ${selectedOption} at ${date.toLocaleString()}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dateSelectorButton}
        onPress={showDateTimePicker}
      >
        <Text>Select Date</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}
      <RNPickerSelect
        onValueChange={(value) => setSelectedOption(value)}
        placeholder={{ label: "Select an option", value: null }}
        items={[
          { label: "Option 1", value: "Option 1" },
          { label: "Option 2", value: "Option 2" },
          { label: "Option 3", value: "Option 3" },
          { label: "Option 4", value: "Option 4" },
          { label: "Option 5", value: "Option 5" },
        ]}
        style={pickerSelectStyles}
      />
      <Button
        onPress={handleBookSlot}
        title="Book Slot"
        disabled={!selectedOption}
      />

      {/* <Text>Date & Time: {date.toLocaleString()}</Text>
      <Text>Selected Option: {selectedOption}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dateSelectorButton: {
    backgroundColor: "#17c1e8",
    padding: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
});

export default Home;
