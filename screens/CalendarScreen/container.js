import React, {Component} from "react";
import PropTypes from "prop-types";
import CalendarScreen from "./presenter";
import { image } from "react-native";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
     };

     state = {
          isFetching : false
     };

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.feed", nextProps.feed);
          if(nextProps.feed){
               this.setState({
                    isFetching : false
               })
          }
     }

     componentDidMount = () => {
          // const { initApp } = this.props;
          // initApp();
     };

     render() {
          return (
               <CalendarScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          //const { getSalary } = this.props;
          this.setState({
               isFetching : true
          });
          //getFeed();
          console.log("isFetch refresh")
     }

}
export default Container;