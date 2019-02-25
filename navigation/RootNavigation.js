import { createStackNavigator, createAppContainer } from "react-navigation";
import SideNavigation from "./SideNavigation";
import InputScreen from "../screens/InputScreen";
import MenuButton from "../components/MenuButton"
import React from "react";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import Swiper from "../screens/SwipeScreen";
import { Animated, Easing } from "react-native";

// const noTransitionConfig = () => ({
//      transitionSpec: {
//        duration: 1000,
//        timing: Animated.timing,
//        easing: Easing.step0
//      }
//    })

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
               navigationOptions: ({ navigation }) => ({
                    // tabBarIcon: ({ focused }) => (
                    //      <Ionicons
                    //        name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                    //        size={30}
                    //        color={"black"}
                    //      />
                    // ),
                    // header:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => console.log(navigation.toggleDrawer('Side'))}
                    //      />
                    // ),
               })
          },
     },
     {
          mode : "card",
          headerMode: 'float',
          headerLayoutPreset:"left",
          // headerMode:"screen",
          headerTransitionPreset:"fade-in-place",
          //transitionConfig: noTransitionConfig,

          // navigationOptions: ({navigation}) => ({
          //      headerStyle: {backgroundColor: 'green'},
          //      title: 'Logged In to your app!',
          //      gesturesEnabled: false,
          //      headerLeft: <Text onPress={() => {
          //        // Coming soon: navigation.navigate('DrawerToggle')
          //        // https://github.com/react-community/react-navigation/pull/2492
          //        if (navigation.state.index === 0) {
          //          navigation.navigate('DrawerOpen')
          //        } else {
          //          navigation.navigate('DrawerClose')
          //        }
          //      }}>Menu</Text>
          //    })
     },
     
);

export default createAppContainer(RootNavigator);
