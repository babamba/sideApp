import React, {Component} from "react";
import PropTypes from "prop-types";
import MoneyText from "./presenter";
import { image } from "react-native";


class Container extends Component {

     componentWillReceiveProps = nextProps => {
          if(nextProps.type === "Today"){
               console.log("!@!@! TODAY Money comp next: " , nextProps.CURRENT_SALARY)
               this.setState({
                    CURRENT_SALARY : nextProps.CURRENT_SALARY
               })
          }else if(nextProps.type === "Month"){
               console.log("!@!@! MONTH Money comp next: " , nextProps.MONTH_CURRENT_SALARY)
               this.setState({
                    MONTH_CURRENT_SALARY : nextProps.MONTH_CURRENT_SALARY
               })
          }else if(nextProps.type === "Meal"){
               console.log("!@!@! MONTH Meal comp next: " , nextProps.currentPrice)
               this.setState({
                    currentPrice : nextProps.currentPrice
               })
          }else if(nextProps.type === "Purchase"){
               console.log("!@!@! MONTH Purchase comp next: " , nextProps.currentPrice)
               this.setState({
                    currentPrice : nextProps.currentPrice
               })
          }
          
     }
     componentDidMount () {
          //console.log("MoneyText : ", this.props);
     }

     render() {
          return (
               <MoneyText 
                    {...this.props} 
                    {...this.state} 
               />
          );
     }
}
export default Container;