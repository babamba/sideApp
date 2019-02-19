import { createStackNavigator, createAppContainer } from "react-navigation";
import MonthScreen from "../screens/MonthScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const MonthRoute = createStackNavigator(
     
     {
          Month:{
               screen: MonthScreen,
               navigationOptions: ({ screenProps }) => ({
                    //headerTitle : screenProps.username
                    headerTitle : null
               }),
          },
          ...sharedRoutes
     },
     {
          ...sharedOptions
     }
);

export default createAppContainer(MonthRoute);