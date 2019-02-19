import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import AddButton from "../../components/AddButton";
import { ifIphoneX } from 'react-native-iphone-x-helper'

class TodayScreen extends Component {

     render(){
          return (
               <View style={styles.container}>
                    <Text style={styles.MainText}>TodayScreen</Text>
                    <AddButton AddText={"수입등록"} onPress={() => console.log("addButton")}/>
               </View>
          )
     }
}

     
     TodayScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          refresh: PropTypes.func.isRequired,
          //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
          backgroundColor: "white"
     },
     MainText:{
          flex:1,
          fontSize:17,
          justifyContent: 'center',
          textAlign:'center',
          alignItems: 'center'
     },

});



export default TodayScreen;