import React from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const MenuButton = props => (
     <TouchableWithoutFeedback onPressOut={props.onPress}>
          <View style={styles.container}>
               <Ionicons name={props.iconName} color={"black"} size={30} onPressOut={props.onPress}/>
          </View>
     </TouchableWithoutFeedback>
)

MenuButton.propTypes = {
     onPress : PropTypes.func.isRequired,
     iconName : PropTypes.string.isRequired
};

const styles = StyleSheet.create({
     container : {
          paddingHorizontal: 15,
          paddingVertical: 15,
     }
});

export default MenuButton;
