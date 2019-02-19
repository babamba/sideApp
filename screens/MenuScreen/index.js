import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import { DrawerActions } from 'react-navigation';

class MenuScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    console.log(NavigationActions)
    console.log()
    //this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {
    return (
      <View>
        <ScrollView>
          <View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Today')}>
              Today
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Analysis')}>
              Analysis
              </Text>
            </View>
            <View style={styles.menuItem}>
              <Text onPress={this.navigateToScreen('Report')}>
              Report
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  heading: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  menuItem:{
      padding: 10,
      borderWidth: 0.5,
      borderColor: '#d6d7da'
  }
});


MenuScreen.propTypes = {
  navigation: PropTypes.object
};

export default MenuScreen;
