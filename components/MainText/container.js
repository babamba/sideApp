import React, {Component} from "react";
import PropTypes from "prop-types";
import SalleryText from "./presenterSallery";
import DecreaseText from "./presenterDecrease"
import { image } from "react-native";

class Container extends Component {
      
        textRef = null;
        handleTextRef = ref => {
          this.textRef = ref;
        };
      
        handleDurationChange = duration => {
          this.setState({ duration: Math.round(duration) });
        };
      
        handleRowPressed = (componentRef, animationType) => {
          componentRef.setNativeProps({
            style: {
              zIndex: 1,
            },
          });
          componentRef.animate(animationType, this.state.duration).then(() => {
            componentRef.setNativeProps({
              style: {
                zIndex: 0,
              },
            });
          });
          if (this.textRef) {
            this.textRef[animationType](this.state.duration);
          }
        };

     state ={
          isFetching : false,
          duration: 1000,
          toggledOn: false,
     }
    
     render() {
          //console.log("type : " , this.props.type);
          if(this.props.type === 'Today' || this.props.type === 'Month'){
               return (
                    <SalleryText 
                         {...this.props} 
                         {...this.state} 
                         // refresh={this._refresh} 
                         // handleRowPressed={this.handleRowPressed}
                         // handleDurationChange={this.handleDurationChange}
                         // handleTextRef={this.handleTextRef}


                    />
               );
          }else{
               return (
                    <DecreaseText 
                         {...this.props} 
                         {...this.state} 
                         // refresh={this._refresh} 
                         // handleRowPressed={this.handleRowPressed}
                         // handleDurationChange={this.handleDurationChange}
                         // handleTextRef={this.handleTextRef}
                    />
               )
          }
          
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