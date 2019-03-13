import React, {Component} from "react";
import PropTypes from "prop-types";
import SubMoneyText from "./presenter";
import { image } from "react-native";
import moment from "moment";


class Container extends Component {

     componentWillReceiveProps = nextProps => {
          if(nextProps.MonthIncreaseProduct){
               if(nextProps.Moneytype === "INCREASE_TODAY"){
                    console.log("nextProps.currentToday : " , nextProps.currentToday)
               }else{
                    console.log("nextProps.currentMonth : " , nextProps.currentMonth)
               }
               this.setState({
                    MonthIncreaseProduct : nextProps.MonthIncreaseProduct
               })
          }
     }
     componentDidMount () {
          //console.log("MoneyText : ", this.props);
          this._refresh();
     }

     render() {
          return (
               <SubMoneyText 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          //const { getNotifications } = this.props;
         
          const { getDataIncreaseMonth } = this.props;
          getDataIncreaseMonth(moment().format("YYYYMMDD"));

           this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
     }
}
export default Container;