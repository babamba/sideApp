import React, {Component} from "react";
import PropTypes from "prop-types";
import TodayScreen from "./presenter";
import { image } from "react-native";


class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     state = {
          isFetching : false,
          BEFORE_SALARY : 0,
          AFTER_SALARY : 0
     }

     componentDidMount() {

     }

     componentWillMount(){
          this.setState({
               CURRENT_SALARY: this.props.CURRENT_SALARY
          })
     }

     static navigationOptions = {
          gesturesEnabled: false,
     }  

     componentWillReceiveProps = nextProps => {
          const currentProps = this.props;
          console.log("today screen current ",this.props.CURRENT_SALARY)
          console.log("today screen next ",nextProps.CURRENT_SALARY)
          if(currentProps.CURRENT_SALARY === nextProps.CURRENT_SALARY){
               console.log("current === next ")
          }else{
               console.log("current !== next ")

               // TODO
               this.setState({
                    CURRENT_SALARY: nextProps.CURRENT_SALARY
               })
          }
     }

     componentDidMount = () => {

     }

     componentWillMount = () => {
 
     };
     componentWillUnmount = () =>{
          console.log("Today Unmount")
     }

     render() {
          return (
               <TodayScreen 
                    {...this.props} 
                    {...this.state} 
                    //refresh={this._refresh} 
               />
          );
     }
}

export default Container;