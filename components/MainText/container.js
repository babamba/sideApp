import React, {Component} from "react";
import PropTypes from "prop-types";
import SalleryText from "./presenterSallery";
import DecreaseText from "./presenterDecrease"
import { image } from "react-native";
import { Alert, Keyboard } from "react-native"

class Container extends Component {

     state ={
          isFetching : false,
          duration: 1000,
          toggledOn: false,
          fadeinOut : false,
          fill: 60,
          isModalVisible: false,
          isSubmit: false
     }

     componentDidMount(){
          //console.log(this.props.isWorkingDay)
          console.log("mainText screen render")
          console.log("this.props.refresh " , this.props.refresh)
          console.log("mainText scrollControl didmount" , this.props.scrollControl)
     }

     componentWillMount(){
          this.setState({
               isFetching : false
          });
     }

     componentWillReceiveProps = nextProps => {
          console.log("type" , nextProps.REMAIN_HOUR)
          console.log("mainText scrollControl nextProps" , nextProps.scrollControl)

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
                    console.log("timer : " ,  nextProps.REMAIN_DATE, "남음")
                    this.setState({
                         MONTH_CURRENT_SALARY: nextProps.MONTH_CURRENT_SALARY,
                         REMAIN_DATE : nextProps.REMAIN_DATE
                    })
               }
          }
     }

     _handleScroll = (event) => {
          console.log("_handleScroll")
          const getOffsetY = event.nativeEvent.contentOffset.y;
          console.log(event.nativeEvent.contentOffset.y);
          if(getOffsetY <= -3){
               this._toggleModal();
               console.log("toggle")
          }
     }

     _callback = async(dataFromChild) => {
          console.log("dataFromChild", dataFromChild)
          await this.setState({isSubmit:dataFromChild})

          if(dataFromChild){
               const { refresh } = this.props;
               refresh();
          }
     }
       
     _toggleModal = () => {
          console.log("_toggleModal");
          const { isModalVisible, isSubmit  } = this.state;
          this.setState({ 
               isModalVisible: !this.state.isModalVisible 
          });
          console.log("isModalVisible : ", isModalVisible);
          console.log("isSubmit : " , isSubmit)

          if(isModalVisible){
               Keyboard.dismiss();
          }
          
          
     }

     // handleOnScroll = event => {
     //      this.setState({
     //        scrollOffset: event.nativeEvent.contentOffset.y,
     //      });
     //    };
      
     // handleScrollTo = p => {
     //      if (this.scrollViewRef) {
     //        this.scrollViewRef.scrollTo(p);
     //      }
     // }

     //    textRef = null;
     //    handleTextRef = ref => {
     //      this.textRef = ref;
     //    };
      
     //    handleDurationChange = duration => {
     //      this.setState({ duration: Math.round(duration) });
     //    };
      
     //    handleRowPressed = (componentRef, animationType) => {
     //      componentRef.setNativeProps({
     //        style: {
     //          zIndex: 1,
     //        },
     //      });
     //      componentRef.animate(animationType, this.state.duration).then(() => {
     //        componentRef.setNativeProps({
     //          style: {
     //            zIndex: 0,
     //          },
     //        });
     //      });
     //      if (this.textRef) {
     //        this.textRef[animationType](this.state.duration);
     //      }
     //    };
    
     render() {
          //console.log("type : " , this.props.type);
          if(this.props.type === 'Today' || this.props.type === 'Month'){
               return (
                    <SalleryText 
                         {...this.props} 
                         {...this.state} 
                         handleScroll={this._handleScroll}
                         toggleModal={this._toggleModal}
                         callback={this._callback}
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
                         handleScroll={this._handleScroll}
                         toggleModal={this._toggleModal}
                         callback={this._callback}
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

          console.log("isFetch main_text refresh")
     }

}
export default Container;