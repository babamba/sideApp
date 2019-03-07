import React, {Component} from "react";
import PropTypes from "prop-types";
import { FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
//import FadeInView from 'react-native-fade-in-view';
import { LinearGradient } from 'expo';

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

import MoneyText from "../MoneyText";

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 180;
// const progressCustomStyles = {
//      backgroundColor: 'transparent', 
//      backgroundColorContainer: 'grey',
//      borderRadius: 20,
//      borderColor: 'red',
//      underlyingColor:'red',
// };

const progressGradient = {
     colors: ['#d2ff19', '#09cfee'],
     start: {x: 0, y: 1},
     end: {x: 1, y: 0}
 };

const SalleryText = props => (
     props.type  ===  "Today" ? ( 
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View animation="fadeInDown" delay={180} easing={"ease-in-out"} useNativeDriver>
                         <Text style={styles.remainText} >
                              {props.REMAIN_HOUR} 시간 {props.REMAIN_MINUTES}분 남았다. 버티자
                         </Text>
                    </View>
                    <View style={styles.textArea} >
                         <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1} >
                                   나는 지금 
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={50} easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   {...props}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   벌었다.
                              </Text>
                         </View>
                         
                    </View>
                    <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                    
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#99F089"}
                         /> 
                    </View>
               </View>
               <View style={styles.progress} animation="fadeIn" delay={100} useNativeDriver> 
                         {/* <ProgressBar 
                              progress={0.5} 
                              width={barWidth} 
                              useNativeDriver={true}
                              gradient={this.progressGradient}
                              borderRadius={5}
                              animationConfig={{bounciness: 10 }}
                              animationType={"spring"}
                              // indeterminate={true}
                         /> */}
                    <ProgressBarAnimated
                              width={barWidth}
                              value={props.PERCENT}
                              backgroundColorOnComplete="green"
                              barEasing={"ease"}
                    />
                    
               </View>
          </View>
     ) : (
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View animation="fadeInDown" delay={180} easing={"ease-in-out"} useNativeDriver>
                         <Text style={styles.remainText}>{props.REMAIN_DATE} 일 남았다. 힘내라 </Text>
                    </View>
                    <View style={styles.textArea}>
                         <View animation="fadeInDown" delay={100}  easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1}>
                                   텅장이
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={50}  easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   {...props}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0}  easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   채워지고 있다.
                              </Text>
                         </View>
                    </View>
                    <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#99F089"}
                         />
                    </View>
               </View>
               <View style={styles.progress} animation="fadeIn" delay={100} useNativeDriver>
                    <ProgressBarAnimated
                              // {...progressCustomStyles}
                              width={barWidth}
                              value={props.PERCENT}
                              backgroundColorOnComplete="#3CC644"
                              barEasing={"ease"}
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
     remainText:{
          fontSize:18,
          fontFamily: 'NanumBarunGothicUltraLight',
          paddingBottom:10
     },
     addButton:{
          paddingTop:20,
          height:20,
     },
     MainText1:{
          fontSize:38,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     MainText2:{
          fontSize:38,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     TodayMoneyWon:{
          fontSize:38,
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