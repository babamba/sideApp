import React, {Component} from "react";
import PropTypes from "prop-types";
import MoneyText from "./presenter";
import { image } from "react-native";



class Container extends Component {

     componentWillReceiveProps = nextProps => {
          if(nextProps.type === "Today"){
               //console.log("!@!@! TODAY Money comp next: " , nextProps.CURRENT_SALARY)
          }else if(nextProps.type === "Month"){
               //consoleㅊ.log("!@!@! MONTH Money comp next: " , nextProps.MONTH_CURRENT_SALARY)
          }
          
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