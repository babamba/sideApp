import React, {Component} from "react";
import { Alert ,Dimensions } from "react-native"
import FirstStepScreen from "./presenter";
import PropTypes from "prop-types";
//import { FB_APP_ID } from "../../constant";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const defaultSelectedIndex_group_insterest = [0, 1, 4];
const multipleGroupData = [
     { value: "0", displayValue: "일" },
     { value: "1", displayValue: "월"},
     { value: "2", displayValue: "화" },
     { value: "3" ,displayValue: "수"},
     { value: "4", displayValue: "목" },
     { value: "5", displayValue: "금" },
     { value: "6", displayValue: "토" },
];

class Container extends Component {

     state = {
          salary : "",
          salaryDay : "",
          salaryWeek : "",
          startHour: "",
          endHour:"",
          isSubmiting : false,
          isModalVisible: false
     }

     static propsType = {
          login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     }

     render(){
          // console.log("deviceWidth" ,deviceWidth)
          // console.log("deviceHeight" ,deviceHeight)
          return (
                    <FirstStepScreen 
                         {...this.state } 
                         changeSalary = {this._changeSalary}
                         changeSalaryDay = {this._changeSalaryDay}
                         changeSalaryWeek = {this._changeSalaryWeek}
                         submit={this._submit}
                         onSelectedValuesChange={this._groupButtonOnSelectedValuesChange}
                         defaultSelectedIndex_group_insterest={defaultSelectedIndex_group_insterest}
                         multipleGroupData={multipleGroupData}
                    />
               );
     }

     _changeSalary = text => {
          this.setState({ salary : text });
     }

     _changeSalaryDay = text => {
          this.setState({ salaryDay : text });
     }

     _changeSalaryWeek = text => {
          this.setState({ salaryWeek : text });
     }

     _groupButtonOnSelectedValuesChange = selectedValues=> {
          console.log("selectedValues : ", selectedValues)
          this.setState({ multipleSelectedData_group: selectedValues });
     }
      
     _groupButtonOnSelectedValuesChange_limited = selectedValues=> {
          this.setState({multipleSelectedData_group_limited: selectedValues });
     }
      
     _onRadioGroupButtonSingleTap = valueTap => {
          this.setState({radioSelectedData_group: valueTap});
     }

     _submit = async() => {
          console.log("submit")
          const { salary, salaryDay, salaryWeek, startHour, endHour, isSubmiting } = this.state;
          const { submitData } = this.props;
          if(!isSubmiting){
               if(salary && salaryDay && salaryWeek && startHour && endHour){
                    //submit
                    this.setState({
                         isSubmiting : true
                    })

                    const setDataResult = await submitData(salary, salaryDay, salaryWeek, startHour, endHour);
                    //console.log(setDataResult);

                    if(!setDataResult){
                         Alert.alert('입력실패');
                         this.setState({
                              isSubmiting : false
                         });
                    }else{
                         Alert.alert('All fileds Submit')
                    }
                   
                    //redux action  결과값을 얻는방식으로 할수 있는게 더생김
                    // const loginResult = await login(username, password)
                    // console.log("loginResult" , loginResult)
                    // if(!loginResult){
                    //      Alert.alert('Something went wrong, try again');
                    //      this.setState({
                    //           isSubmiting : false
                    //      });
                    // }
               }else{
                    Alert.alert('All fileds are require')
               }
          }
     }
}
export default Container;