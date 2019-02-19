import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';
import PropTypes from "prop-types";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import { LinearGradient } from 'expo';
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation"
import RootNavigation from "../../navigation/RootNavigation"
import { AsyncStorage } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';

const slide = [
     {
       key: 'somethun',
       title: 'Quick setup, good defaults',
       text:
         'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
       icon: 'ios-images',
       colors: ['#63E2FF', '#B066FE'],
     },
     {
       key: 'somethun1',
       title: 'Super customizable',
       text:
         'The component is also super customizable, so you can adapt it to cover your needs and wants.',
       icon: 'ios-options',
       colors: ['#A3A1FF', '#3A3897'],
     },
     {
       key: 'somethun2',
       title: 'No need to buy me beer',
       text: 'Usage is all free',
       icon: 'ios-beer',
       colors: ['#29ABE2', '#4F00BC'],
     },
   ];

class AppContainer extends Component {

     constructor(props){
          super(props);
          console.log(props)
          this.state = {
               showRealApp : false
          };
     }

     static propTypes = {
          isLoggedIn: PropTypes.bool.isRequired
          //initApp : PropTypes.func.isRequired
     }

     async componentWillMount() {
          
          const value = await AsyncStorage.getItem("already");
          console.log("value" , value)
          if(value == null){
               this.setState({showRealApp: false});
          }else{
                this.setState({showRealApp: true});
          }
     }

     async componentDidMount() {
          const { isLoggedIn } = this.props;
          // if(isLoggedIn){
          //      await initApp()
          // }
     }

     render(){
          const { isLoggedIn, profile } = this.props;
          console.log("isLogged / " , isLoggedIn);
          console.log("isLogged / " , isLoggedIn);
          if (this.state.showRealApp) {
               return (
                    <View style={styles.container} >
                         <StatusBar hidden={false}/>
                         {isLoggedIn && profile ? ( 
                         <RootNavigation screenProps = {{username: profile.username}} />
                              ) : ( 
                         <LoggedOutNavigation/> )
                         }
                    </View>
                  );
          }else{
               return (
                    <AppIntroSlider
                      slides={slide}
                      renderItem={this._renderItem}
                   //    bottomButton
                      showPrevButton
                      showSkipButton
                      onDone={this._onDone} 
                      // hideNextButton
                      // hideDoneButton
                      // onSkip={() => console.log("skipped")}
                    />
               );
          }
     }

     _onDone = () => {
          const { setAlreadyLaunch } = this.props;
          // After user finished the intro slides. Show real app through
          // navigation or simply by controlling state
          setAlreadyLaunch(true);
          this.setState({ showRealApp: true });
     };
      _onSkip = () => {
          const { setAlreadyLaunch } = this.props;
          // After user skip the intro slides. Show real app through
          // navigation or simply by controlling state
          setAlreadyLaunch(true);
          this.setState({ showRealApp: true });
     };

     _renderItem = props => (
          <LinearGradient
            style={[
              styles.mainContent,
              {
                paddingTop: props.topSpacer,
                paddingBottom: props.bottomSpacer,
                width: props.width,
                height: props.height,
              },
            ]}
            colors={props.colors}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 0.1, y: 1 }}
          >
            <Ionicons
              style={{ backgroundColor: 'transparent' }}
              name={props.icon}
              size={200}
              color="white"
            />
            <View>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.text}>{props.text}</Text>
            </View>
          </LinearGradient>
        );
}

const styles = StyleSheet.create({
     container : {
        flex: 1,
        backgroundColor: '#fff',
     },

     mainContent: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
     },
     image: {
          width: 320,
          height: 320,
     },
     text: {
          color: 'rgba(255, 255, 255, 0.8)',
          backgroundColor: 'transparent',
          textAlign: 'center',
          paddingHorizontal: 16,
     },
     title: {
          fontSize: 22,
          color: 'white',
          backgroundColor: 'transparent',
          textAlign: 'center',
          marginBottom: 16,
     },
})

export default AppContainer;