import { createStackNavigator, createAppContainer } from "react-navigation";
import FirstStepScreen from "../screens/FirstStepScreen"

const EnterSalaryNavigation = createStackNavigator(
     {
          FirstStep : {
               screen : FirstStepScreen,
          },
     },{
          headerMode:'none'
     }
);

export default createAppContainer(EnterSalaryNavigation);