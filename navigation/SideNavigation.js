import React from "react";
import { View, Text } from "react-native";
import { createAppContainer , createDrawerNavigator} from "react-navigation";
import AnalysisRoute from "../routes/AnalysisRoute";
import ReportRoute from "../routes/ReportRoute";
import HomeRoute from "../routes/HomeRoute";
import { Ionicons } from "@expo/vector-icons";
import SideRoute from "../routes/SideRoute";
import MenuScreen from "../screens/MenuScreen"
import AnalysisScreen from "../screens/AnalysisScreen"
import ReportScreen from "../screens/ReportScreen"
import MainTabsNavigator from "./MainTabsNavigation"

const SideNavigation = createDrawerNavigator (
     {
          Side : {
               screen : MainTabsNavigator,
               navigationOptions:{
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                    //        size={30}
                    //        color={"black"}
                    //      />
                    // ),
               }
          },
          Tabs1 : {
               screen : AnalysisScreen,
               navigationOptions:{
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                    //        size={30}
                    //        color={"black"}
                    //      />
                    // ),
               }
          },
          Tabs2 : {
               screen : ReportScreen,
               navigationOptions:{
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                    //        size={30}
                    //        color={"black"}
                    //      />
                    // ),
               }
          },
     },
     {
          initialRouteName: 'Side',
          drawerWidth: 300

          // initialRouteName: 'Today',
          // contentComponent: SideRoute,
          // drawerWidth: 300,
          
          // tabBarOptions:{
          //      //lockMode: 'locked-closed',
          //      showLabel:false,
          //      swipeEnabled: true,
          //      animationEnabled: true,
          //      style:{
          //           backgroundColor:"#FBFBFB",
          //           height:45
          //      },
          // },
     },
     
);

export default createAppContainer(SideNavigation);