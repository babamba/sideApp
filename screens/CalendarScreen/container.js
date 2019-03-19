import React, {Component} from "react";
import PropTypes from "prop-types";
import CalendarScreen from "./presenter";
import { image } from "react-native";
import moment from "moment";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
     };

     state = {
          isFetching : false,
     };

     componentWillMount = async () => {
          console.log("loaded")
          // const {
          //      // getDataMealMonth ,
          //      // getDataPurchaseMonth,
          //      // getDataIncreaseMonth,
          //      getAllData,
               
          //      // MonthMealProduct,
          //      // MonthPrice,
          //      // MonthPurchaseProduct,
          //      // MonthPurchasePrice,
          //      // MonthIncreaseProduct,
          //      // MonthIncreasePrice,

          // } = this.props;

          // const increaseProduct = await getAllData(moment().format("YYYYMMDD"), 0);
          // const mealProduct = await getAllData(moment().format("YYYYMMDD"), 1);
          // const purchaseProduct = await getAllData(moment().format("YYYYMMDD"), 2);  
          
          // this.setState({
          //      increaseProduct,
          //      mealProduct,
          //      purchaseProduct
          // })
     }

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.feed", nextProps.feed);
          // if(nextProps){
          //      console.log("nextProps", nextProps);
          //      this.setState({
          //           isFetching : false
          //      })
          // }else{
          //      console.log("not nextProps");
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
               <CalendarScreen 
                    {...this.props} 
                    {...this.state} 
               />
          );
     }

     // _refresh = () => {
     //      const { getAllData } = this.props;
     //      this.setState({
     //           isFetching : true
     //      });
     //      this.loaded();
     //      console.log("isFetch refresh")
     // }

}
export default Container;