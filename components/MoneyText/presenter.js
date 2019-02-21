import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AnimateNumber from 'react-native-animate-number';

const {width, height} = Dimensions.get("window");

const MoneyText = props => (
               <View style={styles.container}>
                    <Text style={styles.TodayMoney}>
                              <AnimateNumber 
                                   value={props.currentSecondSallery} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*4
                                   }}
                              /> 원
                         </Text>
               </View>
)

     
MoneyText.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

const styles = StyleSheet.create({
     // container:{
     //      flex:1
     // },
     TodayMoney:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicLight',
          fontWeight: 'bold',
     },

});



export default MoneyText;