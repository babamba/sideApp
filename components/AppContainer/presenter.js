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
       title: '한달에 \n한번 \n돌아오는 \n급여를 \n확인하세요',
       colors: ['#FFFFFF'],
     },
     {
       key: 'somethun1',
       title: '한번 \n등록하면 \n쉽게 \n볼수있다.',
       colors: ['#FFFFFF'],
     },
     {
       key: 'somethun2',
       title: '오늘의\n월급에\n관심을\n기울여보자',
       colors: ['#FFFFFF'],
     },
   ];

class AppContainer extends Component {

     constructor(props){
          super(props);
          //console.log(props)
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
          //console.log("isLogged / " , isLoggedIn);
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
                      activeDotStyle={{backgroundColor:'black'}}
                      buttonTextStyle={{color:'black'}}
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
          <View
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
          //   start={{ x: 0, y: 0.1 }}
          //   end={{ x: 0.1, y: 1 }}
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
          </View>
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
          fontSize: 45,
          fontFamily: 'NanumBarunGothicUltraLight',
          color: 'black',
          backgroundColor: 'transparent',
          textAlign: 'left',
          marginBottom: 16,
     },
})

export default AppContainer;