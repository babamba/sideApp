import React, {Component} from "react";
import { Alert } from "react-native"
import SignInScreen from "./presenter";
import PropTypes from "prop-types";
//import { FB_APP_ID } from "../../constant";
import { withNavigation} from "react-navigation";

class Container extends Component {

     state = {
          username : "",
          password : "",
          isSubmiting : false
     }

     static propsType = {
          login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     }

     render(){
          return (
                    <SignInScreen 
                         {...this.state } 
                         changeUsername = {this._changeUsername}
                         changePassword = {this._changePassword}
                         submit={this._submit}
                    />
               );
     }

     _changeUsername = text => {
          this.setState({ username : text });
     }

     _changePassword = text => {
          this.setState({ password : text });
     }

     _getNavigationParams() {
          return this.props.navigation.state.params || {}
     }

     _submit = async() => {
          console.log("submit")
          const { username, password, isSubmiting } = this.state;
          const { login } = this.props;
          if(!isSubmiting){
               if(username && password){
                    //submit
                    this.setState({
                         isSubmiting : true
                    })
                    //redux action  결과값을 얻는방식으로 할수 있는게 더생김
                    const loginResult = await login(username, password)
                    console.log("loginResult" , loginResult)

                    if(!loginResult){
                         Alert.alert('Something went wrong, try again');
                         this.setState({
                              isSubmiting : false
                         });
                    }
                    // else{
                    //      console.log("this.props.navigation.state.params : ", this.props.navigation.state.params)
                    //      if(this.props.navigation.state.params.jumpLogin !== 'undefined' || this.props.navigation.state.params.jumpLogin !== null){
                    //           console.log('jump Login')
                    //           //console.log('navi props' , this.props)
                    //           this.props.navigation.navigate('Side', {
                    //                jumpLogin: false,
                    //           });

                    //           this.setState({
                    //                isSubmiting : false,
                    //                username : "",
                    //                password : "",
                    //           })
                    //      }
                    // }
               }else{
                    Alert.alert('All fileds are require')
               }
          }
     }
}
export default withNavigation(Container);