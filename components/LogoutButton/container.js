import React, {Component} from "react";
import PropTypes from "prop-types";
import LogoutButton from "./presenter"

class Container extends Component {

     render() {
          const { isLoggedIn, profile, isSetData , logOut} = this.props;
          console.log("1231@#!@#!@#!@ isLogged / " , isLoggedIn);
          
          //console.log("money", this.props)
          //console.log("asdfasdfasdfasdfasdf", this.props)
          return (
               <LogoutButton 
                    {...this.props} 
                    {...this.state} 
                    // refresh={this._refresh} 
               />
          );
     }
     // _refresh = () => {
     //      //const { getSalary } = this.props;
     //      this.setState({
     //           isFetching : true
     //      });
     //      //getFeed();
     //      console.log("isFetch refresh")
     // }

}
export default Container;