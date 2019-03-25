import { createStackNavigator, createAppContainer } from "react-navigation";
import MenuButton from "../components/MenuButton"
import React from "react";
import Swiper from "../screens/SwipeScreen";
import CircleMenu from "../components/CircleMenu"
import FirstStepScreen from "../screens/FirstStepScreen";
import TabsNavigation from "./TabsNavigation";

const RootNavigator = createStackNavigator(
     {
          Tabs : {
               screen:TabsNavigation,
               navigationOptions:{
                    header:null
               }
          },
          // Today : {
          //      screen : Swiper,
          //      navigationOptions: ({ navigation }) => ({
          //           // tabBarIcon: ({ focused }) => (
          //           //      <Ionicons
          //           //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
          //           //        size={30}
          //           //        color={"black"}
          //           //      />
          //           // ),
          //           // tabBarIcon: ({ focused }) => (

          //           headerRight:(
          //                <CircleMenu/>
          //           ),
          //           headerStyle:{
          //                borderBottomWidth: 0,
          //                marginTop: -20,
          //           },
          //           headerTransparent:'true',
                    
          //      })
          // },
     },
     {
          mode : "card",
          headerMode: 'screen',
          headerLayoutPreset:"left",
          // headerMode:"screen",
          headerTransitionPreset:"fade-in-place",
          //transitionConfig: noTransitionConfig,

         
     },
     
);

export default createAppContainer(RootNavigator);
