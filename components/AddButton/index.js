import React, {Component} from "react";
import PropTypes from "prop-types";
import { TouchableOpacity,TouchableHighlight, View, StyleSheet, Text ,ScrollView , Dimensions} from "react-native";
import { withNavigation } from "react-navigation";
import Modal from "react-native-modal";
import IncreaseScreen from "../../screens/IncreaseScreen";
import { ifIphoneX } from 'react-native-iphone-x-helper'

class AddButton extends Component {
     constructor(props){
          super(props);
          //console.log(props)
     }

     state = {
          isModalVisible: false
     };
       
     _toggleModal = () => {
          console.log("_toggleModal")
          
          //const { refresh } = this.props;
          //refresh();
          this.setState({ isModalVisible: !this.state.isModalVisible });
     }

     handleOnScroll = event => {
          this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y,
          });
        };
      
     handleScrollTo = p => {
          if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
          }
     }
      
          
     
     render(){
          const { color } = this.props
          const deviceWidth = Dimensions.get("window").width;
          const deviceHeight = Dimensions.get("window").height;

          // console.log("deviceWidth" ,deviceWidth)
          // console.log("deviceHeight" ,deviceHeight)

          //console.log(this.props);
          return (
               <View>
                    <TouchableHighlight 
                    activeOpacity={0.4} 
                    onPress={this._toggleModal}
                    style={[
                         styles.button,
                         {
                           backgroundColor: color,
                         },
                       ]}
                       
                    underlayColor={"transparent"}
                    >
                    <View>
                         <Text style={styles.text}>
                              {this.props.AddText}
                         </Text>
                    </View>
                    </TouchableHighlight>

                    <Modal 
                         isVisible={this.state.isModalVisible} 
                         deviceWidth={deviceWidth}
                         deviceHeight={deviceHeight}
                         style={styles.bottomModal}
                         backdropColor={"grey"}
                         backdropOpacity={0.9}
                         onBackdropPress={() => this.setState({ isModalVisible: false })}
                         onBackButtonPress={() => this.setState({ isModalVisible: false })}
                         onSwipe={() => this.setState({ isModalVisible: false })}
                         swipeDirection="down"
                         onSwipeComplete={() => this.setState({ isModalVisible: false })}
                         swipeThreshold={10}
                    >

                    <View style={styles.modalContent}>
                         <TouchableHighlight >
                                   <IncreaseScreen toggleModal={this._toggleModal}  />
                         </TouchableHighlight>
                    </View>
                    </Modal>
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
     modalContent: {
          backgroundColor: "white",
          ...ifIphoneX({top:200}, {top: 90}),
          //paddingBottom: 420,
          
          padding: 22,
          paddingTop:0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 22,
          borderColor: "rgba(0, 0, 0, 0.1)",
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 7,
          elevation: 1,
     },
     bottomModal: {
          justifyContent: "flex-end",
          height: 700,
          borderRadius: 4,
          margin: 0,
     },
});

export default withNavigation(AddButton);
