import { createStackNavigator, createAppContainer } from "react-navigation";
import SideNavigation from "./SideNavigation";
import MenuButton from "../components/MenuButton"
import React from "react";
import Swiper from "../screens/SwipeScreen";

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

         
     },
     
);

export default createAppContainer(RootNavigator);
