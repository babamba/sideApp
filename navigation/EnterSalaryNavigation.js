import { createStackNavigator, createAppContainer } from "react-navigation";
// import SignInScreen from "../screens/SignInScreen"
// import SocialAuthScreen from "../screens/SocialAuthScreen";
// import SignUpScreen from "../screens/SignUpScreen";
// import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import FirstStepScreen from "../screens/FirstStepScreen"

const EnterSalaryNavigation = createStackNavigator(
     {
          FirstStep : {
               screen : FirstStepScreen,
          },
          // LogIn : {
          //      screen : SignInScreen,
          // },
          // SignUpScreen : {
          //      screen : SignUpScreen,
          // },
          // ForgotPasswordScreen: {
          //      screen : ForgotPasswordScreen,
          // },
          // SocialAuthScreen: {
          //      screen : SocialAuthScreen,
          // },
     },{
          headerMode:'none'
     }
);

export default createAppContainer(EnterSalaryNavigation);