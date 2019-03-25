import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "../screens/SwipeScreen";
import SettingScreen from "../screens/SettingScreen";
import ReportScreen from "../screens/ReportScreen"
import GoalScreen from "../screens/GoalScreen";

import CalendarScreen from "../screens/CalendarScreen";
import MenuButton from "../components/MenuButton"

const TabsNavigation = createBottomTabNavigator (
     {
          Today : {
               screen : Swiper,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                           size={30}
                           color={"black"}
                         />
                    )
               })
          },
          Report : {
               screen : ReportScreen,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'md-calendar'}
                           size={30}
                           color={"black"}
                         />
                    )
                    
               })
          },
          // Calendar : {
          //      screen : CalendarScreen,
          //      navigationOptions: ({ navigation }) => ({
          //           tabBarIcon: ({ focused }) => (
          //                <Ionicons
          //                  name={focused ? 'ios-checkmark-circle-outline' : 'md-calendar'}
          //                  size={30}
          //                  color={"black"}
          //                />
          //           )
                    
          //      })
          // },
          Goal : {
               screen : GoalScreen,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'md-radio'}
                           size={30}
                           color={"black"}
                         />
                    ),
               })
          },
          Setting : {
               screen : SettingScreen,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'md-settings'}
                           size={30}
                           color={"black"}
                         />
                    ),
               })
          },
          
     },
     {
          tabBarPosition: "bottom",
          tabBarOptions:{
               showLabel:false,
               swipeEnabled: false,
               animationEnabled: true,
               style:{
                    backgroundColor:"transparent",
                    borderColor:"transparent",
                    height:55
               },
          },
     },
     
);

export default createAppContainer(TabsNavigation);