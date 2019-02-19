import { createStackNavigator, createAppContainer } from "react-navigation";
import MealScreen from "../screens/MealScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const MealRoute = createStackNavigator(
     
     {
          Meal:{
               screen: MealScreen,
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

export default createAppContainer(MealRoute);