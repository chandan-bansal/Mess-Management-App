import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import React, { useState, useContext, useEffect } from "react";
import StudentContext from "./context/context";

import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const [input, setInput] = useState("");
  const [qrvalue, setQrvalue] = useState("");
  const navigation = useNavigation();
  const ctx = useContext(StudentContext);
  useEffect(() => {
    setQrvalue(ctx.email);
  }, []);
  return (
    <View style={styles.backgroundStyle}>
      <View style={styles.box}>
        <Text style={styles.text}>Generated QRCode</Text>
        <QRCode
          value={qrvalue ? qrvalue : "NA"}
          size={250}
          color="black"
          style={styles.qrbox}
          backgroundColor="white"
        ></QRCode>
      </View>
      <Button
        title={"Show Summary"}
        onPress={() => {
          navigation.navigate("Summary");
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
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
  qrbox: {},
  text: {
    fontSize: 20,
    position: "relative",
    fontWeight: "bold",
    bottom: 30,
  },
  box: {
    position: "relative",
    left: 5,
    // top:90,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 25,
    height: 390,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginBottom: 20,
    // borderColor:'black',
    // borderWidth:2,
  },
  image: {
    height: 400,
    width: 400,
    alignSelf: "center",
  },
  TextStyle: {
    fontSize: 20,
    borderColor: "black",
    borderWidth: 2,
    position: "relative",
    bottom: 40,
  },
  buttonStyle: {
    margin: 20,
  },
});
export default ProfileScreen;
