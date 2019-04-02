import React from "react";
import PropTypes from "prop-types";
import { Modal,View, Text, FlatList, StyleSheet,TouchableOpacity,Dimensions } from "react-native";
import ReportListItemToday from "../../components/ReportTodayListItem"
import ReportListItemMonth from "../../components/ReportMonthListItem"
import CalendarScreen from "../CalendarScreen"

import ReportConut from "../../components/ReportCount"

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get("window");
const ReportScreen = props => (
     
    <View style={styles.container}>
          <View style={styles.headerMain}> 
               
               {props.mode === "today" ? 
                    <Text style={styles.headerText}>
                         오늘의 통계
                    </Text>
                    :
                    <Text style={styles.headerText}>이번달 통계</Text>
               }
         
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
                              onRequestClose={() => {
                                   Alert.alert('Modal has been closed.');
                              }}
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
               
               {props.mode === "today" ? 
                    <View style={styles.profileNumbers}>
                         <ReportConut
                              number={props.ReportIncreaseTodayPrice}
                              text={"수입"}
                              type="today"
                         />
                         <ReportConut
                              number={props.ReportMealTodayPrice}
                              text={"밥값"}
                              type="today"
                         />
                         <ReportConut
                              number={props.ReportPurchaseTodayPrice}
                              text={"소비"}
                              type="today"
                         />
                    </View>
               :
                    <View style={styles.profileNumbers}>
                         <ReportConut
                              number={props.ReportIncreaseMonthPrice}
                              text={"수입"}
                              type="month"
                         />
                         <ReportConut
                              number={props.ReportMealMonthPrice}
                              text={"밥값"}
                              type="month"
                         />
                         <ReportConut
                              number={props.ReportPurchaseMonthPrice}
                              text={"소비"}
                              type="month"
                         />
                    </View>
               }
          </View>
          <View style={styles.modeBar}>
               <TouchableOpacity onPressOut={props.changeToToday}>
                    <View style={styles.modeIcon}>
                         <MaterialCommunityIcons
                              name={"view-agenda"}
                              size={28}
                              color={props.mode === "today" ? "#3e99ee" : "grey"}
                              style={{paddingTop:3 , paddingBottom: 3,}}
                         />
                         <Text style={{paddingTop:3 , paddingBottom: 3,}} >오늘</Text>
                    </View>
               </TouchableOpacity>
               <TouchableOpacity onPressOut={props.changeToMonth}>
                    <View style={styles.modeIcon}>
                         <MaterialCommunityIcons
                              name={"view-week"}
                              size={28}
                              color={props.mode === "month" ? "#3e99ee" : "grey"}
                              style={{paddingTop:3 , paddingBottom: 3,}}
                         />
                         <Text 
                               style={{paddingTop:3 , paddingBottom: 3,}}
                         >월급달</Text>
                    </View>
               </TouchableOpacity>
          </View>

         
          <View style={styles.listContainer} > 
          {props.mode === "today" && (
               <FlatList
                    data={props.TodayReportData}
                    renderItem={({item}) => 
                         <ReportListItemToday {...item}/>
                    }
                    keyExtractor={(item, index) => item.enrollId.toString()}
                    refreshing ={props.isTodayFetching}
                    onRefresh ={props.refreshToday}
               />
          )}

          {props.mode === "month" && (
               <FlatList
                    data={props.MonthReportData}
                    renderItem={({item}) => 
                         <ReportListItemMonth {...item}/>
                    }
                    keyExtractor={(item, index) => item.enrollId.toString()}
                    refreshing ={props.isMonthFetching}
                    onRefresh ={props.refreshMonth}
               />
          )}

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
          backgroundColor: "white"
     },
     listContainer: {
          flex:1,
         marginBottom: 0,
         marginTop: 0,
         borderTopWidth: 0,
         paddingHorizontal: 10,
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
          paddingVertical: 20,
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
     modeBar: {
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          borderColor: "#bbb",
          borderWidth: StyleSheet.hairlineWidth,
          paddingVertical:8
     },
     modeIcon: {
          width: width / 2,
          alignItems: "center"
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