import React, { Component } from "react";
import { Ionicons } from '@expo/vector-icons';
import PropTypes from "prop-types";
import { AppState, View, Text, Image, StatusBar, StyleSheet, Platform, Alert } from "react-native";
import { LinearGradient } from 'expo';
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation"
import RootNavigation from "../../navigation/RootNavigation"
import EnterSalaryNavigation from "../../navigation/EnterSalaryNavigation"
import { AsyncStorage } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
// import Expo , { Constants } from "expo"
import { LocalAuthentication } from 'expo';
import moment from "moment";

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
               launched : false,
               AppRefreash: false,
               compatible: false,
               scanResult : false,
               enorollCount: 0,
               appState: AppState.currentState,
          };
     }

     // static propTypes = {
     //      isLoggedIn: PropTypes.bool.isRequired
     //      //initApp : PropTypes.func.isRequired
     // }

     componentWillMount = async() => {

          const { isLoggedIn , initApp, isSetData, launched } = this.props;
          //const showRealApp = await AsyncStorage.getItem("already");
          console.log("already ", launched);
          if(isLoggedIn, isSetData){
               await initApp(moment().format("YYYYMMDD"));
          }
          
          // const value = await AsyncStorage.getItem("already");
          // console.log("value" , value)

          // AsyncStorage.getItem("already").then((value) => {
          //      await this.setState({showRealApp: false});
          //  })

          if(launched == null){
               await this.setState({launched: false});
          }else{
               await this.setState({launched: true});
          }
          // await this.checkDeviceForHardware();
          
          console.log("componentWillMount launched : ", launched)
          console.log("AppState.currentState, ", AppState.currentState,)
          console.log("this.state.appState : " , this.state.appState)
     }

     _handleAppStateChange = (nextAppState) => {
          const { locked } = this.props;
          const { scanResult } = this.state;
          //console.log("this.state.appState : " , this.state.appState)
          //console.log(typeof this.state.appState)
          console.log("nextAppState : " , nextAppState)

          if ( this.state.appState.match(/inactive/) && nextAppState === 'active') {
               console.log('App has come to the foreground!');
               if(locked && !scanResult ){
                    this.checkDeviceForHardware();
               }

               this.setState({
                    appState: nextAppState
               });

          }else if(this.state.appState.match(/background/) && nextAppState === 'active'){
               if(locked){
                    this.checkDeviceForHardware();
               }
               
               this.setState({
                    appState: nextAppState
               });
          }else if(this.state.appState.match(/background/) && nextAppState === 'inactive'){
               if(locked){
                    this.checkDeviceForHardware();
               }
               
               this.setState({
                    appState: nextAppState
               });
          }else{
               console.log('App has come to the background!');
               this.setState({
                    appState: nextAppState,
                    scanResult : false
               });
          }
          
          // if(this.state.appState.match(/inactive|background/) && nextAppState === 'active'){
          //      this.checkDeviceForHardware();
          // }
     };

     componentDidMount = async() => {
          const { isLoggedIn, isSetData , locked} = this.props;

          const { appState } = this.state;
          await AppState.addEventListener('change', this._handleAppStateChange);
          console.log("componentDidMount", appState);

          if(locked){
               this.checkDeviceForHardware();
          }

          console.log("_#_#_#_#_#_#_#_#_# componentDidMount appState : " , appState)
          // if(appState === 'active'){
               
          // }
          
          // console.log(isLoggedIn)
          // console.log(isSetData)
          console.log("check hardware async : ")
     }

     componentWillUnmount = async() => {
          await AppState.removeEventListener('change', this._handleAppStateChange);
     }

     checkDeviceForHardware = async() => {
          let compatible = await LocalAuthentication.hasHardwareAsync()
          console.log("()()()()()()()() fingerPrint has hardware : " , compatible)
          this.setState({ compatible });
          let supportType = await LocalAuthentication.supportedAuthenticationTypesAsync()
          console.log("supportType : " , supportType)

          if (!compatible) {
               this.showIncompatibleAlert();
          }else{
               this.checkForBiometrics();
          }
     };

     checkForBiometrics = async () => {
          let biometricRecords = await LocalAuthentication.isEnrolledAsync();

          if (!biometricRecords) {
               console.log( 'warn',
               'No Biometrics Found',
               'Please ensure you have set up biometrics in your OS settings.')
          //   this.dropdown.alertWithType(
          //     'warn',
          //     'No Biometrics Found',
          //     'Please ensure you have set up biometrics in your OS settings.'
          //   );
          } else {
            this.handleLoginPress();
          }
     };

     handleLoginPress = () => {
          if (Platform.OS === 'android') {
            this.showAndroidAlert();
          } else {
            this.scanBiometrics();
          }
        };

     showIncompatibleAlert = () => {
          console.log('error',
          'Incompatible Device',
          'Current device does not have the necessary hardware to use this API.')
     };

     showAndroidAlert = () => {
          Alert.alert('Fingerprint Scan', 'Place your finger over the touch sensor.');
          this.scanBiometrics();
     };
     
     scanBiometrics = async () => {
       const { enorollCount } = this.state;
       let result = await LocalAuthentication.authenticateAsync('Biometric Scan.');

            if (result.success) {
                 console.log("finger result success")
                 await this.setState({
                      scanResult : true,
                 })
     
               } else {
                    console.log("finger result failed : " , enorollCount)
          }
       
     };

     render(){
          const { isLoggedIn, profile, isSetData , logOut, locked} = this.props;
          const { launched , compatible, scanResult } = this.state;
          console.log("!@#!@#!@#fingerPrint : " , locked)
          // console.log("1231@#!@#!@#!@ isLogged / " , isLoggedIn);
          // console.log("1231@#!@#!@#!@ profile / " , profile);
          // console.log("1231@#!@#!@#!@ isSetData / " , isSetData);

          //앱 최초시작 후 
          if (launched) {
               console.log("app state changed")
               if(compatible && locked){
                    console.log("!@#!@#!@#!@# 이미봤따 잠금 설정상태 true", launched);
                    //월급 정보를 저장했으면 
                    if(isLoggedIn && profile && isSetData && !scanResult){
                         console.log("!@#!@#!@#!@# 인증해", launched);
                         
                         return (
                              <View style={[styles.container, { alignItems:'center', alignContent: 'center',}]} >
                                   <StatusBar hidden={true}/>
                                   <Text>인증해주세요</Text>
                              </View>
                         )
                    }else if(isLoggedIn && profile && isSetData && scanResult ){
                         console.log("!@#!@#!@#!@# scanResult", scanResult);

                         console.log("!@#!@#!@#!@# isSetData", isSetData);
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
                         console.log("!@#!@#!@#!@# 로그아웃", isLoggedIn);
                         return (
                              <View style={styles.container} >
                                        <StatusBar hidden={false}/>
                                        <LoggedOutNavigation />
                              </View>
                         )
                    }
               }else{
                    console.log("!@#!@#!@#!@# 이미봤따  잠금 설정상태 false", launched);
                    //월급 정보를 저장여부확인
                    if(isLoggedIn && profile){
                         console.log("!@#!@#!@#!@# 월급설정 했으니 메인화면 ");
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
                    //로그아웃
                    }else{
                         console.log("!@#!@#!@#!@# 월급 정보 입력 ");
                         return (
                              <View style={styles.container} >
                                        <StatusBar hidden={false}/>
                                        <LoggedOutNavigation />
                              </View>
                         )
                    }
               }
               
          // 앱 최초시작 전
          }else if(!launched){
               console.log("!@#!@#!@#!@# 안봤다", launched);
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
          this.setState({ launched: true });
     };
      _onSkip = () => {
          const { setAlreadyLaunch } = this.props;
          // After user skip the intro slides. Show real app through
          // navigation or simply by controlling state
          setAlreadyLaunch(true);
          this.setState({ launched: true });
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