import React from "react";
import PropTypes from "prop-types";
import {  StyleSheet, Dimensions ,FlatList} from "react-native";
import * as Animatable from 'react-native-animatable';
import FEEL from "../../constants";
import Swiper from 'react-native-swiper';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';

const {width, height} = Dimensions.get("window");

const SubList = props => (
     <View style={styles.container}  animation="fadeInDown" delay={350} easing={"ease-in-out"} useNativeDriver >
          
          {/* <Swiper
               loadMinimal={true}
               loadMinimalSize={3}
               horizontal = {false}
               loop={true}
               bounces={false}
               autoplay={true}
               autoplayTimeout={2.5}
               showsButtons={false}
               showsPagination={false}
               pagingEnabled={false}
               scrollEnabled={false}
               automaticallyAdjustContentInsets={true}
            >
           
               {props.TodayMealProduct && 
                    props.TodayMealProduct.map( (item, i) => 
                    
                         <View style={styles.slide1} key={item.enrollId} >
                              <Text style={styles.name} >{item.income_name}</Text> 
                              <Text style={styles.price} >{item.price}</Text> 
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
                    )
               }
         </Swiper> */}
           <FlatList
               data={props.TodayMealProduct}
               renderItem={({item}) => 
                    <View style={styles.list}>
                         <Text style={styles.name}>{item.income_name}</Text>
                         <Text style={styles.price}>{item.price}</Text>
                         {item.feeling === "0" ?
                              <Text style={styles.feel}>좋아!</Text>
                         : null}
                         {item.feeling === "1" ?
                              <Text style={styles.feel}>쏘쏘?</Text>
                         : null}
                         {item.feeling === "2" ?
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
          paddingLeft: 60,
          paddingRight: 20,
          marginTop:200,
          width:width,
          height:70,
          //height: (height / 2) -150 ,
          // alignItems:"center",
          // alignContent: 'center',
          // flexDirection: "row",
          //backgroundColor:"red"
     },
     list: {
          flexDirection: 'row',
          padding:6
     },
     name:{
          alignItems:"flex-start",
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
          paddingRight:18,
          
     },
     price:{
          paddingTop:1,
          alignItems:'flex-start',
          paddingRight:18,
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
     },
     feel:{
          alignItems:'flex-start',
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
     },
     slide1: {
          justifyContent: 'flex-start',
          flexDirection: 'row',
          padding:6,

     },
});



export default SubList;