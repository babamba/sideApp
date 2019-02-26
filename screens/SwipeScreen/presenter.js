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
        <View style={styles.container}>
          <Swiper
               style={styles.wrapper} 
               onMomentumScrollEnd={this.props.onScrollEnd}
               onIndexChanged={index => {
                  console.log("onindexchanged");
                  this.props.onIndexChanged(index);
               }}
               onScrollBeginDrag={this.props.onScrollBeginDrag}
               onMomentumScrollEnd={this.props.onMomentumScrollEnd}
               onTouchStartCapture={this.props.onTouchStartCapture}
               showsButtons={true}
               loadMinimal 
               loadMinimalSize={1}
               horizontal = {true}
               loop={false}
              //  autoplay
              //  autoplayTimeout={7}
               dot={<View style={styles.dot} />}
               bounces={true}
               removeClippedSubviews={false}
               activeDot={<View style={styles.activeDot} />}
               paginationStyle={styles.paginationStyle}
               nextButton={<Text style={styles.nextButton}>›</Text>}
               prevButton={<Text style={styles.prevButton}>‹</Text>}
               automaticallyAdjustContentInsets={true}
            >
           <View style={styles.slide1}>
              
             {/* <Text style={styles.text}>Hello Swiper</Text> */}
             {this.props.renderArray[0] ?
                <TodayScreen  {...this.props}/>
              : null}
           </View>
           <View style={styles.slide2}>
           {this.props.renderArray[1] ?
                <MonthScreen {...this.props}/>
                : null}
             {/* <Text style={styles.text}>Beautiful</Text> */}
           </View>
           <View style={styles.slide3}>
           {this.props.renderArray[2] ?
              <MealScreen  {...this.props}/>
             : null}
           </View>
           <View style={styles.slide4}>
             {/* <Text style={styles.text}>And simple</Text> */}
             {this.props.renderArray[3] ?
             <PurchaseScreen {...this.props}/>
             : null}
           </View>
         </Swiper>
         </View>
       );
     }
   }

const styles = StyleSheet.create({
  wrapper: {

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  slide4: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: 'white',
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