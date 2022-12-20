import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import Camera from "./screens/Camera";
import StudentProvider from "./screens/context/StudentProvider";
import Summary from "./screens/Summary";
// @import url('https://fonts.googleapis.com/css2?family=DM+Sans&family=Poppins&display=swap');
const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <StudentProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Mess Management App" }}
          />
          <Stack.Screen name="QR Code" component={ProfileScreen} />
          <Stack.Screen name="QR Scanner" component={Camera} />
          <Stack.Screen name="Summary" component={Summary} />
        </Stack.Navigator>
      </StudentProvider>
    </NavigationContainer>
  );
};

export default MyStack;
