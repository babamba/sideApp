import React from "react";
import { View, Text } from "react-native";
import { createAppContainer , createDrawerNavigator} from "react-navigation";
import AnalysisRoute from "../routes/AnalysisRoute";
import ReportRoute from "../routes/ReportRoute";
import HomeRoute from "../routes/HomeRoute";
import { Ionicons } from "@expo/vector-icons";
import SideRoute from "../routes/SideRoute";
import AnalysisScreen from "../screens/AnalysisScreen"
import ReportScreen from "../screens/ReportScreen"
import MainTabsNavigator from "./MainTabsNavigation"
import MenuButton from "../components/MenuButton"

const SideNavigation = createDrawerNavigator (
     {
          Side : {
               screen : MainTabsNavigator,
               navigationOptions: ({ navigation }) => ({
                    title:"오늘의급여",
                    headerLeft:(
                         <MenuButton iconName={"ios-arrow-back"} 
                                    onPress={() => navigation.toggleDrawer('Side')}
                         />
                    )
               })
          },
          Tabs1 : {
               screen : AnalysisScreen,
               navigationOptions:{
                    title:"통계",
               }
               
          },
          Tabs2 : {
               screen : ReportScreen,
               navigationOptions:{
                    title:"문의하기",
               }
          },
     },
     {
          initialRouteName: 'Side',
          drawerWidth: 300

          // initialRouteName: 'Today',
          // contentComponent: SideRoute,
          // drawerWidth: 300,
          
          // tabBarOptions:{
          //      //lockMode: 'locked-closed',
          //      showLabel:false,
          //      swipeEnabled: true,
          //      animationEnabled: true,
          //      style:{
          //           backgroundColor:"#FBFBFB",
          //           height:45
          //      },
          // },
     },
     
);

export default createAppContainer(SideNavigation);