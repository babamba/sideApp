import { createStackNavigator, createAppContainer } from "react-navigation";
import MenuButton from "../components/MenuButton"
import React from "react";
import Swiper from "../screens/SwipeScreen";
import CircleMenu from "../components/CircleMenu"
import FirstStepScreen from "../screens/FirstStepScreen";
import TabsNavigation from "./TabsNavigation";
import AddPhotoNavigation from "./AddPhotoNavigation"
import UploadPhotoScreend from "../screens/UploadPhotoScreen";

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
               screen : UploadPhotoScreend,
               navigationOptions: ({navigation}) => ({
                    title:"Upload Photo!",
                    headerLeft: (
                         <Button 
                              title={"cancel"} 
                              onPress={() => navigation.goBack(null)}
                              color="black"
                         />
                    )
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
          mode : "modal",
          headerMode: 'screen',
          headerLayoutPreset:"left",
          // headerMode:"screen",
          headerTransitionPreset:"fade-in-place",
          //transitionConfig: noTransitionConfig,

         
     },
     
);

export default createAppContainer(RootNavigator);
