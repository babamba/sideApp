import React, {Component} from "react";
import { View, Text, FlatList, ScrollView,Dimensions, RefreshControl, StyleSheet,TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import {
     SelectMultipleButton,
     SelectMultipleGroupButton
   } from "react-native-selectmultiple-button";

const multipleGroupData = [
     { value: "월" },
     { value: "화" },
     { value: "수" },
     { value: "목" },
     { value: "금" },
     { value: "토" },
     { value: "일" },
   ];

const WeekScreen = props => 

         <View style={{ flex: 2 }}>
            <View style={styles.container}> 
              <Ionicons name="ios-arrow-down" size={30} style={styles.downArrow}/>
              <View style={styles.content}>
                    <View style={styles.main}>
                         
                    </View>
                      <TouchableOpacity style={styles.touchable} onPressOut={props.submit}>
                          <View style={styles.button}>
                                {props.isSubmiting ? ( 
                                    <ActivityIndicator size="small" color="white" /> 
                                    ) : ( 
                                    <Text style={styles.btnText }>등록하기</Text> 
                                )}
                          </View>
                      </TouchableOpacity>
            </View>
            </View>
         </View>
   
   
const styles = StyleSheet.create({
     container: {
          flex: 1
     },
     content: {
          flex: 4,
          backgroundColor: "white",
          paddingTop: 150,
          //alignItems: "center",
          justifyContent: "flex-start",
     },
     main:{
          flexDirection:'row'
     },
     defulatText1:{
          fontSize:45,
          width:45,
          fontFamily: 'NanumBarunGothicUltraLight',
          marginBottom:15,
     },
     defulatText2:{
          fontSize:45,
          width:width -150,
          fontFamily: 'NanumBarunGothicUltraLight',
          marginBottom:15,
     },
     textInput:{
          height:48,
          width: width -150,
          marginBottom:15,
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize: 45
     },
     moneyInput:{
          height:50,
          width: width -150,
          marginBottom:15,
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize: 45
     },
     touchable : {
          borderRadius: 15,
          backgroundColor:"#99F089",
          width: width - 80,
          marginTop: 25,
          shadowColor: '#99F089',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
     },
     button : {
          paddingHorizontal:7,
          height:60,
          justifyContent:"center"     
     },
     btnText : {
          color:"white",
          fontWeight:"600",
          textAlign:"center",
          fontSize:30
     },
     downArrow:{
          flexDirection:'row' ,
          justifyContent:'center',
          textAlign:'center'
     }
     
})

export default WeekScreen