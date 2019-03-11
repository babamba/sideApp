import React, {Component} from "react";
import { Alert } from "react-native"
import DecreaseScreen from "./presenter";
import PropTypes from "prop-types";
//import { FB_APP_ID } from "../../constant";
const defaultSelectedIndex_group_insterest = [1];
const multipleGroupData = [
     { value: "0", displayValue: "좋아요!" },
     { value: "1", displayValue: "그저그래요."},
     { value: "2", displayValue: "후회되요" },
];

class Container extends Component {

     state = {
          income : "",
          expend : "",
          isSubmiting : false,
          selectFillng : defaultSelectedIndex_group_insterest,
     }

     //static propsType = {
          //login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     //}

     _groupButtonOnSelectedValuesChange = selectedValues=> {
          console.log("selectedValues : ", selectedValues)
          this.setState({ selectFillng: selectedValues });
     }
      
     _groupButtonOnSelectedValuesChange_limited = selectedValues=> {
          this.setState({multipleSelectedData_group_limited: selectedValues , salaryWeek: selectedValues});
     }
      
     _onRadioGroupButtonSingleTap = valueTap => {
          this.setState({radioSelectedData_group: valueTap});
     }

     render(){
          return (
                    <DecreaseScreen 
                         {...this.state } 
                         changeIncome = {this._changeIncome}
                         changeExpend = {this._changeExpend}
                         submit = {this._submit}
                         onSelectedValuesChange={this._groupButtonOnSelectedValuesChange}
                         defaultSelectedIndex_group_insterest={defaultSelectedIndex_group_insterest}
                         multipleGroupData={multipleGroupData}
                         //submit={this._submit}
                         //fbLogin={this.props.fbLogin}
                    />
               );
     }

     _changeIncome = text => {
          this.setState({ income : text });
     }

     _changeExpend = text => {
          this.setState({ expend : text });
     }

     _submit = async() => {
          const { income, expend, selectFillng, isSubmiting } = this.state;

          console.log('income : ', income);
          console.log('expend : ', expend);
          console.log('selectFillng : ', selectFillng);
          const { login } = this.props;
          if(!isSubmiting){
               if(income && expend){
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
               }else{
                    Alert.alert('All fileds are require')
               }
          }
     }
}
export default Container;