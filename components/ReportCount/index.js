import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Button, Text } from "react-native";
import AnimateNumber from '@bankify/react-native-animate-number'

const ReportCount = props => (
     <View style={{flex:1}}>
          <View style={styles.item}>
               <Text style={styles.text}>{props.text}</Text>
               <Text>
               <AnimateNumber 
                    value={props.number} 
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