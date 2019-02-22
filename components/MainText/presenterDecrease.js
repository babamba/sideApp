import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ProgressBarAnimated from 'react-native-progress-bar-animated';

import MoneyText from "../MoneyText";

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 80;
const progressCustomStyles = {
     backgroundColor: 'red', 
     borderRadius: 0,
     borderColor: 'rgba(255, 255, 255, 0.8)',
   };

const DecreaseText = props => (
     props.type  ===  "Purchase" ? ( 
          <View style={styles.container}>
               <View style={styles.TextConatiner}>
                    <View style={styles.textArea}>
                         <Text style={styles.MainText1}>
                              지름신
                         </Text>
                         <MoneyText 
                              todaySallery={12312}
                              {...props}
                         />
                         <Text style={styles.MainText2}>
                             원치 탕진해버렸다.
                         </Text>
                    </View>
                    <View style={styles.addButton}>
                         <AddButton 
                              AddText={"지출등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#FF6565"}
                         />
                    </View>
               </View>
               <View style={styles.progress}>
                    <ProgressBarAnimated
                    {...progressCustomStyles}
                              style={styles.progress}
                              width={barWidth}
                              value={80}
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
                         <MoneyText 
                              todaySallery={12312}
                              {...props}
                         />
                         <Text style={styles.MainText1}>
                              원 치
                         </Text>
                         <Text style={styles.MainText2}>
                              밥을 먹었다
                         </Text>
                    </View>
                    <View style={styles.addButton}>
                         <AddButton 
                              AddText={"지출등록"} 
                              onPress={() => console.log("addButton")}
                              color={"#FF6565"}
                         />
                    </View>
               </View>
               <View style={styles.progress}>
                    <ProgressBarAnimated
                              //style={styles.progress}
                              progressCustomStyles={{backgroundColor: 'red', borderRadius: 0, borderColor: 'orange',}}
                              width={barWidth}
                              value={90}
                              backgroundColorOnComplete="#3CC644"
                              barEasing={"ease"}
                    />
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