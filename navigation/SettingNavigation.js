import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from "react-navigation";
import FirstStepScreen from "../screens/FirstStepScreen";

const SettingNavigation = createStackNavigator(
     {
          Salary:{
               screen: FirstStepScreen,
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
          mode: 'modal',
          headerMode: 'none',
          initialRouteName: 'ModalScreen', 
          defaultNavigationOptions: {
               gesturesEnabled: false,
          },

     },
     
);

export default createAppContainer(SettingNavigation);
