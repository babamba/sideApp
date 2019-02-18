import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer , createDrawerNavigator} from "react-navigation";
import HomeRoute from "../routes/HomeRoute";
import { Ionicons } from "@expo/vector-icons";


const defaultScreen = props => <Text>Search</Text>;
const TabsNavigation = createDrawerNavigator (
     {
          Home : {
               screen : HomeRoute,
               navigationOptions:{
                    tabBarIcon: ({ focused }) => (
                         <Ionicons
                           name={focused ? 'ios-checkmark-circle-outline' : 'ios-home'}
                           size={30}
                           color={"black"}
                         />
                    )
               }
          },

     },
     {
          tabBarPosition: "top",
          tabBarOptions:{
               showLabel:false,
               swipeEnabled: true,
               animationEnabled: true,
               style:{
                    backgroundColor:"#FBFBFB",
                    height:45
               },
          },
     },
     
);

export default createAppContainer(TabsNavigation);