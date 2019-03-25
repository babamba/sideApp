import React from "react";
import PropTypes from "prop-types";
import { ListItem } from 'react-native-elements'
import { StyleSheet, View, Text } from "react-native";
import Icon from '../../components/Profile/Icon'


const ReportListItem = props => (
    <ListItem
      containerStyle={styles.listItemContainer}
      title={props.income_name}
      titleStyle={styles.title}
      rightTitle={
          <View style={styles.list}>
               <Text style={styles.price}>{props.price} 원</Text>
               {props.feeling === "1" ?
                    <Text style={styles.feel}>좋아!</Text>
               : null}
               {props.feeling === "2" ?
                    <Text style={styles.feel}>쏘쏘?</Text>
               : null}
               {props.feeling === "3" ?
                    <Text style={styles.feel}>후회중..</Text>
               : null}
          </View>
      }

      leftIcon={
          <Icon
               containerStyle={{ backgroundColor: '#57DCE7' }}
               icon={{ type: 'material', name: 'place' }}
          /> 
      }
      
     //  leftAvatar={{ source: require('../images/avatar1.jpg') }}
    />
          // {/* <View style={styles.list}>
          //      <Text style={styles.name}>{props.income_name}</Text>
          //      <Text style={styles.price}>{props.price}</Text>
          //      {item.feeling === "1" ?
          //           <Text style={styles.feel}>좋아!</Text>
          //      : null}
          //      {item.feeling === "2" ?
          //           <Text style={styles.feel}>쏘쏘?</Text>
          //      : null}
          //      {item.feeling === "3" ?
          //           <Text style={styles.feel}>후회중..</Text>
          //      : null}
          // </View> */}
     //</ListItem>
)

ReportListItem.propTypes = {
     //isFetching : PropTypes.bool.isRequired,
     //refresh: PropTypes.func.isRequired,
     //feed : PropTypes.array
}

const styles = StyleSheet.create({
     list: {
          flexDirection: 'row',
          padding:6
     },
     listItemContainer: {
          borderBottomColor: '#ECECEC',
     },
     title:{
          alignItems:"flex-start",
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
     },
     name:{
          alignItems:"flex-start",
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
          paddingRight:18,
          
     },
     price:{
          paddingTop:1,
          alignItems:'flex-start',
          paddingRight:18,
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
     },
     feel:{
          alignItems:'flex-start',
          fontSize:14,
          textAlign:'left',
          fontFamily: 'NanumBarunGothic',
          paddingLeft:30
     },
});



export default ReportListItem;