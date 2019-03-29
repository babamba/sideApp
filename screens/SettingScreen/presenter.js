import React from "react";
import PropTypes from "prop-types";
import { View, Text,Button, Modal, FlatList, Switch, ScrollView, RefreshControl, StyleSheet } from "react-native";
import MenuButton from "../../components/MenuButton"
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { Ionicons } from "@expo/vector-icons"
import { ListItem } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import Icon from '../../components/Profile/Icon'

import FirstStepScreen from '../FirstStepScreen';


const SettingScreen = props => (
     <View style={styles.listContainer}>
          {/* <View style={styles.menuButtonArea} >
                    
          </View> */}
          <ScrollView style={styles.scroll}> 
               <View style={styles.userRow}>
               {/* <View style={styles.userImage}>
                    <Avatar
                         large
                         rounded
                         source={{
                         uri: avatar,
                         }}
                    />
               </View> */}
                    <View style={styles.menuButtonArea}>
                         <View style={styles.name}>
                              <Text>Hello {props.username} </Text>
                         </View>     
                         {/* <View style={styles.closeIcon}>
                              <Ionicons  name={"md-close"} size={30}  
                                   //onPress={() => console.log(props.navigation.toggleDrawer('Side'))}
                                   onPress={props.setModalVisible}
                              />
                         </View> */}
                         {/* <Text
                         style={{
                         color: 'gray',
                         fontSize: 16,
                         }}
                         >
                         {firstEmail.email}
                         </Text> */}
                    </View>
               </View>

               <View style={styles.container}>
               <Text style={styles.infoText}>Account</Text>
               </View>


               <ListItem
                    switchButton
                    Component={TouchableScale}
                    friction={70} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    hideChevron
                    title="Push Notifications"
                    onPress={props.pushTest}
                    switched={props.pushNotifications}
                    onSwitch={props.onChangePushNotifications}
                    containerStyle={styles.listItemContainer}
                    leftIcon={
                    <Icon
                         containerStyle={{
                         backgroundColor: '#FFADF2',
                         }}
                         icon={{
                         type: 'material',
                         name: 'notifications',
                         }}
                    />
                    }
               />
               <ListItem
                    title="기본정보 설정"
                    rightTitle=""
                    // onPress={() => this.onPressOptions()}
                    onPress={props.toggleModalVisibleSalaryForm}
                    containerStyle={styles.listItemContainer}
                    Component={TouchableScale}
                    friction={70} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    leftIcon={
                    <Icon
                         containerStyle={{ backgroundColor: '#FAD291' }}
                         icon={{
                         type: 'font-awesome',
                         name: 'money',
                         }}
                    />
                    }
               />

               <ListItem
                    title="touchId"
                    rightTitle={<Switch 
                         onValueChange = {props.toggleSwitch}
                         value = {props.switchValue}
                    />}
                    // onPress={() => this.onPressOptions()}
                    onPress={props.toggleModalVisibleSalaryForm}
                    containerStyle={styles.listItemContainer}
                    Component={TouchableScale}
                    friction={70} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    leftIcon={
                    <Icon
                         containerStyle={{ backgroundColor: '#FAD291' }}
                         icon={{
                         type: 'font-awesome',
                         name: 'money',
                         }}
                    />
                    }
               />

               <ListItem
                    title="통계?"
                    rightTitle=""
                    // onPress={() => this.onPressOptions()}
                    containerStyle={styles.listItemContainer}
                    leftIcon={
                    <Icon
                         containerStyle={{ backgroundColor: '#FEA8A1' }}
                         icon={{
                         type: 'material',
                         name: 'language',
                         }}
                    />
                    }
               />
               <View style={styles.InfoContainer}>
               <Text style={styles.infoText}>more</Text>
               </View>

               <ListItem
                    title="문의하기"
                    rightTitle=""
                    // onPress={() => this.onPressOptions()}
                    containerStyle={styles.listItemContainer}
                    leftIcon={
                    <Icon
                         containerStyle={{ backgroundColor: '#FEA8A1' }}
                         icon={{
                         type: 'material',
                         name: 'language',
                         }}
                    />
                    }
               />

               <ListItem
                    title= "로그아웃"
                    // onPress={() => this.onPressOptions()}
                    containerStyle={styles.listItemContainer}
                    Component={TouchableScale}
                    friction={70} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //
                    onPress={props.logout}
                    leftIcon={
                    <Icon
                         containerStyle={{ backgroundColor: '#57DCE7' }}
                         icon={{
                         type: 'material',
                         name: 'place',
                         }}
                    />
                    }
               />

               {/* <ListItem
               title="About US"
               // onPress={() => this.onPressOptions()}
               containerStyle={styles.listItemContainer}
               leftIcon={
                    <Icon
                    containerStyle={{ backgroundColor: '#A4C8F0' }}
                    icon={{
                         type: 'ionicon',
                         name: 'md-information-circle',
                    }}
                    />
               }
               />
               <ListItem
               title="Terms and Policies"
               // onPress={() => this.onPressOptions()}
               containerStyle={styles.listItemContainer}
               leftIcon={
                    <Icon
                    containerStyle={{ backgroundColor: '#C6C7C6' }}
                    icon={{
                         type: 'entypo',
                         name: 'light-bulb',
                    }}
                    />
               }
               />
               <ListItem
               title="Share our App"
               //     onPress={() => this.onPressOptions()}
               containerStyle={styles.listItemContainer}
               leftIcon={
                    <Icon
                    containerStyle={{
                         backgroundColor: '#C47EFF',
                    }}
                    icon={{
                         type: 'entypo',
                         name: 'share',
                    }}
                    />
               }
               />
               <ListItem
               title="Rate Us"
               // onPress={() => this.onPressOptions()}
               containerStyle={styles.listItemContainer}
               leftIcon={
                    <Icon
                    containerStyle={{
                         backgroundColor: '#FECE44',
                    }}
                    icon={{
                         type: 'entypo',
                         name: 'star',
                    }}
                    />
               }
               />
               <ListItem
               title="Send FeedBack"
               // onPress={() => this.onPressOptions()}
               containerStyle={styles.listItemContainer}
               leftIcon={
                    <Icon
                    containerStyle={{
                         backgroundColor: '#00C001',
                    }}
                    icon={{
                         type: 'materialicon',
                         name: 'feedback',
                    }}
                    />
               }
               /> */}

          </ScrollView>


               <View style={{marginTop: 22}}>
                    <Modal
                         animationType="slide"
                         transparent={false}
                         visible={props.modalVisibleSalaryForm}
                         transparent={true}
                         hardwareAccelerated
                         onRequestClose={() => {
                         Alert.alert('Modal has been closed.');
                    }}>
                         <View style={{flex:1}}>
                              <FirstStepScreen 
                                   {...props}
                                   backBtn={true}
                                   setModalVisibleForm={props.toggleModalVisibleSalaryForm}
                              />
                    
                         </View>
                    </Modal>
               </View>
        </View>
);

const styles = StyleSheet.create({
     scroll: {
       backgroundColor: 'white',
     },
     userRow: {
       alignItems: 'center',
       flexDirection: 'row',
       paddingBottom: 6,
       paddingLeft: 15,
       paddingRight: 15,
       paddingTop: 6,
     },
     userImage: {
       marginRight: 12,
     },
     listContainer: {
        ...ifIphoneX({paddingTop: 50}, {paddingTop: 30}),
        flex:1,
       marginBottom: 0,
       marginTop: 0,
       borderTopWidth: 0,
     },
     menuButtonArea:{
        flexDirection:'row',
        
      },
      name:{
        flex:1,
        fontSize: 22,
        fontFamily: 'NanumBarunGothicUltraLight',
        alignItems: 'flex-start',
        alignContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
      },
      closeIcon:{
        flex:1,
        alignItems: 'flex-end',
      },
     listItemContainer: {
       borderBottomColor: '#ECECEC',
     },
     InfoContainer: {
       paddingTop: 20,
       paddingBottom: 12,
       backgroundColor: '#F4F5F4',
     },
     infoText: {
       fontSize: 16,
       marginLeft: 20,
       color: 'gray',
       fontWeight: '500',
     },
   });

export default SettingScreen;