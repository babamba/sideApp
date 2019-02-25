import React, {Component} from "react";
import { Alert } from "react-native"
import SignUpScreen from "./presenter";
import PropTypes from "prop-types";
//import { FB_APP_ID } from "../../constant";

class Container extends Component {

     state = {
          username : "",
          email:"",
          password : "",
          confirmPassword:"",

          isSubmiting : false
     }

     static propsType = {
          login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     }

     render(){
          return (
                    <SignUpScreen 
                         {...this.state } 
                         changeUsername = {this._changeUsername}
                         changePassword = {this._changePassword}
                         changeConfirmPassword = {this._changeconfirmPassword}
                         changeEmail ={this._changeEmail}
                         submit={this._submit}
                    />
               );
     }

     _changeUsername = text => {
          console.log(text)
          this.setState({ username : text });
     }

     _changePassword = text => {
          console.log(text)
          this.setState({ password : text });
     }
     _changeconfirmPassword = text => {
          console.log(text)
          this.setState({ confirmPassword : text });
     }
     _changeEmail = text => {
          console.log(text)
          this.setState({email : text})
     }

     _submit = async() => {
          console.log("submit")
          const { username, password,  email, confirmPassword, isSubmiting } = this.state;
          const { signUp } = this.props;
          if(!isSubmiting){
               if(password !== confirmPassword){
                    Alert.alert('Passwords are not the same')
               }else if(username && password && confirmPassword && email){
                    console.log("username" , username)
                    console.log("password" , password)
                    console.log("email" , email)
                    //submit
                    this.setState({
                         isSubmiting : true
                    })
                    //redux action  결과값을 얻는방식으로 할수 있는게 더생김
                    const signUpResult = await signUp(username, password, email)
                    console.log("signUpResult" , signUpResult)
                    if(!signUpResult){
                         Alert.alert('Something went wrong, try again');
                         this.setState({
                              isSubmiting : false
                         });
                    }
               }else{
                    Alert.alert('All fileds are require')
               }
          }
     }
}
export default Container;