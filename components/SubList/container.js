import React, {Component} from "react";
import PropTypes from "prop-types";
import SubList from "./presenter";

class Container extends Component {

     constructor(){
          super()

     } 

     state ={
          isFetching : false,
          toggledOn: false,
          fadeinOut : false,
          TodayMealProduct: [],
          refreshing: false
     }

     componentDidMount(){
          //console.log(this.props.isWorkingDay)
          console.log("SubList screen render")
     }

     componentWillMount(){
          this.setState({
               isFetching : false
          });
     }

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.TodayMealProduct : ", nextProps.TodayMealProduct)
          if(nextProps){
               console.log("nextProps : " , nextProps.TodayMealProduct)
               this.setState({
                    TodayMealProduct : nextProps.TodayMealProduct
               })
          }
     }
    
     render() {
          return (
               <SubList 
                    {...this.props} 
                    {...this.state}
                    onListRefresh={this._onListRefresh}
                    
               />
          );
     }

     _onListRefresh = () => {
          console.log("refresh")
          this.setState({refreshing : true});
          onStop = ()=>{
               this.setState({refreshing : false});
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