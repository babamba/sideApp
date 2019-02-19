import React, {Component} from "react";
import PropTypes from "prop-types";
import { TouchableOpacity,TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { withNavigation } from "react-navigation";
import Modal from "react-native-modal";

class AddButton extends Component {
     constructor(props){
          super(props);
          console.log(props)
     }

     state = {
          isModalVisible: false
     };
       
     _toggleModal = () => {
          console.log("_toggleModal")
          this.setState({ isModalVisible: !this.state.isModalVisible });
     }
          
     
     render(){
          console.log(this.props);
          return (
               <View>
                    <TouchableHighlight 
                    activeOpacity={0.4} 
                    onPress={this._toggleModal}
                    style={styles.button}
               >
                    <View>
                         <Text style={styles.text}>
                              {this.props.AddText}
                         </Text>
                    </View>
               </TouchableHighlight>

               </View>
               
          )
     }
}

AddButton.propTypes = {
     onPress : PropTypes.func.isRequired,
     AddText : PropTypes.string.isRequired
     //iconName : PropTypes.string.isRequired
};

const styles = StyleSheet.create({
     container : {
          flex:1,
          width:100,
          height:100,
          paddingHorizontal: 10,
     },
     button:{
          width:92,
          height:34,
          backgroundColor:"#99F089",
          padding:8,
          margin:10,
          borderRadius: 25,
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
          elevation: 1,
     },
     text:{
          fontSize:17,
          color:"white",
          fontWeight:'900',
          textAlign:'center'
     },
     bottomModal: {
          justifyContent: "flex-end",
          margin: 0,
     },
});

export default withNavigation(AddButton);
