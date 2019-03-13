import React, {Component} from "react";
import PropTypes from "prop-types";
import PurchaseScreen from "./presenter";
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
          //console.log("nextProps.TodayPurchaseProduct : ", nextProps.TodayPurchaseProduct)
          if(nextProps.TodayPurcahseProduct){
               //console.log("nextProps.TodayPurchaseProduct : ", nextProps.TodayPurchaseProduct)
               this.setState({
                    TodayPurcahseProduct : nextProps.TodayPurcahseProduct
               })
          }
     }

     componentWillMount = async () => {
          const { getDataPurchaseToday } = this.props;
          const Today = moment(new Date());
          
          const TodayPurchase = await getDataPurchaseToday(Today.format("YYYYMMDD"));

          //console.log("TodayPurchase : ", TodayPurchase);
          //console.log("TodayPurchase : ",  TodayPurcahseProduct);

          let currentPrice = 0;
          for (let i of TodayPurchase) {
               //console.log("index : " , i);
               let price = Number(i.data.price);

               currentPrice += price;
          }
          //console.log("currentPrice", currentPrice);

          this.setState({
               currentPrice
          })

          const { onChangeScrollControl } = this.props;
          onChangeScrollControl(true);
          //console.log("await : ", await getDataMealToday(Today.format("YYYYMMDD")))
     }

     componentWillUnmount = () =>{
          console.log("Purchase Unmount")
     }

     componentDidMount = () => {
          // const { initApp } = this.props;
          // initApp();
     };

     render() {
          return (
               <PurchaseScreen 
                    {...this.props} 
                    {...this.state} 
                    //refresh={this._refresh} 
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