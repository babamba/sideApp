import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';
import PropTypes from "prop-types";
import { View, Text, Image, StatusBar, StyleSheet, Platform } from "react-native";
import { LinearGradient } from 'expo';
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation"
import RootNavigation from "../../navigation/RootNavigation"
import EnterSalaryNavigation from "../../navigation/EnterSalaryNavigation"
import { AsyncStorage } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import Expo , {Constants } from "expo"

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
   const optionalConfigObject = {
     title: 'Authentication Required', // Android
     imageColor: '#e00606', // Android
     imageErrorColor: '#ff0000', // Android
     sensorDescription: 'Touch sensor', // Android
     sensorErrorDescription: 'Failed', // Android
     cancelText: 'Cancel', // Android
     fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
     unifiedErrors: false, // use unified error messages (default false)
     passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
   };
class AppContainer extends Component {

     constructor(props){
          super(props);
          //console.log(props)
          this.state = {
               showRealApp : false,
               AppRefreash: false,
               compatible: false,
               fingerprints: false,
               result: ''
          };
     }

     // static propTypes = {
     //      isLoggedIn: PropTypes.bool.isRequired
     //      //initApp : PropTypes.func.isRequired
     // }

     componentWillMount = async() => {

          const { isLoggedIn , initApp, isSetData } = this.props;
          const showRealApp = await AsyncStorage.getItem("already");

          if(isLoggedIn, isSetData){
               await initApp();
          }
          
          const value = await AsyncStorage.getItem("already");
          console.log("value" , value)

          if(value == null){
               await this.setState({showRealApp: false});
          }else{
               await this.setState({showRealApp: true});
          }

          //if(showRealApp && isLoggedIn && isSetData){
               //console.log("()()()()()() chkeck hardware async : ")
               // await this.checkDeviceForHardware();
               // await this.checkForFingerprints();
          //}
     }

     componentDidMount = async() => {
          const { isLoggedIn, isSetData } = this.props;
          console.log("()()()()()() chkeck hardware async : ")
          
          console.log(isLoggedIn)
          console.log(isSetData)

          // TouchID.authenticate('to demo this react-native component', optionalConfigObject)
          // .then(success => {
          // // Success code
          //      console.log("success")
          // })
          // .catch(error => {
          // // Failure code
          //      console.log("error : ", error)
          // });

          Expo.Fingerprint.hasHardwareAsync().then(success => {
               // Device supports Touchid/Faceid
               Expo.Fingerprint.authenticateAsync("Prompted message").then(success => {
                  if (success.success === true) {
                    // authenticate successfully
                  } else {
                    console.log("false ?");
                    // failed to authenticate
                  }
               }).catch(error => {
                  // if user was unable to anthenticate too many times, he may end up here
                  console.log(error);
               });
             }).catch(error => {
               console.log(error);
             });

          // const fingerprintSupport = await this.checkDeviceForHardware();
          // this.setState({
          //      fingerprintSupport
          // })
          //console.log("fingerprintSupport : ", fingerprintSupport)

          // if (this.state.fingerprintSupport){
               
          //      await this.scanFinger();
          // }
     }

     // async scanFinger() {
     //      //this.setState({ waitingFingerprint: true });
    
     //            let result = await Expo.Fingerprint.authenticateAsync('Waiting for TouchID');
                
     //            console.log("result : ", result)
     //            if (result.success) {
     //                ToastAndroid.show('Success !', ToastAndroid.SHORT);
     //                this.setState({ waitingFingerprint: false });
     //                this.props.navigation.navigate('App');
     //            }else {
     //                ToastAndroid.show('Echec de l\'authentification !', ToastAndroid.SHORT);
     //                this.setState({fingerprintFailedMsg: 'Unknown', waitingFingerprint: false,});
     //                // await this.scanFinger();
     //        }
     //    }
    

     // handleLoginPress = () => {
     //      if (Platform.OS === 'android') {
     //        this.showAndroidAlert();
     //      } else {
     //        this.scanBiometrics();
     //      }
     // };

     // checkForFingerprints = async () => {
     //      let fingerprints = await Expo.Fingerprint.isEnrolledAsync();
     //      this.setState({fingerprints})

     //      if (!biometricRecords) {
     //           this.dropdown.alertWithType(
     //                'warn',
     //                'No Biometrics Found',
     //                'Please ensure you have set up biometrics in your OS settings.'
     //           );
     //      } else {
     //           this.handleLoginPress();
     //      }
     // };

     // checkDeviceForHardware = async() => {
     //      let compatible = await Expo.Fingerprint.hasHardwareAsync();
     //      console.log("()()()()()()()() fingerPrint : " , compatible)
     //      this.setState({ compatible });
     //      if (!compatible) {
     //           this.showIncompatibleAlert();
     //      }
     // };

     // showIncompatibleAlert = () => {
     //      this.dropdown.alertWithType(
     //        'error',
     //        'Incompatible Device',
     //        'Current device does not have the necessary hardware to use this API.'
     //      );
     // };

     render(){
          const { isLoggedIn, profile, isSetData , logOut} = this.props;
          console.log("1231@#!@#!@#!@ isLogged / " , isLoggedIn);
          console.log("1231@#!@#!@#!@ profile / " , profile);
          console.log("1231@#!@#!@#!@ isSetData / " , isSetData);

          //앱 최초시작 후 
          if (this.state.showRealApp) {
               
               //월급 정보를 저장했으면 
               if(isLoggedIn && profile){
                    return (
                         <View style={styles.container} >
                              <StatusBar hidden={false}/>
                              { isSetData ? (
                                   <RootNavigation screenProps = {{username: profile.username ,isLoggedIn, logOut}} /> 
                              ) : (
                                   <EnterSalaryNavigation />
                              )}
                         </View>
                    );
               //월급 정보를 저장안헀으면
               }else{
                    return (
                         <View style={styles.container} >
                                   <StatusBar hidden={false}/>
                                   <LoggedOutNavigation />
                         </View>
                    )
               }
               

          // 앱 최초시작 전
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

          
          // if (this.state.showRealApp) {
          //      if(isSetData){
          //           return (
          //                <View style={styles.container} >
          //                     <StatusBar hidden={false}/>
          //                     {isLoggedIn && profile ? ( 
          //                          <RootNavigation screenProps = {{username: profile.username}} />
          //                               ) : ( 
          //                          <LoggedOutNavigation/> )
          //                     }
          //                </View>
          //              );
          //      }else{
          //           return (
          //                <View style={styles.container} >
          //                     <StatusBar hidden={false}/>
          //                          <EnterSalaryNavigation  />
          //                </View>
          //           )
          //                //
          //      }
               
          // }else{
          //      return (
          //           <AppIntroSlider
          //             slides={slide}
          //             renderItem={this._renderItem}
          //          //    bottomButton
          //             showPrevButton
          //             showSkipButton
          //             onDone={this._onDone}
          //             activeDotStyle={{backgroundColor:'black'}}
          //             buttonTextStyle={{color:'black'}}
          //             // hideNextButton
          //             // hideDoneButton
          //             // onSkip={() => console.log("skipped")}
          //           />
          //      );
          // }
     }
     
     _refresh = () => {
          //const { getNotifications } = this.props;
         
          const { getDataIncreaseMonth } = this.props;
          getDataIncreaseMonth(moment().format("YYYYMMDD"));

           this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
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

AppContainer.propTypes = {
     isLoggedIn : PropTypes.bool,
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