import React from "react";
import { View, Text,Image, Button } from "react-native";
import { createAppContainer , createDrawerNavigator, SafeAreaView, DrawerItems, withNavigation} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import CalendarScreen from "../screens/CalendarScreen"
import ReportScreen from "../screens/ReportScreen"
import { ifIphoneX } from 'react-native-iphone-x-helper'
import SwipeScreen from "../screens/SwipeScreen"
import FirstStepScreen from "../screens/FirstStepScreen";
import SignInScreen from "../screens/SignInScreen"
import SignUpScreen from "../screens/SignUpScreen"
import MenuButton from "../components/MenuButton"
import AuthNavigation from "../navigation/AuthNavigation";

import { actionCreators as userActions} from "../redux/modules/user"
import LogoutButton from "../components/LogoutButton";
import Example from "../screens/TestScreen"


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
                       ),
                    // headerLeft:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => console.log(navigation.toggleDrawer('Side'))}
                    //      />
                    // ),
               })
          },
          Tabs2 : {
               screen : ReportScreen,
               navigationOptions:{
                    title:"문의하기",
               }
          },
          LOGIN : {
               screen : AuthNavigation,
               navigationOptions:{
                    title:"로그인",
                    drawerLabel: () => null
               }
          },
          Example : {
               screen: Example,
               navigationOptions:{
                    title:"캐러셀 뷰 ",
               }
          },
          // SIGNUP : {
          //      screen : SignUpScreen,
          //      navigationOptions:{
          //           title:"회원가입",
          //           drawerLabel: () => null
          //      }
          // },
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