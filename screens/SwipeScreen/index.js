import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Swiper from 'react-native-swiper';
import TodayScreen from "../TodayScreen"
import MonthScreen from "../MonthScreen"
import PurchaseScreen from "../MonthScreen";
import MealScreen from "../MealScreen";

class SwipeScreen extends Component {
     render(){
       return (
          <Swiper 
               style={styles.wrapper} 
               showsButtons={true}
          
          >
           <View style={styles.slide1}>
             {/* <Text style={styles.text}>Hello Swiper</Text> */}
             <TodayScreen />
           </View>
           <View style={styles.slide2}>
               <MonthScreen/>
             {/* <Text style={styles.text}>Beautiful</Text> */}
           </View>
           <View style={styles.slide3}>
             <MealScreen />
           </View>
           <View style={styles.slide4}>
             {/* <Text style={styles.text}>And simple</Text> */}
             <PurchaseScreen />
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
  }
})

export default SwipeScreen;