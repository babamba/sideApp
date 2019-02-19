import React from "react";
import { createStackNavigator,createMaterialTopTabNavigator, createAppContainer } from "react-navigation";
import { Image } from "react-native";
import TodayScreen from "../screens/TodayScreen";
import MealScreen from "../screens/MealScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import MenuButton from "../components/MenuButton"

const HomeRoute = createStackNavigator(
     {
          Home:{
               screen: TodayScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    headerLeft:(
                         <MenuButton iconName={"md-menu"} 
                                    onPress={() => navigation.toggleDrawer('SideTabs')}
                         />
                    ),
               })
          },
          Meal:{
               screen: MealScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    headerLeft:(
                         <MenuButton iconName={"md-menu"} 
                                    onPress={() => navigation.navigate("Tabs")}
                         />
                    )
               })
          },
          
          ...sharedRoutes
     },
     {
          //initialRouteName: 'Home',
          swipeEnabled:true,
          animationEnabled:true,
          tabBarOptions: {
               style: { display: "none" }
             }
          //...sharedOptions
     }
);

export default createAppContainer(HomeRoute);