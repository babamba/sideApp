import { createStackNavigator, createAppContainer } from "react-navigation";
import MainTabsNavigation from "./MainTabsNavigation"
import SideNavigation from "./SideNavigation";
import MenuButton from "../components/MenuButton"
import React from "react";

const RootNavigator = createStackNavigator(
     {
          // Main : {
          //      screen:MainTabsNavigation,
          //      navigationOptions:{
          //           header:null
          //      }
          // },
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
                    )
               })
          },
     },
     {
          mode : "modal"
     }
);

export default createAppContainer(RootNavigator);
