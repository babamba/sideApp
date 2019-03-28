import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Keyboard, Text, ScrollView,TouchableHighlight, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AddButton from "../../components/AddButton";
import MainText from "../../components/MainText"
import MoneyText from "../../components/MoneyText"
import Modal from "react-native-modal";
import { Card ,ListItem } from "react-native-elements";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import AddTotalScreen from "../AddTotalScreen";
import AnimateNumber from '@bankify/react-native-animate-number'

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 60;



const TotalScreen = props => (

          <View style={styles.container}>
               <ScrollView 
                    onScrollEndDrag={(e) => props.handleScroll(e)}
                    keyboardShouldPersistTaps='handled'
               >
               <Text style={styles.MainText1}>메인 스크린 할거야</Text>
               <Card title="고정급여">
                    <View style={styles.cardContainer}>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.monthSallery} 
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
               </Card>
               <Card title="고정지출">
                    <View style={styles.cardContainer}>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.FixConsumPrice} 
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
               </Card>
               <Card>
                    <View>
                    { 
                         props.FixConsumProduct.map((l, i) => (
                              <ListItem
                              key={i}
                              title={l.income_name}
                              //rightTitle={l.price + " 원"}
                              rightTitle={
                                   <Text style={styles.moneyText}>
                                   <AnimateNumber 
                                        value={l.price} 
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
                              }
                              />
                         )
                    )}
                    </View>
               </Card>
               <Card title="예산금액">
                    <View style={styles.cardContainer}>
                         <Text style={styles.moneyText}>
                         <AnimateNumber 
                                   value={props.BudgetPrice} 
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
               </Card>
               
               <Modal 
                         isVisible={props.isModalVisible} 
                         avoidKeyboard={true}
                         animationIn={'slideInDown'}
                         animationOut={"slideOutUp"}
                         deviceWidth={width}
                         deviceHeight={height}
                         style={styles.bottomModal}
                         backdropColor={"grey"}
                         backdropOpacity={0.9}
                         onBackButtonPress={props.toggleModal}
                         onBackdropPress={props.toggleModal}
                         onSwipe={props.toggleModal}
                         onSwipeComplete={props.toggleModal}
                         swipeDirection="up"
                         swipeThreshold={10}
                    >

                    <View style={styles.modalContent}>
                         <TouchableHighlight >
                                   <AddTotalScreen toggleModal={props.toggleModal}  />
                         </TouchableHighlight>
                    </View>
                    </Modal>
               {/* <MainText 
                    progress={props.progress}
                    {...props}
                    type={"Meal"}
                    refresh={props.refresh}
               /> */}
               {/* <TouchableOpacity onPressOut={ () => props.navigation.navigate("TakePhoto")}>
                    {/* <Text >사진테스트</Text> 
               </TouchableOpacity> */}
               </ScrollView>
          </View>
     )

     TotalScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          ...ifIphoneX({paddingTop: 80}, {paddingTop: 50}),
          backgroundColor: "white",
          justifyContent:'center',
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "column",
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
     TodayMoneyWon:{
          fontSize:45,
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
          height:height -340
     },
     bottomModal: {
          justifyContent: "flex-start",
          height: 0,
          margin: 0,
     },
     cardContainer:{
          alignItems:'center'
     },
     moneyText:{
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize:18,
     }
     // progress:{
     //      width:84,
     //      transform: [{ rotate: '270deg'}],
     //      //backgroundColor:'red',
     //      top: 290
     // }

});



export default TotalScreen;