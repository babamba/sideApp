import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import MenuButton from "../components/MenuButton"
import React from "react";
import CalendarScreen from "../screens/CalendarScreen"

const CalendarNavigation = createStackNavigator(
     {
          Calendar:{
               screen: CalendarScreen,
               navigationOptions: ({ navigation }) => ({
                    // headerTitle : (
                    //      <Image source={require("../assets/images/icon.png")}
                    //             style={{height:35}} resizeMode={"contain"}
                    //      />
                    // ),
                    
                    // headerLeft:(
                    //      <MenuButton iconName={"md-menu"} 
                    //                 onPress={() => console.log(navigation.toggleDrawer('Side'))}
                    //      />
                    // ),
               })
          },
     },
     {
          mode: 'card',
          headerMode: 'none',
          initialRouteName: 'ModalScreen', 
          defaultNavigationOptions: {
               gesturesEnabled: true,
          },

     },
     
);

export default createAppContainer(CalendarNavigation);
