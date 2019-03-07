import React from "react";
import { View, Text,Image, Button } from "react-native";
import { createAppContainer , createDrawerNavigator, SafeAreaView, DrawerItems, withNavigation} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import AnalysisScreen from "../screens/AnalysisScreen"
import ReportScreen from "../screens/ReportScreen"
import { ifIphoneX } from 'react-native-iphone-x-helper'
import SwipeScreen from "../screens/SwipeScreen"
import FirstStepScreen from "../screens/FirstStepScreen";
import SignInScreen from "../screens/SignInScreen"
import MenuButton from "../components/MenuButton"

import { actionCreators as userActions} from "../redux/modules/user"
import LogoutButton from "../components/LogoutButton";


const SideNavigation = createDrawerNavigator (
     {
          Side : {
               screen : SwipeScreen,
               navigationOptions: ({ navigation }) => ({
                    title:"오늘의급여",
                    drawerIcon: () => (
                         <Image
                           source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
                           style={{width: 30, height: 30, borderRadius: 15}}
                         />
                       )
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
          LOGIN : {
               screen : SignInScreen,
               navigationOptions:{
                    title:"로그인",
                    drawerLabel: () => null
               }
          },
          EnterSalaryNavigation : {
               screen : FirstStepScreen,
               navigationOptions:{
                    title:"월급 입력 테스트",
               }
          },
          
     },
     {
          initialRouteName: 'Side',
          drawerWidth: 300,
          drawerType:"front",

          // initialRouteName: 'Today',
          // contentComponent: SideRoute,
          // drawerWidth: 300,
          contentOptions: {
               itemsContainerStyle: {
                    ...ifIphoneX({paddingTop: 80}, {paddingTop: 50}),
               },
          },

          contentComponent: LogoutButton,
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

export default withNavigation(createAppContainer(SideNavigation));