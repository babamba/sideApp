import React, {Component} from "react";
import PropTypes from "prop-types";
import { FlatList, Platform, ScrollView, RefreshControl, StyleSheet, Dimensions, TouchableHighlight } from "react-native";
import SubtractButton from "../../components/SubtractButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { LinearGradient } from 'expo';
import DecreaseMealScreen from "../../screens/DecreaseMealScreen";
import DecreasePurchaseScreen from "../../screens/DecreasePurchaseScreen";
import Modal from "react-native-modal";

import { createAnimatableComponent, View, Text } from 'react-native-animatable';

import * as Animatable from 'react-native-animatable';

import MoneyText from "../MoneyText";

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 180;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const DecreaseText = props => (
     props.type  ===  "Purchase" ? ( 
          <View style={styles.container}>
               <ScrollView
                    onScrollEndDrag={(e) => props.handleScroll(e)}
                    keyboardShouldPersistTaps='always'
                    // snapToOffsets={[-5,0,200]}
                    // snapToStart={true}
                    showsVerticalScrollIndicator={false}
                    //directionalLockEnabled={true}
               >
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText1}>
                                   지름신이와서
                              </Text>
                         </View>
                         <View animation="fadeInDown" delay={50} easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   {...props}
                                   Moneytype={"DECREASE"}
                              />
                         </View>
                         <View animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver>
                              <Text style={styles.MainText2}>
                              탕진해버렸다.
                              </Text>
                         </View>
                    </View>

                    <Modal 
                         isVisible={props.isModalVisible} 
                         deviceWidth={deviceWidth}
                         deviceHeight={deviceHeight}
                         style={styles.bottomModal}
                         backdropColor={"grey"}
                         backdropOpacity={0.9}
                         onBackdropPress={props.toggleModal}
                         onBackButtonPress={props.toggleModal}
                         onSwipe={props.toggleModal}
                         swipeDirection="up"
                         animationIn={'slideInDown'}
                         animationOut={"slideOutUp"}
                         onSwipeComplete={props.toggleModal}
                         swipeThreshold={10}
                    >

                    <View style={styles.modalContent}>
                         <TouchableHighlight >
                                   <DecreasePurchaseScreen callbackFromParent={props.callback} toggleModal={props.toggleModal}  />
                         </TouchableHighlight>
                    </View>
                    </Modal>

                    {Platform.OS === 'android' && 
                         <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                              <SubtractButton 
                                   AddText={"밥값등록"} 
                                   onPress={props.toggleModal}
                                   type={props.type}
                                   color={"#FF6565"}
                              />
                         </View>
                    }

                    {/* <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                         <SubtractButton 
                              AddText={"지출등록"} 
                              onPress={() => console.log("SubtractButton")}
                              color={"#FF6565"}
                              type={props.type}
                              refresh={props.refresh}
                         /> 
                    </View>*/}
               </View>
               {/* <View style={styles.progress} animation="fadeIn" delay={100} useNativeDriver>
                    <ProgressBarAnimated
                    // {...progressCustomStyles}
                              style={styles.progress}
                              width={barWidth}
                              value={50}
                              barEasing={"ease"}
                              maxValue={100}
                              barAnimationDuration={20.0}
                              
                    />
               </View> */}
               </ScrollView>
          </View>
     ) : (
          <View style={styles.container}>
               <ScrollView
                    onScrollEndDrag={(e) => props.handleScroll(e)}
                    keyboardShouldPersistTaps='always'
                    // snapToOffsets={[-5,0,200]}
                    // snapToStart={true}
                    showsVerticalScrollIndicator={false}
                    //directionalLockEnabled={true}
               >
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <View animation="fadeInDown" delay={100} easing={"ease-in-out"} useNativeDriver>
                              <MoneyText 
                                   {...props}
                                   Moneytype={"DECREASE"}
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
                    
                    <Modal 
                         isVisible={props.isModalVisible} 
                         deviceWidth={deviceWidth}
                         deviceHeight={deviceHeight}
                         style={styles.bottomModal}
                         backdropColor={"grey"}
                         backdropOpacity={0.9}
                         onBackdropPress={props.toggleModal}
                         onBackButtonPress={props.toggleModal}
                         onSwipe={props.toggleModal}
                         swipeDirection="up"
                         animationIn={'slideInDown'}
                         animationOut={"slideOutUp"}
                         onSwipeComplete={props.toggleModal}
                         swipeThreshold={10}
                    >

                    <View style={styles.modalContent}>
                         <TouchableHighlight >
                                   <DecreaseMealScreen callbackFromParent={props.callback} toggleModal={props.toggleModal}  />
                         </TouchableHighlight>
                    </View>
                    </Modal>
                    {Platform.OS === 'android' && 
                         <View style={styles.addButton} animation="fadeInDown" delay={0} easing={"ease-in-out"} useNativeDriver >
                              <SubtractButton 
                                   AddText={"밥값등록"} 
                                   onPress={props.toggleModal}
                                   type={props.type}
                                   color={"#FF6565"}
                              />
                         </View>
                    }
               </View>
               </ScrollView>
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
          ...ifIphoneX({paddingTop: 120}, {paddingTop: 100}),
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "row",
     },
     // mealContainer:{
     //      flex:1,
     //      marginTop:60,
     //      alignContent: 'center',
     //      flexDirection: "row",
     // },
     TextConatiner:{
          flex:1,
          flexDirection: "column",
          alignContent: 'center',
          paddingLeft:60,
     },
     textArea:{
          alignContent: 'center',
          paddingBottom:20,
          //backgroundColor:'blue',
     },
     addButton:{
          height:34,
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
     modalContent: {
          backgroundColor: "white",
          //paddingBottom: 420,
          
          padding: 22,
          paddingTop:0,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "rgba(0, 0, 0, 0.1)",
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
          elevation: 1,
          height:height / 1.6
     },
     bottomModal: {
          justifyContent: "flex-start",
          height: 0,
          margin: 0,
     },
     // progress:{
     //      width:84,
     //      transform: [{ rotate: '270deg'}],
     //      //backgroundColor:'red',
     //      top: 120
     // },

     progressCustomStyles:{
          backgroundColor: 'red', 
          borderRadius: 0,
          borderColor: 'orange',
     }
     // container:{
     //      flex:1,
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