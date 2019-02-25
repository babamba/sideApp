import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import Swiper from 'react-native-swiper';
import TodayScreen from "../TodayScreen"
import MonthScreen from "../MonthScreen"
import PurchaseScreen from "../PurchaseScreen";
import MealScreen from "../MealScreen";
const { width, height } = Dimensions.get("window");

console.log("width, height",width, height)
class SwipeScreen extends Component {
     render(){
         //console.log(this.props)
       return (
          <Swiper
               style={styles.wrapper} 
               showsButtons={true}
               loadMinimal 
               loadMinimalSize={1}
              //  autoplay
              //  autoplayTimeout={7}
               dot={<View style={styles.dot} />}
               activeDot={<View style={styles.activeDot} />}
               paginationStyle={styles.paginationStyle}
               nextButton={<Text style={styles.nextButton}>›</Text>}
               prevButton={<Text style={styles.prevButton}>‹</Text>}
          >
           <View style={styles.slide1}>
             {/* <Text style={styles.text}>Hello Swiper</Text> */}
             <TodayScreen {...this.props}/>
           </View>
           <View style={styles.slide2}>
               <MonthScreen {...this.props}/>
             {/* <Text style={styles.text}>Beautiful</Text> */}
           </View>
           <View style={styles.slide3}>
             <MealScreen {...this.props}/>
           </View>
           <View style={styles.slide4}>
             {/* <Text style={styles.text}>And simple</Text> */}
             <PurchaseScreen {...this.props}/>
           </View>
         </Swiper>
       );
     }
   }

const styles = StyleSheet.create({
  wrapper: {

  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#92BBD9',
  },
  slide4: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: '#9DD6EB',
   },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dot:{
    backgroundColor: 'rgba(0,0,0,.2)', 
    width: 15, 
    height: 5, 
    borderRadius: 2, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3
  },
  activeDot:{
    backgroundColor: 'rgba(0,0,0,.5)', 
    width: 15, 
    height: 5, 
    borderRadius: 2, 
    marginLeft: 3, 
    marginRight: 3, 
    marginTop: 3, 
    marginBottom: 3
  },
  paginationStyle:{
    flex:1,
    justifyContent:'center',
  },
  nextButton:{
    color:'rgba(0,0,0,.5)',
  },
  prevButton:{
    color:'rgba(0,0,0,.5)',
  }
})

export default SwipeScreen;