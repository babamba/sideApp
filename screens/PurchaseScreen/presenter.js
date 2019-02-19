import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";


const PurchaseScreen = props => (
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
          <Text>PurchaseScreen</Text>
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

PurchaseScreen.propTypes = {
     isFetching : PropTypes.bool.isRequired,
     refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

export default PurchaseScreen;