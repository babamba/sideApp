import React from "react";
import {Button} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";
//import TakePhotoScreen from "../screens/TakePhotoScreen"
import TabsNavigation from "./TabsNavigation";
import MenuSlider from "../screens/MenuScreen";
// import AddPhotoNavigation from "./AddPhotoNavigation"

const RootNavigator = createStackNavigator(
     {
          Tabs : {
               screen:TabsNavigation,
               navigationOptions:{
                    header:null
               }
          },
          MenuSlider : {
               screen:MenuSlider,
               navigationOptions:{
                    header:null
               }
          },
          // TakePhoto : {
          //      screen : AddPhotoNavigation,
          //      navigationOptions:{
          //           header:null
          //      }
          // },
          // UploadPhoto : {
          //      screen : UploadPhotoScreend,
          //      navigationOptions: ({navigation}) => ({
          //           title:"Upload Photo!",
          //           headerLeft: (
          //                <Button 
          //                     title={"cancel"} 
          //                     onPress={() => navigation.goBack(null)}
          //                     color="black"
          //                />
          //           )
          //      })
          // },
     },
     {
          mode : "modal"
     }
);

export default createAppContainer(RootNavigator);
