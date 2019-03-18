import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Dimensions ,FlatList} from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get("window");

const SubList = props => (
     <View style={styles.container} >
          <FlatList
               data={props.TodayMealProduct}
               renderItem={({item}) => 
                    <View style={styles.list}>
                         <Text style={styles.name}>{item.income_name}</Text>
                         <Text style={styles.price}>{item.price}</Text>
                    </View>
               }
               keyExtractor={(item, index) => item.enrollId.toString()}
               refreshing ={props.refreshing}
               onRefresh ={props.onListRefresh}
          />
     </View>
)

     
SubList.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

const styles = StyleSheet.create({
     container:{
          flex:1,
          // ...ifIphoneX({marginTop:180}, {marginTop:130}),
          paddingLeft: 20,
          paddingRight: 20,
          width:width,
          //height: (height / 2) -150 ,
          // alignItems:"center",
          // alignContent: 'center',
          // flexDirection: "row",
          //backgroundColor:"red"
     },
     list: {
          flex: 1,
          marginTop:5,
          flexDirection: 'row',
          padding:10
     },
     name:{
          alignItems:"flex-start",
     },
     price:{
          alignItems:'flex-end'
     }
});



export default SubList;