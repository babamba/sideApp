import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image } from "react-native";
import TodayScreen from "../screens/TodayScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import MenuButton from "../components/MenuButton"

const HomeRoute = createStackNavigator(
     {
          Home:{
               screen: TodayScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    headerLeft:(
                         <MenuButton iconName={"md-menu"} 
                                    onPress={() => navigation.navigate("MenuSlider")}
                         />
                    )
               })
          },
          ...sharedRoutes
     },
     {
          ...sharedOptions
     }
);

export default createAppContainer(HomeRoute);