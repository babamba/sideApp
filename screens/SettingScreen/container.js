import React, {Component} from "react";
import SettingScreen from "./presenter";
import { Alert } from "react-native"
import { NavigationActions, withNavigation, StackActions } from "react-navigation";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
     };

     state = {
          //isFetching : false
          pushNotifications: true,
          modalVisibleSalaryForm: false,
          username:""
     };

     componentWillMount = async() =>{
          const screenProps = this.props.navigation.getScreenProps('isLoggedIn');
          console.log(screenProps.username)
          await this.setState({
               username : screenProps.username
          })
     }

     _toggleModalVisibleSalaryForm = () => {
          const { modalVisibleSalaryForm } = this.state;
          console.log(modalVisibleSalaryForm)
          if(modalVisibleSalaryForm){
               this.setState({
                    modalVisibleSalaryForm: false
               });
          }else{
               this.setState({
                    modalVisibleSalaryForm: true
               });
          }    
     }


  _onPressOptions = () => {
     this.props.navigation.navigate('options')
   }
 
   _onChangePushNotifications = () => {
     this.setState(state => ({
       pushNotifications: !state.pushNotifications,
     }))
   }

   _onPressSalaryData = () => {
     console.log(this.props)
   }
 
   _logout = async() => {
        const { logOut } = this.props;
 
           Alert.alert(
                '로그아웃 하시겠습니까 ?', '',
                [
                     {text: '예', onPress: await this.props.logOut },
                     {text: '아니오', onPress: () => console.log("cancel")},
                ],
                   { cancelable: false }
           )
   }

   _pushTest = async() => {
        const { pushNotifications } = this.props;

        pushNotifications("today")
        Alert.alert("푸시 발송")
   }

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.feed", nextProps.feed);
          // if(nextProps.feed){
          //      this.setState({
          //           isFetching : false
          //      })
          // }
     }

     componentDidMount = () => {
          // const { initApp } = this.props;
          // initApp();
     };

     render() {
          return (
               <SettingScreen 
                    {...this.props} 
                    {...this.state} 
                    logout = { this._logout }
                    pushTest = {this._pushTest}
                    onChangePushNotifications = {this._onChangePushNotifications}
                    onPressSalaryData= {this._onPressSalaryData}
                    toggleModalVisibleSalaryForm = {this._toggleModalVisibleSalaryForm}
               />
          );
     }


}
export default withNavigation(Container);