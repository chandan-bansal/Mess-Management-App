import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TextPath } from "react-native-svg";

export default function Camera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [caption, setCaption] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Function to get data
  const fetchDetails = async (text) => {
    const res = await fetch(
      `https://mess-check-in-default-rtdb.asia-southeast1.firebasedatabase.app/${text}.json`
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
    return loadedData;
  };

  // Function to check meal type
  const checkMeal = (currTime) => {
    if (currTime > "08:00:00" && currTime < "09:00:00") {
      return "B";
    } else if (currTime > "14:00:00" && currTime < "17:00:00") {
      return "L";
    } else if (currTime > "17:00:00" && currTime < "19:00:00") {
      return "S";
    } else if (currTime > "20:00:00" && currTime < "23:30:00") {
      return "D";
    } else {
      return "N";
    }
    // return "D";
    // return "L";
    // return "S";
    // return "D";
  };
  // Function to mark present in database

  const mark = (date, time, user, mealType) => {
    return fetch(
      `https://mess-check-in-default-rtdb.asia-southeast1.firebasedatabase.app/${user}.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          time: time,
          mealType: mealType,
        }),
      }
    ).then((response) => {
      setText("No code scanned");

      setCaption("Marked Present");
      return response.json();
    });
  };

  //Function to mark present
  async function markingPresent(text) {
    try {
      console.log("text", text);
      const myArray = text.split("@");
      let word = myArray[1];

      let wordle = myArray[0];
      if (word === "iiitu.ac.in") {
        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time = today.toLocaleTimeString();
        console.log("Date", date);
        console.log("Time", time);

        //get request to fetch last entry
        let loadedData = await fetchDetails(wordle);
        loadedData = loadedData ?? [];

        let mealType = checkMeal(time);
        // console.log("Details", loade dData);
        const arr = loadedData.slice(-1);
        console.log("Last Entry", arr);
        if (mealType === "N") {
          setCaption("Meal Not Ready Yet");
        } else {
          if (arr.length === 0) {
            await mark(date, time, wordle, mealType);
          } else {
            if (arr[0].date !== date) {
              await mark(date, time, wordle, mealType);
            } else {
              if (arr[0].mealType !== mealType) {
                await mark(date, time, wordle, mealType);
              } else {
                setCaption("Already Marked Present");
              }
            }
          }
        }
      } else {
        setCaption("Invalid QR Code");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    markingPresent(data);
    // console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }}
          />
        </View>
        <Text style={styles.maintext}>{caption}</Text>

        {scanned && (
          <Button
            title={"Next Student Please"}
            onPress={() => setScanned(false)}
            color="#24a0ed"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "relative",
    left: 5,
    // top:90,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 25,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    // borderColor:'black',
    // borderWidth:2,
  },
  container: {
    margin: 10,
    backgroundColor: "#ADD8E6",
    // height:100,
    flex: 1,
    height: "100%",
    width: "100%",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    width: 250,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
});
