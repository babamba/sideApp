import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import AnalysisScreen from "../screens/AnalysisScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";
import MenuButton from "../components/MenuButton"

const AnalysisRoute = createStackNavigator(
     
     {
          Meal:{
               screen: AnalysisScreen,
               navigationOptions: ({ navigation, screenProps }) => ({
                    //headerTitle : screenProps.username
                    // headerTitle : "통계",
                    // headerLeft:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => navigation.goBack(null)}
                    //      />
                    // )
               }),
          },
          ...sharedRoutes
     },
     {
          ...sharedOptions
     }
);

export default createAppContainer(AnalysisRoute);