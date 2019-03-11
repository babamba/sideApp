import React, {Component} from "react";
import PropTypes from "prop-types";
import SalleryText from "./presenterSallery";
import DecreaseText from "./presenterDecrease"
import { image } from "react-native";

class Container extends Component {

     state ={
          isFetching : false,
          duration: 1000,
          toggledOn: false,
     }

     componentDidMount(){
          //console.log(this.props.isWorkingDay)
          console.log("mainText screen render")
     }

     componentWillReceiveProps = nextProps => {
          if(this.props.isWorkingDay){
               if(this.props.type === 'Today'){
                    //console.log("MainText next: " , nextProps.CURRENT_SALARY)
                    //console.log("timer : " ,  nextProps.remainHours, "남음")
                    //console.log("timer : " ,  nextProps.PERCENT, "남음")
                    this.setState({
                         CURRENT_SALARY: nextProps.CURRENT_SALARY,
                         REMAIN_HOUR : nextProps.REMAIN_HOUR,
                         REMAIN_MINUTES : nextProps.REMAIN_MINUTES,
                    })
               }else if(this.props.type === 'Month'){
                    //console.log("MainText next: " , nextProps.MONTH_CURRENT_SALARY)
                    //console.log("timer : " ,  nextProps.REMAIN_DATE, "남음")
                    this.setState({
                         MONTH_CURRENT_SALARY: nextProps.MONTH_CURRENT_SALARY,
                         REMAIN_DATE : nextProps.REMAIN_DATE
                    })
               }
          }
     }

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