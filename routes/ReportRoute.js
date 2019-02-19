import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ReportScreen from "../screens/ReportScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import MenuButton from "../components/MenuButton"

const ReportRoute = createStackNavigator(
     
     {
          Meal:{
               screen: ReportScreen,
               navigationOptions: ({ navigation, screenProps }) => ({
                    //headerTitle : screenProps.username
                    headerTitle : "문의하기",
               }),
          },
          ...sharedRoutes
     },
     {
          ...sharedOptions
     }
);

export default createAppContainer(ReportRoute);