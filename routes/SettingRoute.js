import { createStackNavigator, createAppContainer } from "react-navigation";
import MenuButton from "../components/MenuButton"
import React from "react";
import SettingScreen from "../screens/SettingScreen"

const SettingRoute = createStackNavigator(
     {
          Setting:{
               screen: SettingScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    
                    // headerLeft:(
                    //      <MenuButton iconName={"md-close"} 
                    //                 onPress={() => console.log("close")}
                    //      />
                    // ),
               })
          },
     },
     {
          mode: 'modal',
          headerMode: 'none',
     },
     
);

export default createAppContainer(CalendarRoute);
