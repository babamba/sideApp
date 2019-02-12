import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation"
import RootNavigation from "../../navigation/RootNavigation"

class AppContainer extends Component {
     
     static propTypes = {
          isLoggedIn: PropTypes.bool.isRequired,
          //initApp : PropTypes.func.isRequired
     }
     
     async componentDidMount() {
          const { isLoggedIn } = this.props;
          // if(isLoggedIn){
          //      await initApp()
          // }
     }

     render(){
          const { isLoggedIn } = this.props;
          return (
          <View style={styles.container} >
               <StatusBar hidden={false}/>
               {isLoggedIn && profile ? ( 
                    <RootNavigation screenProps = {{username: "test "}} />
                    ) : ( 
                    <LoggedOutNavigation/> )
               }
          </View>
          );
     }
}

const styles = StyleSheet.create({
     container : {
        flex: 1,
        backgroundColor: '#fff',
     }
})

export default AppContainer;