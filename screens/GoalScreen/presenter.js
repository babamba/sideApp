import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet,StatusBar, Dimensions, TouchableOpacity } from "react-native";
import {LinearGradient} from 'expo';
import CarouselList from '../../components/CarouselList';
import { ifIphoneX } from 'react-native-iphone-x-helper'

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 60;
const colors = {
     black: '#1a1917',
     gray: '#888888',
     background1: '#fff7bc',
     background2: '#ffb987'
 };

class GoalScreen extends Component {
// const GoalScreen = props => (
     
     get gradient () {
          return (
              <LinearGradient
                colors={[colors.background1, colors.background2]}
                startPoint={{ x: 1, y: 0 }}
                endPoint={{ x: 0, y: 1 }}
                style={styles.gradient}
              />
          );
      }

     render () {
          //const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
          const { navigation } = this.props;
  
          return (
               <View style={styles.container}>
                    <StatusBar
                         translucent={true}
                         backgroundColor={'rgba(0, 0, 0, 0.3)'}
                         barStyle={'light-content'}
                    />
                    { this.gradient }
                    
                    <View style={styles.listContainer}>
                         <View style={styles.headerTitle}>
                              <Text style={styles.MainText1}>저축스크린 할거야</Text>
                              <TouchableOpacity onPressOut={ () => navigation.navigate("TakePhoto")}>
                                   <Text >사진테스트</Text>
                              </TouchableOpacity>
                         </View>
                         
                         <CarouselList {...this.props} colors={colors} carouselType='image'/>
                    </View>
               </View>
          )
     }
}

GoalScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          ...ifIphoneX({paddingTop: 50}, {paddingTop: 30}),
          justifyContent:'center',
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "column",
     },
     listContainer: {
          paddingVertical: 10
     },
     headerTitle:{
          justifyContent:'center',
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "column",
     },
     TextConatiner:{
          flex:1,
          flexDirection: "column",
          alignContent: 'center',
          paddingLeft:60,
     },
     gradient: {
          ...StyleSheet.absoluteFillObject
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