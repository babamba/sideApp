import React, {Component} from "react";
import PropTypes from "prop-types";
import { FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { ifIphoneX } from 'react-native-iphone-x-helper'

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

import MoneyText from "../MoneyText";
import SubMoneyText from "../SubMoneyText";

const {width, height} = Dimensions.get("window");
const barHeight = Dimensions.get('screen').height - 180;
const barWidth = Dimensions.get('screen').width
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

          props.isWorkingDay ? (
               <View style={styles.container}>
               
               <View style={styles.TextConatiner}>
                    <View style={styles.remainArea} 
                    animation="fadeInDown"
                    delay={180} 
                    easing={"ease-in-out"} 
                    useNativeDriver>
                   
                         { props.REMAIN_HOUR !== null && props.REMAIN_HOUR !== 'undefined' ? (
                              props.REMAIN_HOUR === "READY" ? (
                                   <Text style={styles.remainText} >
                                   잘잤어요? 
                                   </Text>
                              ) : (
                                   <Text style={styles.remainText} >
                                   {props.REMAIN_HOUR} 시간  
                              </Text>
                              )
                              
                              ) : (
                              <Text style={styles.remainText} >
                                   고생했어요 토닥토닥
                              </Text>
                              )
                         }

                         { props.REMAIN_MINUTES !== null && props.REMAIN_HOUR !== 'undefined' ? (
                              props.REMAIN_HOUR === "READY" ? (
                                   <Text style={styles.remainText} >
                                       오늘도 화이팅 :D 
                                   </Text>
                              ) : (
                                   <Text style={styles.remainText} >
                                        {props.REMAIN_MINUTES} 분 남았다. 버티자
                                   </Text>
                              )
                              
                              ) : (
                              <Text style={styles.remainText} >
                                   ..:D
                              </Text>
                              )
                         }

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
                                   Moneytype={"INCREASE"}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   벌었다.
                              </Text>
                         </View>
                         
                    </View>
                    <View style={styles.subMoneyArea} animation="fadeIn" delay={600} easing={"ease-in-out"} useNativeDriver  >
                         <SubMoneyText 
                              {...props}
                               Moneytype={"INCREASE_TODAY"}
                         />
                    </View>
                    <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#99F089"}
                              refresh={props.refresh}
                         /> 
                    </View>
               </View>
               <View style={styles.progress} 
                    animation="fadeIn" 
                    delay={100} 
                    easing={"ease-out"} 
                    useNativeDriver> 
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
                    {props.PERCENT === 100 ? (
                         <ProgressBarAnimated
                              width={barWidth}
                              value={props.PERCENT}
                              backgroundColor="#3CC644"
                              barEasing={"ease"}
                              borderRadius={0}
                              borderWidth={0}
                         />
                    ) : (
                         <ProgressBarAnimated
                              width={barWidth}
                              value={props.PERCENT}
                              backgroundColorOnComplete="green"
                              backgroundColor="#fff54c"
                              barEasing={"ease"}
                              borderRadius={0}
                              borderWidth={0}
                         />
                    )}
                    
               </View>
               
               
          </View>

          ) : (
               <View style={styles.container}>
                    <View style={styles.TextConatiner}>
                         <View style={styles.textArea} animation="fadeInDown" delay={180} easing={"ease-in-out"} useNativeDriver>
                              <View animation="fadeInDown" delay={400} easing={"ease-in-out"} useNativeDriver>
                                   <Text style={styles.MainText1} >
                                        열심히 
                                   </Text>
                              </View>
                              <View animation="fadeInDown" delay={300} easing={"ease-in-out"} useNativeDriver>
                                   <Text style={styles.MainText2} >
                                        일한 당신
                                   </Text>
                              </View>
                               <View animation="fadeInDown" delay={200} easing={"ease-in-out"} useNativeDriver>
                                   <Text style={styles.MainText1} >
                                        오늘은 
                                   </Text>
                              </View>
                              <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                                   <Text style={styles.MainText1} >
                                        쉬는 날 이니 
                                   </Text>
                              </View>
                              <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                                   <Text style={styles.MainText2} >
                                        푹 쉬어요 :D
                                   </Text>
                              </View>
                         </View>
                    </View>
               </View>
          )
          
          ) : (
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.remainArea} animation="fadeInDown" delay={180} easing={"ease-in-out"} useNativeDriver>

                    {props.REMAIN_DATE !== 0 ? (
                         <Text style={styles.remainText}>{props.REMAIN_DATE} 일 남았다. 힘내라 </Text>
                    ) : (
                         <Text style={styles.remainText}> 오늘은 월급날입니다! 와하하!</Text>
                    )}
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
                                   Moneytype={"INCREASE"}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0}  easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                                   채워지고 있다.
                              </Text>
                         </View>
                    </View>
                    <View style={styles.subMoneyArea} animation="fadeIn" delay={600} easing={"ease-in-out"} useNativeDriver  >
                         <SubMoneyText 
                              {...props}
                               Moneytype={"INCREASE_MONTH"}
                         />
                    </View>
                    <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                         <AddButton 
                              AddText={"수입등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#99F089"}
                              refresh={props.refresh}
                         />
                    </View>
               </View>
               <View style={styles.progress} animation="fadeIn" delay={100} useNativeDriver>
                    <ProgressBarAnimated
                              //{...progressCustomStyles}
                              width={barWidth}
                              value={props.PERCENT}
                              backgroundColorOnComplete="#3CC644"
                              backgroundColor="#b770ff"
                              barEasing={"ease"}
                              borderRadius={0}
                              borderWidth={0}
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
          alignItems:"flex-start",
          flexDirection: "column",
          //backgroundColor:"red"
     },
     TextConatiner:{
          flex:1,
          flexDirection: "column",
          alignContent: 'flex-start',
          ...ifIphoneX({paddingTop: 250}, {paddingTop: 220}),
          paddingLeft:50
     },
     textArea:{
          alignContent: 'center',
          paddingBottom:20,
          //backgroundColor:'blue',
     },
     remainArea:{
          paddingBottom:10,
          flexDirection:'row'
     },
     subMoneyArea:{
          paddingBottom:20,
          paddingTop:10,
          flexDirection:'row'
     },
     remainText:{
          fontSize:18,
          paddingBottom:6,
          paddingLeft:1,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     addButton:{
          height:34,
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
          width: barWidth
     }
});



export default SalleryText;