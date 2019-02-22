import React, {Component} from "react";
import { View, Text, FlatList, ScrollView,Dimensions, RefreshControl, StyleSheet,TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const type =["","","",""]

const InputScreen = props => 

         <View style={{ flex: 2 }}>
            <View style={styles.container}> 
              <Ionicons name="ios-arrow-down" size={30} style={styles.downArrow}/>
              <View style={styles.content}>
                <View style={styles.main}>
                    <TextInput 
                         placeholder="내용입력" 
                         style={styles.textInput}
                         autoCapitalize={"none"}
                         autoCorrect={false}
                         value={props.username}
                         onChangeText={props.changeUsername}
                    />
                    <Text style={styles.defulatText1}>가</Text>
                </View>
                <View style={styles.main}>
                <TextInput 
                      placeholder="금액입력" 
                      style={styles.moneyInput} 
                      autoCapitalize={"none"}
                    //   secureTextEntry={true}
                      value={props.password}
                      onChangeText={props.changePassword}
                      returnKeyType={"send"}
                />
               <Text style={styles.defulatText1}>원</Text>
                </View>
                <Text style={styles.defulatText2}>들어왔다.</Text>
                
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

   export default InputScreen