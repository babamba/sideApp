import React from "react";
import { createStackNavigator,createDrawerNavigator, createAppContainer } from "react-navigation";
import { Image } from "react-native";
import TodayScreen from "../screens/TodayScreen";
import AnalysisScreen from "../screens/AnalysisScreen"
import ReportScreen from "../screens/ReportScreen"
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import MenuButton from "../components/MenuButton"

const SideRoute = createDrawerNavigator(
     {
          Today:{
               screen: TodayScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    // headerLeft:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => navigation.navigate("MenuSlider")}
                    //      />
                    // )
               })
          },
          Analysis:{
               screen: AnalysisScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    // headerLeft:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => navigation.navigate("MenuSlider")}
                    //      />
                    // )
               })
          },
          Report:{
               screen: ReportScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    // headerLeft:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => navigation.navigate("MenuSlider")}
                    //      />
                    // )
               })
          },
          ...sharedRoutes
     },
     {
          ...sharedOptions
     }
);

export default createAppContainer(SideRoute);