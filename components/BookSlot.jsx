import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

const DateTimePickerModal = ({ show, date, mode, onChange, onClose }) => (
  <Modal transparent={true} animationType="slide" visible={show} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.pickerContainer}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
          textColor="black"
          accentColor="red"
          style={styles.dateTimePicker}
        />
        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const Card = ({ children }) => (
  <View style={styles.card}>
    {children}
  </View>
);

function BookSlot() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDateTimePicker = () => setShow(true);

  const handleBookSlot = () => {
    if (!selectedOption) {
      alert("Please fill out all fields to book a slot.");
      return;
    }
    alert(`Slot booked for ${selectedOption} at ${date.toLocaleString()}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.headerText}>Book Your Interview Slot</Text>
        <Card>
          
          <TouchableOpacity style={styles.dateSelectorButton} onPress={showDateTimePicker}>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            show={show}
            date={date}
            mode={mode}
            onChange={onChange}
            onClose={() => setShow(false)}
          />

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

          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookSlot}
            disabled={!selectedOption}
          >
            <Text style={styles.bookButtonText}>Book Slot</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  container: {
    flex: 1,
    marginTop:"10%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    width: "100%",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  dateSelectorButton: {
    backgroundColor: "#AFB2B8",
    padding: 16,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dateTimePicker: {
    width: "100%",
    height: 150,
  },
  doneButton: {
    backgroundColor: "#17c1e8",
    padding: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    margin: 20,
  },
  doneButtonText: {
    fontSize: 18,
    color: "white",
  },
  bookButton: {
    backgroundColor: "#17c1e8",
    padding: 16,
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    marginVertical: 10,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 20,
  },
});

export default BookSlot;
