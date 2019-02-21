import React, {Component} from "react";
import PropTypes from "prop-types";
import MainText from "./presenter";
import { image } from "react-native";

class Container extends Component {

     state ={
          isFetching : false
     }
     
     render() {
          console.log("asdfasdf",this.props)
          return (
               <MainText 
                    {...this.props} 
                    {...this.state} 
                    // refresh={this._refresh} 
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