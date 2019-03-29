import React, {Component} from "react";
import { View, Text, FlatList, ScrollView,Dimensions, RefreshControl, StyleSheet,TouchableOpacity, TextInput, StatusBar, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ifIphoneX } from 'react-native-iphone-x-helper'

import {
     SelectMultipleButton,
     SelectMultipleGroupButton
   } from "react-native-selectmultiple-button";
import { Haptic } from 'expo';

const { width, height } = Dimensions.get("window");
const ios_blue = "#007AFF";

//const IncreaseScreen = props => 
class IncreaseScreen extends Component {

     nameInput = null;

     componentDidMount(){
          Haptic.impact(Haptic.ImpactFeedbackStyle.Medium)

          setTimeout(() => {
               this.nameInput.focus();
          }, 30);
     }

     render() {
          return (
          <View style={{ flex: 2 }}>
            <View style={styles.container}> 
              <Ionicons name="ios-arrow-down" size={24} style={styles.downArrow}/>
              <View style={styles.content}>
                    <Text style={styles.mainText}>수입이 들어왔나요? </Text>
                    <View style={styles.main}>
                         <TextInput 
                              ref={ref => {
                                   this.nameInput = ref;
                              }}
                              placeholder="내용입력" 
                              style={styles.textInput}
                              autoCapitalize={"none"}
                              autoCorrect={false}
                              value={this.props.income}
                              //autoFocus={true}
                              onChangeText={this.props.changeIncome}
                         />
                         <Text style={styles.defulatText1}>가</Text>
                    </View>
                    <View style={styles.main}>
                         <TextInput 
                              placeholder="금액입력" 
                              style={styles.moneyInput} 
                              autoCapitalize={"none"}
                              //   secureTextEntry={true}
                              value={this.props.price}
                              onChangeText={this.props.changePrice}
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
                              borderWidth: 0,
                              paddingTop: 3,
                              paddingBottom: 3,
                              fontFamily: 'NanumBarunGothicUltraLight',
                              justifyContent: "center",
                         }}
                         defaultSelectedIndexes={this.props.defaultSelectedIndex_group_insterest}
                         highLightStyle={{
                              borderColor: "gray",
                              backgroundColor: "transparent",
                              textColor: "gray",
                              borderTintColor: ios_blue,
                              backgroundTintColor: "transparent",
                              textTintColor: ios_blue
                         }}
                         onSelectedValuesChange={this.props.onSelectedValuesChange}
                         group={this.props.multipleGroupData}
                    />

                      <TouchableOpacity style={styles.touchable} onPressOut={this.props.submit}>
                          <View style={styles.button}>
                                {this.props.isSubmiting ? ( 
                                    <ActivityIndicator size="small" color="white" /> 
                                    ) : ( 
                                    <Text style={styles.btnText }>등록하기</Text> 
                                )}
                          </View>
                      </TouchableOpacity>
            </View>
            
            </View>
         </View>
       );
     }
}
const styles = StyleSheet.create({
     container: {
          flex: 1,
          width:width
     },
     content: {
          flex: 4,
          alignItems: "center",
          justifyContent: "flex-start",
          ...ifIphoneX({paddingTop: 20}, {paddingTop: 0}),
     },
     main:{
          flexDirection:'row'
     },
     mainText:{
          // 수입이 들어왔나요?
          fontSize:22,
          width:width,
          fontFamily: 'NanumBarunGothic',
          paddingLeft:36,
          marginBottom:20
     },
     defulatText1:{
          // 원
          fontSize:18,
          width:45,
          fontFamily: 'NanumBarunGothicUltraLight',
          marginBottom:15,
     },
     defulatText2:{
          // 들어왔다.
          fontSize:18,
          width:width,
          paddingLeft:53,
          fontFamily: 'NanumBarunGothicUltraLight',
          marginBottom:30,
     },
     textInput:{
          height:28,
          width: width -150,
          marginBottom:10,
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize: 18
     },
     moneyInput:{
          height:50,
          width: width -150,
          marginBottom:15,
          fontFamily: 'NanumBarunGothicUltraLight',
          fontSize: 18
     },
     touchable : {
          borderRadius: 15,
          backgroundColor:"#99F089",
          width: width - 45,
          marginTop: 15,
          shadowColor: '#99F089',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
     },
     button : {
          paddingHorizontal:7,
          height:50,
          justifyContent:"center"     
     },
     btnText : {
          color:"white",
          fontWeight:"600",
          textAlign:"center",
          fontSize:18,
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