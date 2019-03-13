import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AnimateNumber from '@bankify/react-native-animate-number'

const {width, height} = Dimensions.get("window");

const SubMoneyText = props => (
          props.Moneytype === "INCREASE_TODAY" ? (
               <View style={styles.container}>
                         <Text style={styles.increase}>+ </Text>
                         <Text style={styles.TodayMoney}>  
                              <AnimateNumber 
                                   value={props.currentToday} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
               </View>
          ) : (
               <View style={styles.container}>
                         <Text style={styles.increase}>+ </Text>
                         <Text style={styles.TodayMoney}>  
                              <AnimateNumber 
                                   value={props.currentMonth} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
               </View>
          )
               
)

const styles = StyleSheet.create({
     container:{
          flexDirection:'row'
     },
     TodayMoney:{
          fontSize:20,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicBold',
          color:"#99F089",
          fontWeight: 'bold',
          shadowColor: 'grey',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 1,
     },

     increase:{
          fontSize:20,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
          fontWeight: 'bold',
     },

});



export default SubMoneyText;