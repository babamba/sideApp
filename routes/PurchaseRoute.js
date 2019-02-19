import { createStackNavigator, createAppContainer } from "react-navigation";
import PurchaseScreen from "../screens/PurchaseScreen";
import sharedRoutes, { sharedOptions } from "./sharedRoutes";

const PurchaseRoute = createStackNavigator(
     
     {
          Purchase:{
               screen: PurchaseScreen,
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

export default createAppContainer(PurchaseRoute);