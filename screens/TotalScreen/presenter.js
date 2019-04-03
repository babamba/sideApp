import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, Keyboard, Text, ScrollView,TouchableHighlight, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import AddButton from "../../components/AddButton";
import MainText from "../../components/MainText"
import MoneyText from "../../components/MoneyText"
import Modal from "react-native-modal";
import { Card ,ListItem } from "react-native-elements";
import AddTotalPage from "../../components/AddTotalPage";
import AnimateNumber from '@bankify/react-native-animate-number'
import Swipeout from 'react-native-swipeout';
import MiniCarouselList from '../../components/MiniCarouselList';

const {width, height} = Dimensions.get("window");
const barWidth = Dimensions.get('screen').height - 60;

const colors = {
     black: '#1a1917',
     gray: '#888888',
     background1: '#fff7bc',
     background2: '#ffb987'
 };

const TotalScreen = props => (

          <View style={styles.container}>
               <StatusBar barStyle={"default"}/>
               <ScrollView 
                    onScrollEndDrag={(e) => props.handleScroll(e)}
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, width:width}}
                    scrollEnabled={props.swipeScrollEnabled ? true : false}
               >

               <View style={styles.header}>
                    <Text style={styles.MainText1}>Hello {props.username}</Text>
                    <Text style={styles.MainText2}>이번달 예산이에요</Text>
               </View>

               <Card
                    containerStyle={{
                         borderWidth:0, 
                         shadowOpacity: 0,
                    }}
                    dividerStyle={{
                        width:0
                    }}
               >
                    <View style={styles.cardContainer}>
                         <Text style={styles.title}>나의 급여_</Text>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.monthSallery} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
                    </View>
               </Card>
               
               <Card
                    containerStyle={{
                         borderWidth:0, 
                         shadowOpacity: 0,
                    }}
                    dividerStyle={{
                        width:0
                    }}
               >
                    <View style={styles.cardContainer}>
                         <Text style={styles.title}>나의 예산_</Text>
                         <Text style={styles.moneyText}>
                         <AnimateNumber 
                                   value={props.BudgetPrice} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   interval={0.1}
                                   // timing={(interval, progress) => {
                                   //      // slow start, slow end
                                   //      return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   // }}
                              /> 원
                         </Text>
                    </View>
               </Card>

               {/* 주기적지출 start */}
               <Card
                    containerStyle={{
                         borderWidth:0, 
                         shadowOpacity: 0,
                    }}
                    dividerStyle={{
                        width:0
                    }}
               >
                    <View style={styles.cardContainer}>
                         <Text style={styles.title}>주기적 지출_</Text>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.FixConsumPrice} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
                    </View>
               </Card>
               
               <View style={{paddingHorizontal: 20}}>
                    <MiniCarouselList 
                         colors={colors} 
                         carouselType='default'
                         data={props.Fixdata}
                         deleteData={props.deleteData}
                         
                    />
               </View>
               {/* 주기적지출 end */}


               {/* 수입 start */}

               <Card
                    containerStyle={{
                         borderWidth:0, 
                         shadowOpacity: 0,
                    }}
                    dividerStyle={{
                        width:0
                    }}
               >
                    <View style={styles.cardContainer}>
                         <Text style={styles.title}>수입 현황_</Text>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.ReportIncreaseMonthPrice} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
                    </View>
               </Card>
               
               <View style={{paddingHorizontal: 20}}>
                    <MiniCarouselList 
                         colors={colors} 
                         carouselType='default'
                         data={props.increasedata}
                         deleteData={props.deleteData}
                    />
               </View>
               
               {/* 수입 end */}


 {/* 수입 start */}

                <Card
                    containerStyle={{
                         borderWidth:0, 
                         shadowOpacity: 0,
                    }}
                    dividerStyle={{
                        width:0
                    }}
               >
                    <View style={styles.cardContainer}>
                         <Text style={styles.title}>밥값 현황_</Text>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.ReportMealMonthPrice} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
                    </View>
               </Card>
               
               <View style={{paddingHorizontal: 20}}>
                    <MiniCarouselList 
                         colors={colors} 
                         carouselType='default'
                         data={props.mealdata}
                         deleteData={props.deleteData}
                    />
               </View>
               
               {/* 수입 end */}


               {/* { props.FixConsumProduct.length > 0 &&  
               <Card>
                    <View>
                    { props.FixConsumProduct.map((l, i) => (
                              <Swipeout 
                                   key={i}
                                   right={
                                        [
                                             {
                                                  text: 'delete',
                                                  backgroundColor:'#fc4137',
                                                  onPress: () => ( props.deleteData(l.enrollId) ),
                                             }
                                        ]
                                   }
                                   //right={[swipeoutBtns , { onPress: () => console.log("press ", l.enrollId)}]}
                                   onOpen={()=>(props.onSwipeOpen(i))}
                                   close={props.rowIndex !== i}
                                   onClose={()=>(props.onSwipeClose(i))}
                                   rowIndex={i}
                                   scroll={event => props.allowScroll(event)}
                                   sectionId={0}
                                   //autoClose={true}
                                   // right={[{
                                   //      onPress: () => console.log("press ", l.enrollId),
                                   //      component: (
                                   //           <View>
                                   //                <Text>삭제</Text>
                                   //           </View>
                                   //      ),
                                   //  }]}>

                                   sensitivity={100}
                              >
                              <ListItem
                              key={i}
                              title={l.income_name}
                              //rightTitle={l.price + " 원"}
                              rightTitle={
                                   <Text style={styles.listMoneyText}>
                                   <AnimateNumber 
                                        value={l.price} 
                                        formatter={(val) => {
                                             return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                        }}
                                        //interval={10}
                                        timing={(interval, progress) => {
                                             // slow start, slow end
                                             return interval * (1 - Math.sin(Math.PI*progress) )*3
                                        }}
                                   /> 원
                                   </Text>
                              }
                              />
                              </Swipeout>
                         )
                    )}
                    
                    </View>
               </Card>
               
               } */}



               {/* 개인적지출 start */}

               <Card
                    containerStyle={{
                         borderWidth:0, 
                         shadowOpacity: 0,
                    }}
                    dividerStyle={{
                        width:0
                    }}
               >
                    <View style={styles.cardContainer}>
                         <Text style={styles.title}>개인적 지출_</Text>
                         <Text style={styles.moneyText}>
                              <AnimateNumber 
                                   value={props.ReportPurchaseMonthPrice} 
                                   formatter={(val) => {
                                        return Math.floor(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                   }}
                                   //interval={10}
                                   timing={(interval, progress) => {
                                        // slow start, slow end
                                        return interval * (1 - Math.sin(Math.PI*progress) )*3
                                   }}
                              /> 원
                         </Text>
                    </View>
               </Card>
               
               <View style={{paddingHorizontal: 20}}>
                    <MiniCarouselList 
                         colors={colors} 
                         carouselType='default'
                         data={props.purchasedata}
                         deleteData={props.deleteData}
                    />
               </View>
               
               {/* 개인적지출 end */}
               <Modal 
                    isVisible={props.isModalVisible} 
                    avoidKeyboard={true}
                    animationIn={'slideInDown'}
                    animationOut={"slideOutUp"}
                    deviceWidth={width}
                    deviceHeight={height}
                    style={styles.bottomModal}
                    backdropColor={"grey"}
                    backdropOpacity={0.9}
                    onBackButtonPress={props.toggleModal}
                    onBackdropPress={props.toggleModal}
                    onSwipe={props.toggleModal}
                    onSwipeComplete={props.toggleModal}
                    swipeDirection="up"
                    swipeThreshold={10}
               >
                    <View style={styles.modalContent}>
                         <TouchableHighlight >
                                   <AddTotalPage callbackFromParent={props.callback} toggleModal={props.toggleModal}  />
                         </TouchableHighlight>
                    </View>

               </Modal>
               {/* <MainText 
                    progress={props.progress}
                    {...props}
                    type={"Meal"}
                    refresh={props.refresh}
               /> */}
               {/* <TouchableOpacity onPressOut={ () => props.navigation.navigate("TakePhoto")}>
                    {/* <Text >사진테스트</Text> 
               </TouchableOpacity> */}
               </ScrollView>
          </View>
     )

     TotalScreen.propTypes = {
          isFetching : PropTypes.bool.isRequired,
          //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
     }

