import React from "react";
import PropTypes from "prop-types";
import { Modal,View, Text, FlatList, StyleSheet,TouchableOpacity,Dimensions } from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ReportListItem from "../../components/ReportListItem"
import CalendarScreen from "../CalendarScreen"

import ReportConut from "../../components/ReportCount"

import { Ionicons } from '@expo/vector-icons';
const {width, height} = Dimensions.get("window");
const ReportScreen = props => (
     
    <View style={styles.container}>
          <View style={styles.headerMain}> 
               <Text style={styles.headerText}>오늘의 통계</Text>
               <View style={styles.headerCalendar}>
                    <TouchableOpacity onPress={props.setModalVisibleCalendar} style={styles.calBtn}>
                         <Ionicons name="md-calendar" size={30}/>
                         {/* <Text>달력으로 보기</Text> */}
                    </TouchableOpacity>
                    <View>
                         <Modal
                              animationType="slide"
                              transparent={false}
                              visible={props.modalVisibleCalendar}
                         >
                              <View style={{flex:1}}>
                              <CalendarScreen 
                                   {...props }
                                   setModalVisible={props.setModalVisibleCalendar}
                              />
                              </View>
                         </Modal>
                    </View>
               </View>
               
          </View>
          <View style={styles.headerCount}>
                    <View style={styles.profileNumbers}>
                         <ReportConut
                              number={props.ReportIncreaseTodayPrice}
                              text={"수입"}
                         />
                         <ReportConut
                              number={props.ReportMealTodayPrice}
                              text={"밥값"}
                         />
                         <ReportConut
                              number={props.ReportPurchaseTodayPrice}
                              text={"소비"}
                         />
                    </View>
               </View>
          <View style={styles.listContainer} > 
               <FlatList
                    data={props.TodayReportData}
                    renderItem={({item}) => 
                         <ReportListItem {...item}/>
                    }
                    keyExtractor={(item, index) => item.enrollId.toString()}
                    refreshing ={props.isTodayFetching}
                    onRefresh ={props.refreshToday}
               />
          </View>
          {/* <Text>ReportScreen Month</Text>
          <FlatList
               data={props.MonthReportData}
               renderItem={({item}) => 
                    <ReportListItem {...item}/>
               }
               keyExtractor={(item, index) => item.enrollId.toString()}
               refreshing ={props.isMonthFetching}
               onRefresh ={props.refreshMonth}
          /> */}
    </View>
    
    
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          ...ifIphoneX({paddingTop: 70}, {paddingTop: 50}),
          backgroundColor: "white"
     },
     listContainer: {
          flex:1,
         marginBottom: 0,
         marginTop: 0,
         borderTopWidth: 0,
       },
     headerMain:{
          height:50,
          paddingVertical: 7,
          flexDirection:"row",
          justifyContent:'center',
          alignItems: 'center',
     },
     headerText:{
          //backgroundColor:'red',
          fontSize: 22,
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     headerCalendar:{
          position:'absolute', 
          right:4,
          paddingRight: 20
          //backgroundColor:'blue',
     },
     headerCount: {
          paddingVertical: 30,
          width: width 
     },
     calBtn:{
          flexDirection:'row'
     },
     profileNumbers: {
          flexDirection: "row",
          marginBottom: 7,
          justifyContent: "space-between"
     },
});

ReportScreen.propTypes = {
     isTodayFetching : PropTypes.bool.isRequired,
     isMonthFetching : PropTypes.bool.isRequired,
     
     refreshToday: PropTypes.func.isRequired,
     refreshMonth: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default ReportScreen;