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
     }

     componentDidMount() {
          console.log("asdfasdf")
     }

     static navigationOptions = {
          gesturesEnabled: false,
     }  

     componentWillReceiveProps = nextProps => {
          const currentProps = this.props;

          if(currentProps.CURRENT_SALARY === nextProps.CURRENT_SALARY){
               console.log("current === next ")
               console.log("today screen current ",this.props.CURRENT_SALARY)
               console.log("today screen next ",nextProps.CURRENT_SALARY)
          }else{
               console.log("current !== next TodayScreen")
               console.log("Today nextProp :" , nextProps.CURRENT_SALARY)
               this.setState({
                    CURRENT_SALARY: nextProps.CURRENT_SALARY
               })
               // TODO
               //this.setState({
                    // BEFORE_SALARY : currentProps.CURRENT_SALARY,
                    // AFTER_SALARY:nextProps.CURRENT_SALARY,
                    //CURRENT_SALARY : currentProps.CURRENT_SALARY,
               //})
          }
     }

     componentDidUpdate(prevProps, prevState){
          //console.log(" today componentDidUpdate: " , "@props" , JSON.stringify(prevProps.CURRENT_SALARY));
          //console.log(" today componentDidUpdate: " , "!prevState" , JSON.stringify(prevState.CURRENT_SALARY));
          // console.log(" today componentDidUpdate: " , "state" , this.state.BEFORE_SALARY);
          // console.log(" today componentDidUpdate: " , "state" , this.state.AFTER_SALARY);
          //console.log(" today componentDidUpdate: " , "this. state" , this.state.CURRENT_SALARY);
          //console.log(" today componentDidUpdate: " , "this. props" ,this.props.CURRENT_SALARY)
     //     if(prevProps.CURRENT_SALARY !== this.props.CURRENT_SALARY){
     //           console.log("current action Today component this.setState")
     //           this.setState({
     //                CURRENT_SALARY : prevProps.CURRENT_SALARY
     //           })
     //      }
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