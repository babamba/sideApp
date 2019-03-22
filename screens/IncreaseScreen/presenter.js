import React, {Component} from "react";
import { View, Text, FlatList, ScrollView,Dimensions, RefreshControl, StyleSheet,TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
     SelectMultipleButton,
     SelectMultipleGroupButton
   } from "react-native-selectmultiple-button";

const { width, height } = Dimensions.get("window");
const ios_blue = "#007AFF";

const IncreaseScreen = props => 

         <View style={{ flex: 2 }}>
            <View style={styles.container}> 
              <Ionicons name="ios-arrow-down" size={20} style={styles.downArrow}/>
              <View style={styles.content}>
                    <Text style={styles.mainText}>수입이 들어왔나요? </Text>
                    <View style={styles.main}>
                         <TextInput 
                              placeholder="내용입력" 
                              style={styles.textInput}
                              autoCapitalize={"none"}
                              autoCorrect={false}
                              value={props.income}
                              onChangeText={props.changeIncome}
                         />
                         <Text style={styles.defulatText1}>가</Text>
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
                    <Text style={styles.defulatText2}>들어왔다.</Text>

                    <Text style={styles.mainText}>기분이 어땠어요? </Text>
                    <SelectMultipleGroupButton
                         multiple={false}
                         buttonViewStyle={styles.selectBtn}
                         containerViewStyle={{
                              borderWidth: 0.3,
                              borderColor: "#D3D3D3",
                              borderRadius: 6,
                              paddingTop: 18,
                              paddingBottom: 18,
                              fontFamily: 'NanumBarunGothicUltraLight',
                              justifyContent: "center",
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
                                    <Text style={styles.btnText }>등록하기</Text> 
                                )}
                          </View>
                      </TouchableOpacity>
            </View>
            
            </View>
         </View>
   
const styles = StyleSheet.create({
     container: {
          flex: 1,
          width:width
     },
     content: {
          flex: 4,
          alignItems: "center",
          justifyContent: "flex-start",
     },
     main:{
          flexDirection:'row'
     },
     mainText:{
          // 수입이 들어왔나요?
          fontSize:30,
          width:width,
          fontFamily: 'NanumBarunGothic',
          paddingLeft:30,
          marginBottom:30
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
          marginBottom:45,
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
     touchable : {
          borderRadius: 15,
          backgroundColor:"#99F089",
          width: width - 45,
          marginTop: 25,
          shadowColor: '#99F089',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
     },
     button : {
          paddingHorizontal:7,
          height:80,
          justifyContent:"center"     
     },
     btnText : {
          color:"white",
          fontWeight:"600",
          textAlign:"center",
          fontSize:30,
          shadowColor: 'grey',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
     },
     downArrow:{
          flexDirection:'row' ,
          justifyContent:'center',
          textAlign:'right',
          paddingTop:14,
          paddingRight:15

     },
     selectBtn:{
          marginHorizontal: 30,
          marginVertical:1,
          flex:1,
          width: 40, 
          height: 40, 
          borderRadius: 20,
          justifyContent:'space-around'
     }
     
})

   export default IncreaseScreen