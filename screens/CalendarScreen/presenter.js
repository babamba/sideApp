import React from "react";
import PropTypes from "prop-types";
import { View, Text, Button, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import MenuButton from "../../components/MenuButton"
import { ifIphoneX } from 'react-native-iphone-x-helper'

import Calendar from "../../components/Calendar"
import Ionicons from "@expo/vector-icons/Ionicons";

const CalendarScreen = props => (
    <View style={styles.container}>
     
          <View style={styles.menuButtonArea} >
               <Ionicons name={"md-close"} size={30}  
                    //onPress={() => console.log(props.navigation.toggleDrawer('Side'))}
                    onPress={props.setModalVisible}
               />
          </View>
          
          <Calendar {...props} />
    </View>
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          backgroundColor: "white"
     },
     menuButtonArea:{
          ...ifIphoneX({paddingTop: 50}, {paddingTop: 30}),
          paddingHorizontal: 15,
          alignSelf: 'flex-end',
     },
});

CalendarScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default CalendarScreen;