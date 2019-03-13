import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';
import {withNavigation} from "react-navigation";
import Swiper from 'react-native-swiper';
import TodayScreen from "../TodayScreen"
import MonthScreen from "../MonthScreen"
import PurchaseScreen from "../PurchaseScreen";
import MealScreen from "../MealScreen";
import MenuButton from "../../components/MenuButton"
import { ifIphoneX } from 'react-native-iphone-x-helper'
const { width, height } = Dimensions.get("window");


console.log("width, height",width, height)
const SwipeScreen = props => (
// class SwipeScreen extends Component {

//      render(){
//          //console.log(this.props)
//        return (

 
        <View style={styles.container}>
           <View style={styles.menuButtonArea} >
            <MenuButton iconName={"md-menu"}  
                onPress={() => console.log(props.navigation.toggleDrawer('Side'))}
            />
           </View>
          <Swiper
               style={styles.wrapper} 
               onMomentumScrollEnd={props.onMomentumScrollEnd}
               onIndexChanged={index => {
                  console.log("onindexchanged");
                  props.onIndexChanged(index);
               }}
               onScrollBeginDrag={props.onScrollBeginDrag}

               onMomentumScrollBegin={props.onMomentumScrollBegin}
               onMomentumScrollEnd={props.onMomentumScrollEnd}
               onResponderRelease= {props.onResponderRelease}
               onTouchStartCapture={props.onTouchStartCapture}
               showsButtons={true}
               scrollEnabled={props.scrollControl}
               //scrollEnabled={false}
               
               loadMinimal 
               loadMinimalSize={3}
               horizontal = {true}
               loop={false}
              //  autoplay
              //  autoplayTimeout={7}
               dot={<View style={styles.dot} />}
               bounces={true}
               removeClippedSubviews={true}
               activeDot={<View style={styles.activeDot} />}
               paginationStyle={styles.paginationStyle}
               nextButton={<Text style={styles.nextButton}>›</Text>}
               prevButton={<Text style={styles.prevButton}>‹</Text>}
               automaticallyAdjustContentInsets={false}
            >
           <View style={styles.slide1}>
           {props.renderArray[0] ?
                <TodayScreen  {...props} />
                : null}
           </View>
           <View style={styles.slide2}>
              {props.renderArray[1] ?
              <MonthScreen {...props}/>
                
               : null}
            </View>
           <View style={styles.slide3}>
           {props.renderArray[2] ?
              <MealScreen  {...props}/>
             : null}
           </View>
           <View style={styles.slide4}>
             {props.renderArray[3] ?
             <PurchaseScreen {...props}/>
             : null}
           </View>
         </Swiper>
         </View>
       );
  //    }
  //  }

const styles = StyleSheet.create({
  wrapper: {

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menuButtonArea:{
    ...ifIphoneX({paddingTop: 40}, {paddingTop: 20}),
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

export default withNavigation(SwipeScreen);