import React from "react";
import { createAppContainer , createDrawerNavigator} from "react-navigation";
import AnalysisScreen from "../screens/AnalysisScreen"

const AnalysisNavigation = createDrawerNavigator (
     {
          AnalysisPop : {
               screen : AnalysisScreen,
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

export default createAppContainer(AnalysisNavigation);