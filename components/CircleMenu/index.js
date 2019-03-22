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
     Text,
     Dimensions
} from 'react-native';

const {width, height} = Dimensions.get("window");

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
          buttonColor="rgba(255, 255, 255,1)"
          position={"right"}
          size={48}
          verticalOrientation={"down"}
          backdrop={true}
          offsetX={0}
          spacing={26}
          btnOutRange={'transparent'}
          outRangeScale={1.5}
          backgroundTappable={true}
          buttonTextStyle={{fontSize:20}}
          hideShadow={true}
          renderIcon={ () => <Ionicons name="md-settings" size={38} color={'grey'}/>}
        >
               <ActionButton.Item 
                    buttonColor='#9b59b6' 
                    title="달력보기" 
                    spaceBetween={-26}
                    textContainerStyle={{marginTop:34}}
                    onPress={() => {
                         this.setModalVisibleCalendar();
                    }
               }>
               <Ionicons name="md-calendar" style={styles.actionButtonIcon} />
               </ActionButton.Item>

               <ActionButton.Item 
                    buttonColor='#3498db' 
                    title="설정" 
                    spaceBetween={-26}
                    textContainerStyle={{marginTop:34}}
                    onPress={() => {
                         this.setModalVisibleSetting();
                    }
               }>
               <Ionicons name="md-settings" style={styles.actionButtonIcon} />
               </ActionButton.Item>

               <ActionButton.Item 
                    buttonColor='#1abc9c' 
                    title="닫기" 
                    spaceBetween={-26}
                    textContainerStyle={{marginTop:34}}
                    onPress={() => {}
               }>
               <Ionicons name="md-close" style={styles.actionButtonIcon} />
               </ActionButton.Item>
        </ActionButton>

          <View>
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


          <View>
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
          flex:1,
          marginRight:70,
     },
     actionButtonIcon: {
          fontSize: 20,
          color: 'white',
     },
});

export default withNavigation(CircleMenu);