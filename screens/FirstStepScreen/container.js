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
          startHour: "9",
          endHour: "18",
          isSubmiting : false,
          isModalVisible: false,
          isStartModalVisible: false,
          isEndModalVisible: false,
          backBtn: false
     }

     static propsType = {
          login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     }

     componentDidMount(){
          
          //const { refresh } = this.props;

     }

     componentWillMount(){
          const { isSetData,
               monthSallery,
               salaryDay,
               selectWeek,
               startHour,
               endHour } = this.props

          if(isSetData){
               this.setState({
                    monthSallery : Number(monthSallery),
                    salaryDay : Number(salaryDay),
                    selectWeek,
                    startHour : Number(startHour),
                    endHour :  Number(endHour),
               })
          }

          if(this.props.backBtn){
               this.setState({
                    backBtn:true
               })
          }else{
               this.setState({
                    backBtn:false
               })
          }
     }

     render(){
          // console.log("deviceWidth" ,deviceWidth)
          // console.log("deviceHeight" ,deviceHeight)
          return (
                    <FirstStepScreen 
                         {...this.state } 
                         {...this.props }
                         changeSalary = {this._changeSalary}
                         changeSalaryDay = {this._changeSalaryDay}
                         changeSalaryWeek = {this._changeSalaryWeek}
                         changeWorkStart = {this._changeWorkStart}
                         changeWorkEnd = {this._changeWorkEnd}
                         submit={this._submit}
                         onSelectedValuesChange={this._groupButtonOnSelectedValuesChange}
                         defaultSelectedIndex_group_insterest={defaultSelectedIndex_group_insterest}
                         multipleGroupData={multipleGroupData}

                         toggleModal={this._toggleModal}
                         toggleModalstart={this._toggleModalstart}
                         toggleModalend={this._toggleModalend}

                         handleOnScroll={this._handleOnScroll}
                         handleScrollTo={this._handleScrollTo}
                    />
               );
     }

     _toggleModal = () => {
          console.log("_toggleModal");
          this.setState({ isModalVisible: !this.state.isModalVisible });
     }

     _toggleModalstart = () => {
          console.log("_toggleModal");
          this.setState({ 
               isStartModalVisible: !this.state.isStartModalVisible 
          });
     }
     _toggleModalend = () => {
          console.log("_toggleModal");
          this.setState({ 
               isEndModalVisible: !this.state.isEndModalVisible
          });
     }

     

  _handleOnScroll = event => {
     this.setState({
       scrollOffset: event.nativeEvent.contentOffset.y,
     });
   };
 
   _handleScrollTo = p => {
     if (this.scrollViewRef) {
       this.scrollViewRef.scrollTo(p);
     }
   };

     _changeSalary = text => {
          this.setState({ monthSallery : text });
     }

     _changeSalaryDay = text => {
          this.setState({ salaryDay : text });
     }

     _changeWorkStart = text => {
          if(parseInt(this.state.endHour) < parseInt(text) ){
               Alert.alert(
                    '시작시간이 종료시간보다 작을 수 없습니다.',
                    '',
                    [
                         {text: 'OK'},
                    ],
                       { cancelable: false }
               )
          }else{
               this.setState({ startHour : text });
          }
          
     }

     _changeWorkEnd = text => {
          if(parseInt(this.state.startHour) > parseInt(text) ){
               Alert.alert(
                    '종료시간이 시작시간보다 클 수 없습니다.',
                    '',
                    [
                         {text: 'OK'},
                    ],
                       { cancelable: false }
               )
          }else{
               this.setState({ endHour : text });
          }
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
                                   {text: 'OK', onPress: async() => { 
                                        //this.props.navigation.navigate("Side") 

                                        await this.setState({
                                             isSubmiting : false,
                                             monthSallery : "",
                                             salaryDay : "",
                                             selectWeek : defaultSelectedIndex_group_insterest,
                                             startHour: "9",
                                             endHour: "18",
                                        });

                                        if(this.props.backBtn){
                                             await this.setState({
                                                  backBtn:false
                                             })
                                             
                                             this.props.toggleModalVisibleSalaryForm();

                                        }
                                        
                                   }},
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
                    Alert.alert('모든 항목을 입력해주세요.')
               }
          }
     }
}
export default withNavigation(Container);