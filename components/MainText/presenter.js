import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'

const {width, height} = Dimensions.get("window");

const MainText = props => (
               <View style={styles.container}>
                    <Text style={styles.MainText1}>나는 지금</Text>
                    <Text style={styles.TodayMoney}>20,000</Text>
                    <Text style={styles.TodayMoneyWon}>원</Text>
                    <Text style={styles.MainText2}>벌었다.</Text>
                    <AddButton 
                         style={styles.addButton} 
                         AddText={"수입등록"} 
                         onPress={() => console.log("addButton")}
                    />
               </View>
)

     
     MainText.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          refresh: PropTypes.func.isRequired,
          //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
          backgroundColor: "white",
          alignItems:"center",
          alignContent: 'center',
     },
     MainText1:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'center',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     MainText2:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'center',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     TodayMoney:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'center',
          alignItems: 'center'
     },
     TodayMoneyWon:{
          fontSize:45,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     addButton:{
          flex:1,
     }

});



export default MainText;