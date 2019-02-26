import React, {Component} from "react";
import PropTypes from "prop-types";
import { FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { LinearGradient } from 'expo';

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

import * as Animatable from 'react-native-animatable';

import MoneyText from "../MoneyText";

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 180;

const DecreaseText = props => (
     props.type  ===  "Purchase" ? ( 
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1}>
                                   지름신이와서
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={50} easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   todaySallery={230000}
                                   {...props}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                              탕진해버렸다.
                              </Text>
                         </View>
                    </View>
                    <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                         <AddButton 
                              AddText={"지출등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#FF6565"}
                         />
                    </View>
               </View>
               <View style={styles.progress} animation="fadeIn" delay={100} useNativeDriver>
                    <ProgressBarAnimated
                    // {...progressCustomStyles}
                              style={styles.progress}
                              width={barWidth}
                              value={50}
                              barEasing={"ease"}
                              maxValue={100}
                              barAnimationDuration={20.0}
                              
                    />
               </View>
          </View>
     ) : (
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   todaySallery={22312}
                                   {...props}
                              />
                         </View>
                         <View animation="fadeInDown" delay={50} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1}>
                                   어치
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   밥을 먹었다
                              </Text>
                         </View>
                    </View>
                    <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                         <AddButton 
                              AddText={"지출등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#FF6565"}
                         />
                    </View>
               </View>
               <View style={styles.progress} animation="fadeIn" delay={100} useNativeDriver>
               <ProgressBarAnimated
                              //style={styles.progress}
                              width={barWidth}
                              value={90}
                              backgroundColorOnComplete="#3CC644"
                              barEasing={"ease"}
                    >
                    <LinearGradient 
                         style={{width:barWidth}}
                         colors={['#63E2FF', '#B066FE']}
                         start={{ x: 0, y: 1 }}
                         end={{ x: 1, y: 1 }}
                    />   
                    
                    </ProgressBarAnimated>
                   
               </View>
          </View>
     )
)

     
DecreaseText.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}



const styles = StyleSheet.create({
     container:{
          flex:1,
          marginTop:250,
          ...ifIphoneX({paddingTop: 50}, {paddingTop: 20}),
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
          alignContent: 'center',
          //backgroundColor:'blue',
     },
     addButton:{
          paddingTop:20,
          height:20,
     },
     MainText1:{
          fontSize:40,
          width:'100%',
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     MainText2:{
          fontSize:40,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     TodayMoneyWon:{
          fontSize:40,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     progress:{
          width:84,
          transform: [{ rotate: '270deg'}],
          //backgroundColor:'red',
          top: 120
     },

     progressCustomStyles:{
          backgroundColor: 'red', 
          borderRadius: 0,
          borderColor: 'orange',
     }
     // container:{
     //      flex:1,
     //      ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
     //      backgroundColor: "white",
     //      alignItems:"center",
     //      alignContent: 'center',
     // },
     // MainText1:{
     //      fontSize:45,
     //      justifyContent: 'center',
     //      textAlign:'center',
     //      alignItems: 'center',
     //      fontFamily: 'NanumBarunGothicUltraLight',
     // },
     // MainText2:{
     //      fontSize:45,
     //      justifyContent: 'center',
     //      textAlign:'center',
     //      alignItems: 'center',
     //      fontFamily: 'NanumBarunGothicUltraLight',
     // },
     // TodayMoney:{
     //      fontSize:45,
     //      justifyContent: 'center',
     //      textAlign:'center',
     //      alignItems: 'center'
     // },
     // TodayMoneyWon:{
     //      fontSize:45,
     //      fontFamily: 'NanumBarunGothicUltraLight',
     // },
     // addButton:{
     //      flex:1,
     // }

});



export default DecreaseText;