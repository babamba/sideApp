import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { ifIphoneX } from 'react-native-iphone-x-helper'

const MonthScreen = props => (
     <ScrollView
          refreshControl = {
               <RefreshControl 
                    refreshing ={props.isFetching} 
                    onRefresh={props.refresh}
                    tintColor={"black"}
               />
          }
          // contentContainerStyle = {styles.container}
    >
    <View style={styles.container}>
          <Text>MonthScreen</Text>
          {/* {props.feed && 
               props.feed.map(photo => <Photo {...photo} key={photo.id} />)} */}
    </View>
    
    </ScrollView>
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          ...ifIphoneX({paddingTop: 120}, {paddingTop: 20}),
          backgroundColor: "white"
     }
});

MonthScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default MonthScreen;