const styles = StyleSheet.create({
     container:{
          flex:1,
          backgroundColor: "white",
          //justifyContent:'center',
          alignItems:"center",
          //alignContent: 'center',
          flexDirection: "column",
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
     header:{
          paddingHorizontal: 20,
          paddingTop: 10,
          marginBottom: 10,
     },
     MainText1:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicBold',
          paddingBottom:8
     },
     MainText2:{
          paddingLeft:3,
          fontSize:28,
          justifyContent: 'center',
          textAlign:'left',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     TodayMoneyWon:{
          fontSize:45,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     modalContent: {
          backgroundColor: "white",
          //paddingBottom: 420,
          
          padding: 22,
          paddingTop:0,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "rgba(0, 0, 0, 0.1)",
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
          elevation: 4,
          height:height / 2.2
     },
     bottomModal: {
          justifyContent: "flex-start",
          height: 0,
          margin: 0,
     },
     cardContainer:{
          //alignItems:'center',
          flexDirection:'row',
          justifyContent:'space-between',
          elevation: 0,
     },
     title:{
          fontSize:32,
          alignSelf:'flex-start',
          fontFamily: 'NanumBarunGothicBold',
     },
     moneyText:{
          fontFamily: 'NanumBarunGothic',
          alignSelf:'flex-end',
          color:'#4c4c4c',
          fontSize:22,
     },
     listMoneyText:{
          fontSize:14,
     }
     // progress:{
     //      width:84,
     //      transform: [{ rotate: '270deg'}],
     //      //backgroundColor:'red',
     //      top: 290
     // }

});



export default TotalScreen;