import React, {Component} from "react";
import { Alert ,Dimensions } from "react-native"
import FirstStepScreen from "./presenter";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
//import { FB_APP_ID } from "../../constant";
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const defaultSelectedIndex_group_insterest = [1, 2, 3, 4, 5];
const multipleGroupData = [
     { value: 0, displayValue: "일" },
     { value: 1, displayValue: "월"},
     { value: 2, displayValue: "화" },
     { value: 3 ,displayValue: "수"},
     { value: 4, displayValue: "목" },
     { value: 5, displayValue: "금" },
     { value: 6, displayValue: "토" },
];

class Container extends Component {

     state = {
          monthSallery : "",
          salaryDay : "",
          selectWeek : defaultSelectedIndex_group_insterest,
          workingWeekDay : defaultSelectedIndex_group_insterest.length,
          startHour: "",
          endHour:"",
          isSubmiting : false,
          isModalVisible: false,
     }

     static propsType = {
          login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     }

     componentDidMount(){
          //const { refresh } = this.props;
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
                         changeWorkStart = {this._changeWorkStart}
                         changeWorkEnd = {this._changeWorkEnd}
                         submit={this._submit}
                         onSelectedValuesChange={this._groupButtonOnSelectedValuesChange}
                         defaultSelectedIndex_group_insterest={defaultSelectedIndex_group_insterest}
                         multipleGroupData={multipleGroupData}
                    />
               );
     }

     _changeSalary = text => {
          this.setState({ monthSallery : text });
     }

     _changeSalaryDay = text => {
          this.setState({ salaryDay : text });
     }

     _changeWorkStart = text => {
          this.setState({ startHour : text });
     }

     _changeWorkEnd = text => {
          this.setState({ endHour : text });
     }

     _groupButtonOnSelectedValuesChange = selectedValues=> {
          //console.log("selectedValues : ", selectedValues)
          this.setState({ selectWeek: selectedValues, workingWeekDay:selectedValues.length });
     }
      
     _groupButtonOnSelectedValuesChange_limited = selectedValues=> {
          this.setState({multipleSelectedData_group_limited: selectedValues , salaryWeek: selectedValues});
     }
      
     _onRadioGroupButtonSingleTap = valueTap => {
          this.setState({radioSelectedData_group: valueTap});
     }

     _submit = async() => {
          console.log("submit")
          const { monthSallery, salaryDay, selectWeek, workingWeekDay, startHour, endHour, isSubmiting } = this.state;
          const { submitData } = this.props;

          console.log(monthSallery, " / " , salaryDay," / " , selectWeek," / " ,workingWeekDay," / ", startHour," / " , endHour)

          if(!isSubmiting){
               if(monthSallery && salaryDay && selectWeek && startHour && endHour){
                    //submit
                    this.setState({
                         isSubmiting : true
                    })

                    const setDataResult = await submitData(monthSallery, salaryDay, selectWeek, workingWeekDay, startHour, endHour);
                    //console.log(setDataResult);

                    if(!setDataResult){
                         Alert.alert('입력실패');
                         this.setState({
                              isSubmiting : false
                         });
                         //console.log("_#_#_#_#_ navigate",this.props.navigation.navigate)
                    }else{

          //                <Button
          //     title="가입하기"
          //     onPress={() => props.navigation.navigate("SignUpScreen")}
          //   />
                         //console.log("_#_#_#_#_ ",this.props.navigation.navigate)
                         
                         Alert.alert(
                              '등록되었습니다',
                              '',
                              [
                                   {text: 'OK', onPress: () => this.props.navigation.navigate("Side") },
                              ],
                                 { cancelable: false }
                         )
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
                    //console.log(this.state.salaryWeek.length)
                    //console.log("_#_#_#_#_ navigate",this.props.navigation.navigate)
                    Alert.alert('All fileds are require')
               }
          }
     }
}
export default withNavigation(Container);