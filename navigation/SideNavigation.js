import React from "react";
import { View, Text } from "react-native";
import { createAppContainer , createDrawerNavigator} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import AnalysisScreen from "../screens/AnalysisScreen"
import ReportScreen from "../screens/ReportScreen"
import { ifIphoneX } from 'react-native-iphone-x-helper'
import SwipeScreen from "../screens/SwipeScreen"
import FirstStepScreen from "../screens/FirstStepScreen";

const SideNavigation = createDrawerNavigator (
     {
          Side : {
               screen : SwipeScreen,
               navigationOptions: ({ navigation }) => ({
                    title:"오늘의급여",
               })
          },
          Tabs1 : {
               screen : AnalysisScreen,
               navigationOptions:{
                    title:"통계",
               }
               
          },
          Tabs2 : {
               screen : ReportScreen,
               navigationOptions:{
                    title:"문의하기",
               }
          },
          EnterSalaryNavigation : {
               screen : FirstStepScreen,
               navigationOptions:{
                    title:"월급 입력 테스트",
               }
          }
     },
     {
          initialRouteName: 'Side',
          drawerWidth: 200,

          // initialRouteName: 'Today',
          // contentComponent: SideRoute,
          // drawerWidth: 300,
          contentOptions: {
               itemsContainerStyle: {
                    ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
               },
          }
          // tabBarOptions:{
          //      //lockMode: 'locked-closed',
          //      // showLabel:false,
          //      // swipeEnabled: true,
          //      // animationEnabled: true,
          //      style:{
          //           ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
          //      },
          // },
     },
     
);

export default createAppContainer(SideNavigation);