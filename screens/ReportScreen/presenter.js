import React from "react";
import PropTypes from "prop-types";
import { Modal,View, Text,Button, FlatList, ScrollView, RefreshControl, StyleSheet,TouchableOpacity } from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper'
import ReportListItem from "../../components/ReportListItem"
import CalendarScreen from "../CalendarScreen"
import { Ionicons } from '@expo/vector-icons';

const ReportScreen = props => (
    <View style={styles.container}>
          <View style={styles.header}> 
               <View style={{flex:1, alignSelf: 'flex-start'}}>
                    <Text>ReportScreen Today</Text>
               </View>
               <View style={{flex:1, alignSelf:'flex-end'}}>
                    <TouchableOpacity onPress={props.setModalVisibleCalendar} style={styles.calBtn}>
                         <Ionicons name="md-calendar" size={18}/>
                         <Text>달력으로 보기</Text>
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
          <FlatList
               data={props.TodayReportData}
               renderItem={({item}) => 
                    <ReportListItem {...item}/>
               }
               keyExtractor={(item, index) => item.enrollId.toString()}
               refreshing ={props.isTodayFetching}
               onRefresh ={props.refreshToday}
          />
          <Text>ReportScreen Month</Text>
          <FlatList
               data={props.MonthReportData}
               renderItem={({item}) => 
                    <ReportListItem {...item}/>
               }
               keyExtractor={(item, index) => item.enrollId.toString()}
               refreshing ={props.isMonthFetching}
               onRefresh ={props.refreshMonth}
          />
    </View>
    
    
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          ...ifIphoneX({paddingTop: 50}, {paddingTop: 30}),
          backgroundColor: "white"
     },
     header:{
          flexDirection:"row",
          alignContent: 'center',
     },
     calBtn:{
          flexDirection:'row'
     }
});

ReportScreen.propTypes = {
     isTodayFetching : PropTypes.bool.isRequired,
     isMonthFetching : PropTypes.bool.isRequired,
     
     refreshToday: PropTypes.func.isRequired,
     refreshMonth: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default ReportScreen;