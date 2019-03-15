import React, {Component} from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Button } from "react-native";
import { SafeAreaView, DrawerItems, withNavigation} from "react-navigation";

close = (props) => {
     console.log("closesesese" , props);
     props.navigation.pop();

     props.navigation.navigate('LOGIN', {
          jumpLogin: true,
     });
}

const LogoutButton = props => (
     <View style={{flex:1}}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          {props.screenProps.isLoggedIn ? ( 
                    <Button title="로그아웃" 
                              onPress={async() => {
                                   await props.logOut()
                                   //await props.resetData()
                                   //console.log("reset && logout ")
                              }
                         }
                    />
                              ) : ( 
                    <Button title="로그인" onPress={() => this.close(props)} />   
               )}     
          
          </SafeAreaView>
     </View>
)



     //props.navigation.navigate('LogIn')
// LogoutButton.propTypes = {
//      isFetching : PropTypes.bool.isRequired,
//      //refresh: PropTypes.func.isRequired,
//      //feed : PropTypes.array
// }

const styles = StyleSheet.create({

});



export default withNavigation(LogoutButton);