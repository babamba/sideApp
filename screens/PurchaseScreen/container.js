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
               console.log("nextProps.currentPrice : " , nextProps.currentPrice)
               //console.log("nextProps.TodayPurchaseProduct : ", nextProps.TodayPurchaseProduct)
               this.setState({
                    TodayPurcahseProduct : nextProps.TodayPurcahseProduct
               })
          }
     }

     componentWillMount = async () => {
          //console.log("await : ", await getDataMealToday(Today.format("YYYYMMDD")))
     }

     componentWillUnmount = () =>{
          console.log("Purchase Unmount")
     }

     componentDidMount = () => {
          this._refresh();
          // const { initApp } = this.props;
          // initApp();
          const { onChangeScrollControl } = this.props;
          onChangeScrollControl(true);
     };

     render() {
          return (
               <PurchaseScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          //const { getNotifications } = this.props;
         
          const { getDataPurchaseToday } = this.props;
          getDataPurchaseToday(moment().format("YYYYMMDD"));

           this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
     }

}
export default Container;