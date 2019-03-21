import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import CalendarScreen from "../../screens/CalendarScreen"
import SettingScreen from "../../screens/SettingScreen"

import {
     Modal,
  View,
  StyleSheet,
  TouchableHighlight,
  Alert,
     Text
} from 'react-native';

class CircleMenu extends Component {

     state = {
          modalVisibleCalendar: false,
          modalVisibleSetting: false
     };

     componentDidMount(){
          console.log("asdf : " , this.props)
     }

     componentWillUnmount(){
          console.log("unmonut cir")
     }

     setModalVisibleCalendar = () => {
          const { modalVisibleCalendar } = this.state;
          console.log(modalVisibleCalendar)
          if(modalVisibleCalendar){
               this.setState({
                    modalVisibleCalendar: false
               });
          }else{
               this.setState({
                    modalVisibleCalendar: true
               });
          }    
     }

     setModalVisibleSetting = () => {
          const { modalVisibleSetting } = this.state;
          console.log(modalVisibleSetting)
          if(modalVisibleSetting){
               this.setState({
                    modalVisibleSetting: false
               });
          }else{
               this.setState({
                    modalVisibleSetting: true
               });
          }    
     }

  render() {
    return (
      <View style={styles.container}>
        {/*Rest of App come ABOVE the action button component!*/}
        <ActionButton 
          buttonColor="rgba(231,76,60,1)"
          position={"right"}
          size={40}
          verticalOrientation={"down"}
          spacing={10}
        >
          <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => {
                this.setModalVisibleCalendar();
          }}>
            <Ionicons name="md-calendar" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {
                this.setModalVisibleSetting();
          }}>
            <Ionicons name="md-settings" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Ionicons name="md-close" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

          <View style={{marginTop: 22}}>
               <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisibleCalendar}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
               }}>
                    <View style={{flex:1}}>
                    <CalendarScreen 
                         {...this.props }
                         setModalVisible={this.setModalVisibleCalendar}
                    />
                   
                    </View>
               </Modal>
          </View>


          <View style={{marginTop: 22}}>
               <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisibleSetting}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
               }}>
                    <View style={{flex:1}}>

                    <SettingScreen 
                         {...this.props}
                         setModalVisible={this.setModalVisibleSetting}
                    />
                    
                    </View>
               </Modal>
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
     container:{
          paddingRight:60,
          backgroundColor: 'transparent',
          paddingBottom:50,
          marginRight:30,
          marginTop:50
     },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default withNavigation(CircleMenu);