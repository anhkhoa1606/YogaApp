// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import CourseDetail from "./CourseDetail"; // Đảm bảo đường dẫn đúng
import YogaClassList from "./YogaClassList"; // Đảm bảo đường dẫn đúng

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="YogaClassList" component={YogaClassList} />
        {/* <Stack.Screen name="CourseDetail" component={CourseDetail} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
