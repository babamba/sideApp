import React, {Component} from "react";
import { View, Text, FlatList, ScrollView,Dimensions, RefreshControl, StyleSheet,TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
     SelectMultipleButton,
     SelectMultipleGroupButton
   } from "react-native-selectmultiple-button";

const { width, height } = Dimensions.get("window");
const ios_blue = "#007AFF";

const AddTotalScreen = props => 

         <View style={{ flex: 2 }}>
            <View style={styles.container}> 
              <Ionicons name="ios-arrow-down" size={24} style={styles.downArrow}/>
              <View style={styles.content}>
                    <View style={styles.main}>
                         <TextInput 
                              placeholder="ex) 통신비" 
                              style={styles.textInput}
                              autoCapitalize={"none"}
                              autoCorrect={false}
                              autoFocus={true}
                              value={props.income}
                              onChangeText={props.changeIncome}
                         />
                         <Text style={styles.defulatText1}></Text>
                    </View>
                    <View style={styles.main}>
                         <TextInput 
                              placeholder="금액입력" 
                              style={styles.moneyInput} 
                              autoCapitalize={"none"}
                              //   secureTextEntry={true}
                              value={props.price}
                              onChangeText={props.changePrice}
                              returnKeyType={"send"}
                              keyboardType={"number-pad"}
                         />
                         <Text style={styles.defulatText1}>원</Text>
                    </View>

                    <View style={styles.selectArea}>
                    <SelectMultipleGroupButton
                         multiple={false}
                         buttonViewStyle={styles.selectBtn}
                         containerViewStyle={{
                              borderWidth: 0,
                              fontFamily: 'NanumBarunGothicUltraLight',
                              justifyContent: "center",
                              paddingRight:6
                         }}
                         defaultSelectedIndexes={props.defaultSelectedIndex_group_insterest}
                         highLightStyle={{
                              borderColor: "gray",
                              backgroundColor: "transparent",
                              textColor: "gray",
                              borderTintColor: ios_blue,
                              backgroundTintColor: "transparent",
                              textTintColor: ios_blue
                         }}
                         onSelectedValuesChange={props.onSelectedValuesChange}
                         group={props.multipleGroupData}
                    />

                      <TouchableOpacity style={styles.touchable} onPressOut={props.submit}>
                          <View style={styles.button}>
                                {props.isSubmiting ? ( 
                                    <ActivityIndicator size="small" color="white" /> 
                                    ) : ( 
                                    <Text style={styles.btnText }>등록</Text> 
                                )}
                          </View>
                      </TouchableOpacity>
                      </View>
            </View>
            
            </View>
         </View>
   
const styles = StyleSheet.create({
     container: {
          flex: 1,
          width:width
     },
     content: {
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop:50
     },
     main:{
          flexDirection:'row'
     },
     mainText:{
          // 수입이 들어왔나요?
          fontSize:30,
          width:width,
          fontFamily: 'NanumBarunGothic',
          paddingLeft:0,
          marginBottom:0
     },
     defulatText1:{
          // 원
          fontSize:30,
          width:45,
          fontFamily: 'NanumBarunGothicUltraLight',
          marginBottom:15,
     },
     defulatText2:{
          // 들어왔다.
          fontSize:30,
          width:width,
          paddingLeft:53,
          fontFamily: 'NanumBarunGothicUltraLight',
          marginBottom:10,
     },
     textInput:{
          height:48,
          width: width -150,
          marginBottom:15,
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize: 30
     },
     moneyInput:{
          height:50,
          width: width -150,
          marginBottom:15,
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize: 30
     },
     selectArea:{
          flex:1,
          flexDirection:"row"
     },
     touchable : {
          backgroundColor:"#99F089",
          width: 60,
          height:40,
          alignItems:'center',
          shadowColor: '#99F089',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
          marginTop:5,
          borderRadius: 2,
     },
     button : {
          paddingHorizontal:7,
          height:40,
          width:40,
          justifyContent:"center"     
     },
     btnText : {
          color:"white",
          fontWeight:"600",
          textAlign:"center",
          fontSize:14,
          shadowColor: 'grey',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
     },
     downArrow:{
          textAlign:'right',
          paddingTop:14,
          paddingRight:15
     },
     selectBtn:{
          width: 60, 
          height: 40, 
          justifyContent:'space-around'
     }
     
})

export default AddTotalScreen