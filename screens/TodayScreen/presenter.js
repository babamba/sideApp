import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import MainText from "../../components/MainText"
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import AnimateNumber from 'react-native-animate-number';

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 60;

const TodayScreen = props => (
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <Text style={styles.MainText1}>
                              나는 지금 
                         </Text>
                         <Text style={styles.TodayMoney}>
                              <AnimateNumber 
                                   value={props.todaySallery} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*4
                                   }}
                              /> 원
                              
                         </Text>
                         <Text style={styles.MainText2}>
                              벌었다.
                         </Text>
                    </View>
                    <View style={styles.addButton}>
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                         />
                    </View>
               </View>
               <View style={styles.progress}>
                    <ProgressBarAnimated
                              style={styles.progress}
                              width={barWidth}
                              value={props.progress}
                              backgroundColorOnComplete="#6CC644"
                              barEasing={"ease"}
                    />
               </View>
           </View>
     )

     TodayScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          refresh: PropTypes.func.isRequired,
          //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
          backgroundColor: "white",
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "row",
     },
     TextConatiner:{
          flex:1,
          flexDirection: "column",
          alignContent: 'center',
          paddingLeft:60,
     },
     textArea:{
          flex:1,
          alignContent: 'center',
          //backgroundColor:'blue',
     },
     addButton:{
          height:20
     },
     MainText1:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     MainText2:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     TodayMoney:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicLight',
          fontWeight: 'bold',
     },
     TodayMoneyWon:{
          fontSize:45,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     
     progress:{
          width:84,
          transform: [{ rotate: '270deg'}],
          //backgroundColor:'red',
          top: 290
     }

});



export default TodayScreen;