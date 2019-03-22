import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Dimensions ,FlatList} from "react-native";
import * as Animatable from 'react-native-animatable';
import FEEL from "../../constants";

const {width, height} = Dimensions.get("window");

const SubList = props => (
     <View style={styles.container} >
          <FlatList
               data={props.TodayMealProduct}
               renderItem={({item}) => 
                    <View style={styles.list}>
                         <Text style={styles.name}>{item.income_name}</Text>
                         <Text style={styles.price}>{item.price}</Text>
                         {item.feeling === "1" ?
                              <Text style={styles.feel}>좋아!</Text>
                         : null}
                         {item.feeling === "2" ?
                              <Text style={styles.feel}>쏘쏘?</Text>
                         : null}
                         {item.feeling === "3" ?
                              <Text style={styles.feel}>후회중..</Text>
                         : null}

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
          paddingLeft: 50,
          paddingRight: 20,
          paddingTop:25,
          width:width,
          //height: (height / 2) -150 ,
          // alignItems:"center",
          // alignContent: 'center',
          // flexDirection: "row",
          //backgroundColor:"red"
     },
     list: {
          flex: 1,
          flexDirection: 'row',
          padding:6
     },
     name:{
          fontSize:12,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
          paddingRight:18,
          alignItems:"flex-start",
     },
     price:{
          alignItems:'flex-end',
          paddingTop:1,
          paddingRight:18,
          fontSize:12,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     feel:{
          alignItems:'flex-end',
          fontSize:12,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     }
});



export default SubList;