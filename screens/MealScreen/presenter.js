import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import MainText from "../../components/MainText"
import MoneyText from "../../components/MoneyText"
import SubList from "../../components/SubList";


const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 60;

const MealScreen = props => (
          <View style={styles.container}>
               {/* <SubList  {...props} style={styles.list}/> */}
               <MainText 
                    progress={props.progress}
                    {...props}
                    type={"Meal"}
                    refresh={props.refresh}
                    style={styles.text}
               />
           </View>
     )

     MealScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          //refresh: PropTypes.func.isRequired,
          //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          backgroundColor: "white",
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "column",
     },
     // list:{
     //      flex:1,
     // },
     // text:{
     //      flex:2,
     // },
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
     // progress:{
     //      width:84,
     //      transform: [{ rotate: '270deg'}],
     //      //backgroundColor:'red',
     //      top: 290
     // }

});



export default MealScreen;