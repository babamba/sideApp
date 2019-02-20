import { createStackNavigator, createAppContainer } from "react-navigation";
import SideNavigation from "./SideNavigation";
import InputScreen from "../screens/InputScreen";
import MenuButton from "../components/MenuButton"
import React from "react";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Swiper from "../screens/SwipeScreen";

const RootNavigator = createStackNavigator(
     {
          Side:{
               screen: SideNavigation,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    headerLeft:(
                         <MenuButton iconName={"md-menu"} 
                                    onPress={() => console.log(navigation.toggleDrawer('Side'))}
                         />
                    ),
                    headerTransparent:'true',
               })
          },
          Today : {
               screen : Swiper,
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
          mode : "card"
     }
);

export default createAppContainer(RootNavigator);
