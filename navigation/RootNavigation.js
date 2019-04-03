import { createStackNavigator, createAppContainer } from "react-navigation";
import MenuButton from "../components/MenuButton"
import React from "react";
import Swiper from "../screens/SwipeScreen";
import FirstStepScreen from "../screens/FirstStepScreen";
import TabsNavigation from "./TabsNavigation";
import AddPhotoNavigation from "./AddPhotoNavigation"
import UploadPhotoScreen from "../screens/UploadPhotoScreen";

import {Button} from "react-native";

const RootNavigator = createStackNavigator(
     {
          Tabs : {
               screen:TabsNavigation,
               navigationOptions:{
                    header:null
               }
          },
          TakePhoto : {
               screen : AddPhotoNavigation,
               navigationOptions : ({ navigation }) => ({
                    header:null
                   
               })
          },
          UploadPhoto : {
               screen : UploadPhotoScreen,
               navigationOptions: ({navigation}) => ({
                    title:"Upload Photo!",
                    // headerRight: (
                    //      <Button 
                    //           title={"cancel"} 
                    //           onPress={() => navigation.goBack(null)}
                    //           color="black"
                    //      />
                    // ),
                    headerStyle:{
                         marginTop: -50,
                    },
               })
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
          //           headerStyle:{
          //                borderBottomWidth: 0,
          //                marginTop: -20,
          //           },
          //           headerTransparent:'true',
                    
          //      })
          // },
     },
     {
          mode : "modal",
          //headerMode: 'screen',
          headerLayoutPreset:"center",
          // headerMode:"screen",
          // headerTransitionPreset:"fade-in-place",
          //transitionConfig: noTransitionConfig,

         
     },
     
);

export default createAppContainer(RootNavigator);
