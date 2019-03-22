import React, {Component} from "react";
import PropTypes from "prop-types";
import MealScreen from "./presenter";
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
          isFetching : false
     };

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.TodayMealProduct : ", nextProps.TodayMealProduct)
          if(nextProps.TodayMealProduct){
               console.log("nextProps.currentPrice : " , nextProps.currentPrice)
               this.setState({
                    TodayMealProduct : nextProps.TodayMealProduct,
                    isFetching:false
               })
          }else{
               this.setState({
                    isFetching:false
               })
          }
          
     }

     componentWillMount = async () => {
          //const { getDataMealToday, TodayMealProduct } = this.props;
          //const Today = moment(new Date());
          
          //const TodayMeal = await getDataMealToday(Today.format("YYYYMMDD"));

          //console.log("TodayMeal : ", TodayMeal);
          //console.log("TodayMealProduct : ",  TodayMealProduct);

          // if(TodayMeal){
          //      let currentPrice = 0;
          //      for (let i of TodayMealProduct) {
          //           //console.log("index : " , i);
          //           let price = Number(i.data.price);

          //           currentPrice += price;
          //      }
          //      //console.log("currentPrice", currentPrice);

          //      this.setState({
          //           currentPrice
          //      })
          // }
          //console.log("await : ", await getDataMealToday(Today.format("YYYYMMDD")))
     }

     componentDidMount = () => {
          // const { initApp } = this.props;
          // initApp();
          const { onChangeScrollControl } = this.props;
          onChangeScrollControl(true);
          this._refresh();
     };

     componentWillUnmount = () =>{
          console.log("Meal Unmount")
     }

     render() {
          return (
               <MealScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          //const { getNotifications } = this.props;
         
          const { getDataMealToday , getDataMealMonth } = this.props;
          getDataMealToday(moment().format("YYYYMMDD"));
          getDataMealMonth(moment().format("YYYYMMDD"));

          this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
     }

}
export default Container;