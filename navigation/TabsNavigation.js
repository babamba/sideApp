import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Ionicons, 
     MaterialCommunityIcons } from "@expo/vector-icons";
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
                         <View style={focused ? styles.btnShadow : null}>
                              <Ionicons
                                   name={'ios-home'}
                                   size={30}
                                   color={ focused ? "#7fe56b" : "black"}
                                   style={styles.icons}
                              />
                              <Text style={{ color: focused ? "#7fe56b" : "black"}}>오늘</Text>
                         </View>
                    )
               })
          },
          Report : {
               screen : ReportScreen,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <View style={focused ? styles.btnShadow : null }>
                              <Ionicons
                                   name={'ios-analytics'}
                                   size={30}
                                   color={ focused ? "#7fe56b" : "black"}
                                   style={styles.icons}
                              />
                              <Text style={{ color: focused ? "#7fe56b" : "black"}}>주간</Text>
                         </View>
                    )
                    
               })
          },
          Goal : {
               screen : GoalScreen,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <View style={focused ? styles.btnShadow : null }>
                              <Ionicons
                                   name={'md-checkbox-outline'}
                                   size={30}
                                   color={ focused ? "#7fe56b" : "black"}
                                   style={styles.icons}
                              />
                              <Text style={{ color: focused ? "#7fe56b" : "black"}}>목표</Text>
                         </View>
                    ),
               })
          },
          Setting : {
               screen : SettingScreen,
               navigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                         <View style={focused ? styles.btnShadow : null }>
                              <MaterialCommunityIcons
                                   name={'settings-outline'}
                                   size={30}
                                   color={ focused ? "#7fe56b" : "black"}
                                   style={styles.icons}
                              />
                              <Text style={{ color: focused ? "#7fe56b" : "black"}}>프로필</Text>
                         </View>
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
                    height:65
               },
          },
     },
);

const styles = StyleSheet.create({
     icons:{
          justifyContent:'center',
     },
     btnShadow:{
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 7,
          elevation: 1,
     }
})

export default createAppContainer(TabsNavigation);