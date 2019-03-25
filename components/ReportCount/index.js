import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Button, Text } from "react-native";
import AnimateNumber from '@bankify/react-native-animate-number'


class ReportCount extends Component {

     state ={
          isFetching : false,
          ReportIncreaseTodayPrice: 0,
          ReportMealTodayPrice: 0,
          ReportPurchaseTodayPrice: 0,

          ReportIncreaseMonthPrice: 0,
          ReportMealMonthPrice: 0,
          ReportPurchaseMonthPrice: 0,

     }

     componentDidMount(){
          console.log("asdf : " , this.props.ReportIncreaseMonthPrice)
     }

     componentWillReceiveProps = nextProps => {
          console.log(nextProps.number)
          if(nextProps){
               console.log("report count refresh " , nextProps.type)
               this._refresh()
          }

          this.setState({
               isFetching:false
          })
     }
     
     render(){
          return(
               <View style={{flex:1}}>
                    <View style={styles.item}>
                         <Text style={styles.text}>{this.props.text}</Text>
                         <Text>
                         <AnimateNumber 
                              value={this.props.number} 
                              formatter={(val) => {
                                   return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                              }}
                              //interval={10}
                              timing={(interval, progress) => {
                                   // slow start, slow end
                                   return interval * (1 - Math.sin(Math.PI*progress) )*3
                              }}
                         /> 원</Text>
                    </View>
               </View>
          )
     }

     _refresh = async() => {
          await this.setState({
               isFetching: true
          })
     }
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center"
  },
  number: {
    fontSize: 16,
    fontWeight: "600"
  },
  text: {
    fontSize: 12,
    color: "#999"
  }
});

export default ReportCount;