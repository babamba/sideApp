import React, {Component} from "react";
import { Alert } from "react-native"
import DecreasePurchaseScreen from "./presenter";

import PropTypes from "prop-types";
//import { FB_APP_ID } from "../../constant";
const defaultSelectedIndex_group_insterest = [1];
const multipleGroupData = [
     { value: 0, displayValue: "좋아요!" },
     { value: 1, displayValue: "그저그래요."},
     { value: 2, displayValue: "후회되요" },
];

class Container extends Component {

     state = {
          income : "",
          price : "",
          isSubmiting : false,
          selectFeeling : defaultSelectedIndex_group_insterest,
     }

     //static propsType = {
          //login:PropTypes.func.isRequired,
          //fbLogin:PropTypes.func.isRequired
     //}

     _groupButtonOnSelectedValuesChange = selectedValues=> {
          console.log("selectedValues : ", selectedValues)
          this.setState({ selectFeeling: selectedValues });
     }
      
     _groupButtonOnSelectedValuesChange_limited = selectedValues=> {
          this.setState({multipleSelectedData_group_limited: selectedValues});
     }
      
     _onRadioGroupButtonSingleTap = valueTap => {
          this.setState({radioSelectedData_group: valueTap});
     }

     render(){
          return (
                    <DecreasePurchaseScreen 
                         {...this.state } 
                         changeIncome = {this._changeIncome}
                         changePrice = {this._changePrice}
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
          //console.log(text)
          this.setState({ income : text });
     }

     _changePrice = text => {
          //console.log(text)
          this.setState({ price : text });
     }

     _submit = async() => {
          const { income, price, selectFeeling, isSubmiting } = this.state;

          console.log('income : ', income);
          console.log('price : ', price);
          console.log('selectFillng : ', selectFeeling);
          const CONSUM_TYPE = 2;
          console.log("CONSUM_TYPE : ", CONSUM_TYPE )
          const { submitConsum, toggleModal } = this.props;

          console.log("income && price" , income , "&&", price)
          if(!isSubmiting){
               if(income && price){
                    
                    //submit
                    this.setState({
                         isSubmiting : true
                    })
                    //redux action  결과값을 얻는방식으로 할수 있는게 더생김
                    const submitResult = await submitConsum(income, price, selectFeeling[0] , CONSUM_TYPE)
                    console.log("------ submitResult" , submitResult)
                    if(!submitResult){
                         Alert.alert('Something went wrong, try again');
                         this.setState({
                              isSubmiting : false
                         });
                    }else{
                         Alert.alert(
                              '등록되었습니다',
                              '',
                              [
                                   {text: 'OK', onPress: () => toggleModal()},
                              ],
                                 { cancelable: false }
                         )
                         this.setState({ isSubmiting : false });
                         //getDataMealToday(moment().format("YYYYMMDD"));
                    }
               }else{
                    Alert.alert('입력사항을 입력해주세요.')
               }
          }
     }
}
export default Container;