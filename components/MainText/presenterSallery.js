import React, {Component} from "react";
import PropTypes from "prop-types";
import { FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
//import FadeInView from 'react-native-fade-in-view';

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

import * as Animatable from 'react-native-animatable';

import MoneyText from "../MoneyText";

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 180;
const progressCustomStyles = {
     backgroundColor: 'red', 
     borderRadius: 0,
     borderColor: 'rgba(255, 255, 255, 0.8)',
     underlyingColor:'grey',
     colors:['#63E2FF', '#B066FE'],
};

const fadeInDown = {
     from: {
       opacity: 0,
     },
     to: {
       opacity: 1,
     },
   };

const SalleryText = props => (
     props.type  ===  "Today" ? ( 
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea} >
                         <View animation="fadeInDown" delay={200} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1} >
                                   나는 지금 
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   todaySallery={32312}
                                   {...props}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   벌었다.
                              </Text>
                         </View>
                         
                    </View>
                    <View style={styles.addButton}>
                    
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#99F089"}
                         /> 
                    </View>
               </View>
               <View style={styles.progress}>
                    <ProgressBarAnimated
                              {...progressCustomStyles}
                              style={styles.progress}
                              width={barWidth}
                              value={40}
                              backgroundColorOnComplete="#99F089"
                              barEasing={"ease"}
                    />
               </View>
          </View>
     ) : (
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <View animation="fadeInDown" delay={200}  easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1}>
                                   텅장이
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={100}  easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   todaySallery={1221312}
                                   {...props}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0}  easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   채워지고 있다.
                              </Text>
                         </View>
                    </View>
                    <View style={styles.addButton}>
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#99F089"}
                         />
                    </View>
               </View>
               <View style={styles.progress}>
                    <ProgressBarAnimated
                              {...progressCustomStyles}
                              style={styles.progress}
                              width={barWidth}
                              value={70}
                              backgroundColorOnComplete="#6CC644"
                              barEasing={"ease"}
                              color={"#99F089"}
                    />
               </View>
          </View>
     )
)

     
SalleryText.propTypes = {
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
     TodayMoneyWon:{
          fontSize:45,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     progress:{
          width:84,
          transform: [{ rotate: '270deg'}],
          //backgroundColor:'red',
          top: 120
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



export default SalleryText;