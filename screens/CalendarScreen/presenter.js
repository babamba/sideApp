import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import MenuButton from "../../components/MenuButton"
import { ifIphoneX } from 'react-native-iphone-x-helper'

import Calendar from "../../components/Calendar"

const CalendarScreen = props => (
    <View style={styles.container}>
          <View style={styles.menuButtonArea} >
               <MenuButton iconName={"md-menu"}  
                    onPress={() => console.log(props.navigation.toggleDrawer('Side'))}
               />
          </View>
          <Text>CalendarScreen</Text>
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
        },
});

CalendarScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default CalendarScreen;