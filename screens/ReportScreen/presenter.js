import React from "react";
import PropTypes from "prop-types";
import { View, Text,Button, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import MenuButton from "../../components/MenuButton"

const ReportScreen = props => (

     
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
          <View style={styles.menuButtonArea} >
               <MenuButton iconName={"md-menu"}  
                    onPress={() => console.log(props.navigation.toggleDrawer('Side'))}
               />
          </View>
          <Text>ReportScreen</Text>
          {/* {props.feed && 
               props.feed.map(photo => <Photo {...photo} key={photo.id} />)} */}
    </View>
    
    </ScrollView>
);

const styles = StyleSheet.create({
     container : {
          flex:1,
          backgroundColor: "white"
     },
     menuButtonArea:{
     },
});

ReportScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default ReportScreen;