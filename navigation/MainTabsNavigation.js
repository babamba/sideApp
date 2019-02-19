import React from "react";
import {Button} from "react-native";

import { createMaterialTopTabNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";

import TodayScreen from "../screens/TodayScreen"
import MonthScreen from "../screens/MonthScreen"
import PurchaseScreen from "../screens/MonthScreen";
import MealScreen from "../screens/MealScreen";

import MenuButton from "../components/MenuButton"

const MainTabsNavigator = createMaterialTopTabNavigator(
     {
          Today : {
               screen : TodayScreen,
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
          Month:{
               screen:MonthScreen,
               navigationOptions:{
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-heart'}
                    //        size={30}
                    //        color={"black"}
                    //      />    
                    // ),
               }
          },
          Meal: {
               screen : MealScreen,
               navigationOptions:{
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-person'}
                    //        size={30}
                    //        color={"black"}
                    //      />
                    // )
               }
          },
          Purchase: {
               screen : PurchaseScreen,
               navigationOptions:{
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-person'}
                    //        size={30}
                    //        color={"black"}
                    //      />
                    // )
                    headerLeft:(
                         <MenuButton iconName={"md-menu"} 
                                    onPress={() => navigation.toggleDrawer('MenuScreen')}
                         />
                    ),
               }
          }
     },
     {
          initialRouteName: 'Today',
          swipeEnabled:true,
          animationEnabled:true,
          // tabBarOptions: {
               
          //      labelStyle: {
          //        fontSize: 12,
          //      },
          //      tabStyle: {
          //        width: 100,
          //        position:"absolute"
          //      },
          //      style: {
          //        backgroundColor: 'red',
          //      },
          //    }
          //tabBarPosition: "bottom",
          // tabBarOptions:{
          //      lockMode: 'locked-closed',
          //      showLabel:false,
          //      swipeEnabled: true,
          //      animationEnabled: true,
          //      style:{
          //           backgroundColor:"#FBFBFB",
          //           height:45
          //      },
          // },
          
          tabBarOptions:{
               showLabel:true,
               swipeEnabled: true,
               animationEnabled: true,
               activeTintColor: 'white',
               inactiveTintColor: '#f7f7f7',
               indicatorStyle: {
                    backgroundColor: '#fff',
               },
               style:{
                    backgroundColor: '#f4511e',
                    //height:45
                    
                    display:'none'
               },
          },
     },
);

export default createAppContainer(MainTabsNavigator);
