import React from 'react';
import { AppLoading, Asset, Font, SplashScreen } from "expo";
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./redux/configureStore";
const { persistor, store } = configureStore();
import AppContainer from "./components/AppContainer";
import LottieScreen from "./screens/LottieScreen";


class App extends React.Component {
  
  state = {
    isLoadingComplete: false,
    isSplashReady: false,
    isAppReady: false,
    
  };

  render() {
    //store.dispatch({type:"LOG_OUT"});
    const { isLoadingComplete } = this.state;
    // if (!isLoadingComplete) {
    //   return (
    //     <AppLoading
    //       startAsync={this._loadAssetsAsync}
    //       onError={this._handleLoadingError}
    //       onFinish={this._handleFinishLoading}
    //     />
    //   );
    // }

    if (!this.state.isSplashReady) {
      console.log("@#@#@#@ App Loading ");
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={this._handleFinishLoading}
          onError={console.warn}
          autoHideSplash={true}
        />
      );
    }

    if (!this.state.isAppReady) {
      console.log("@#@#@#@ splash Ready ");
      return (
        <View style={{ flex: 1 }}>
          <LottieScreen
            //onFinish={this._handleAppReady}
          />
          {/* <Image
            source={require('./assets/images/splash.gif')}
            onLoad={this._cacheResourcesAsync}
          /> */}
        </View>
      );
    }

    if(this.state.isAppReady && this.state.isSplashReady){
      console.log("@#@#@#@ splash finish app display ");
      SplashScreen.hide()
      return (
        // 컴포넌트는 이제 리덕스 provider가 있따.
        <Provider store={store}>
          {/* state에 rehydrated(수분을 공급하다? 물을주다? ) 되지 않으면 해당 컨텐츠를 보여주지 않음. 
              state를 어디선가 가지고온다 = rehydrate
              즉 스토어가 디스크에서 컨텐츠를 가져오면 persist gate가 열리고 해당 뷰를 얻게된다.
          */}
          <PersistGate persistor={persistor}>
            <AppContainer/>
          </PersistGate>
        </Provider>
      );
    }
  }

  _loadAssetsAsync = async () => {
    
    return Promise.all([
      
      Asset.loadAsync([
        require("./assets/images/noPhoto.jpg"),
        require("./assets/images/photoPlaceholder.png")
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
        ...FontAwesome.font,
        'NanumBarunGothicUltraLight': require('./assets/font/NanumBarunGothicUltraLight.ttf'),
        'NanumBarunGothicLight': require('./assets/font/NanumBarunGothicLight.ttf'),
        'NanumBarunGothicBold': require('./assets/font/NanumBarunGothicBold.ttf'),
        'NanumBarunGothic': require('./assets/font/NanumBarunGothic.ttf')
      })
    ]);
    
  };

  _handleLoadingError = error => {
    console.error(error);
  };
  _handleFinishLoading = async() => {
    console.log("handle Finish : ", this.state.isSplashReady)
    await this.setState({
      //isLoadingComplete: true
      isSplashReady:true
    });
    console.log("handle Finish setState : ", this.state.isSplashReady)

    setTimeout(() =>  {
      this.setState({
        isAppReady: true
      })
    },2000);
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;