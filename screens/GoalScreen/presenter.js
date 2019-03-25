import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet, Dimensions } from "react-native";
import AddButton from "../../components/AddButton";
import MainText from "../../components/MainText"
import MoneyText from "../../components/MoneyText"

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 60;

const GoalScreen = props => (
          <View style={styles.container}>
               <Text style={styles.MainText1}>저축스크린 할거야</Text>
               {/* <MainText 
                    progress={props.progress}
                    {...props}
                    type={"Meal"}
                    refresh={props.refresh}
               /> */}
           </View>
     )

     GoalScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          //refresh: PropTypes.func.isRequired,
          //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          backgroundColor: "white",
          justifyContent:'center',
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



export default GoalScreen;