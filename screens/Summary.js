import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TextPath } from "react-native-svg";
import StudentContext from "./context/context";
import { DataTable } from "react-native-paper";
export default function Summary() {
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const ctx = useContext(StudentContext);
  useEffect(() => {
    const fetchDetails = async () => {
      let arr = ctx.email.split("@");
      let email = arr[0];
      console.log("Email", arr[0]);
      const res = await fetch(
        `https://mess-check-in-default-rtdb.asia-southeast1.firebasedatabase.app/${email}.json`
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await res.json();
      let loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          date: responseData[key].date,
          mealType: responseData[key].mealType,
        });
      }
      setAttendanceDetails(loadedData);
    };

    fetchDetails();
  }, []);

  let breakfast = 0,
    lunch = 0,
    snack = 0,
    dinner = 0;
  console.log("Details", attendanceDetails[0]);
  attendanceDetails.forEach((element) => {
    if (element.mealType === "B") {
      breakfast++;
    }
    if (element.mealType === "L") {
      lunch++;
    }
    if (element.mealType === "S") {
      snack++;
    }
    if (element.mealType === "D") {
      dinner++;
    }
  });
  console.log("Breakfast", breakfast);
  console.log("Lunch", lunch);
  console.log("Snack", snack);
  console.log("Dinner", dinner);
  return (
    <View style={styles.box}>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Meal</DataTable.Title>
          <DataTable.Title>Meals Taken</DataTable.Title>
          <DataTable.Title>Total Meals</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>Breakfast</DataTable.Cell>
          <DataTable.Cell>{breakfast}</DataTable.Cell>
          <DataTable.Cell>120</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Lunch</DataTable.Cell>
          <DataTable.Cell>{lunch}</DataTable.Cell>
          <DataTable.Cell>120</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Snack</DataTable.Cell>
          <DataTable.Cell>{snack}</DataTable.Cell>
          <DataTable.Cell>120</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Dinner</DataTable.Cell>
          <DataTable.Cell>{dinner}</DataTable.Cell>
          <DataTable.Cell>120</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
  box: {
    backgroundColor: "#ADD8E6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
