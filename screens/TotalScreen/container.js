import React, {Component} from "react";
import PropTypes from "prop-types";
import TotalScreen from "./presenter";
import moment from "moment";
import { Alert, Keyboard } from "react-native"

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
          //monthSallery : PropsTypes.number.isRequired
     };

     state = {
          isFetching : false,
          isModalVisible: false,
          swipeScrollEnabled: true,
          rowIndex:0
     };

     componentWillReceiveProps = nextProps => {
          console.log(nextProps);

          if(nextProps){
               console.log("nextProps.FixConsumProduct : ", nextProps.FixConsumProduct.length)
               console.log("nextProps.currentPrice : " , nextProps.FixConsumPrice)
               this.setState({
                    FixConsumProduct : nextProps.FixConsumProduct,
                    FixConsumPrice : nextProps.FixConsumPrice,
                    BudgetPrice: nextProps.BudgetPrice
               })
          }
     }

     componentWillMount = async () => {
          const {FixConsumProduct, FixConsumPrice, BudgetPrice} = this.props;

          this.setState({
               FixConsumProduct,
               FixConsumPrice,
               BudgetPrice
          })
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
          // const { onChangeScrollControl } = this.props;
          // onChangeScrollControl(true);
          // this._refresh();
          // keyboardDidShowListener = Keyboard.addListener(
          //      'keyboardDidShow',
          //      this._keyboardDidShow,
          //    );

          // keyboardWillHideListener = Keyboard.addListener(
          //      'keyboardWillHide',
          //      this._keyboardWillHide,
          // );
     };

     componentWillUnmount = () =>{
          console.log("total Unmount");
     }

     _onSwipeOpen = (rowIndex) => {
          this.setState({
              rowIndex: rowIndex
          })
     }

     _onSwipeClose = (rowIndex) => {
          if (rowIndex === this.state.rowIndex) {
              this.setState({ rowIndex: null });
          }
     } 

     _deleteData = (enrollId) => {
          const { deleteFixData } = this.props;
          Alert.alert(
               '삭제하시겠습니까 ?',
               '',
               [
                    {
                         text: 'OK', 
                         onPress: () => {
                              deleteFixData(enrollId)
                              this._onSwipeClose(this.state.rowIndex)
                         }
                    },
                    {text: 'CANCEL', onPress: () => console.log("cancel")},
               ],
                  { cancelable: false }
          )
     }

     render() {
          return (
               <TotalScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
                    handleScroll={this._handleScroll}
                    toggleModal={this._toggleModal}
                    onSwipeOpen={this._onSwipeOpen}
                    onSwipeClose={this._onSwipeClose}
                    deleteData={this._deleteData}
                    allowScroll={this._allowScroll}
               />
          );
     }

     _allowScroll = (swipeScrollEnabled) => {
          this.setState({ swipeScrollEnabled: swipeScrollEnabled })
     }

     _toggleModal = () => {
          console.log("_toggleModal");
          const { isModalVisible  } = this.state;
          this.setState({ 
               isModalVisible: !this.state.isModalVisible 
          });

          if(isModalVisible){
               Keyboard.dismiss();
          }
          
          console.log("isModalVisible : ", isModalVisible);
     }

     _keyboardDidShow = () =>{
          console.log('Keyboard Shown');
     }
      
     _keyboardWillHide = () => {
          //this._toggleModal()
          console.log('Keyboard Hidden');
     }

     _handleScroll = (event) => {
          console.log("_handleScroll")
          const getOffsetY = event.nativeEvent.contentOffset.y;
          console.log(event.nativeEvent.contentOffset.y);
          if(getOffsetY <= -15){
               this._toggleModal();
               console.log("toggle")
          }
     }

     _refresh = () => {
          //const { getNotifications } = this.props;
         
          //const { getDataMealToday , getDataMealMonth } = this.props;
          //getDataMealToday(moment().format("YYYYMMDD"));
          //getDataMealMonth(moment().format("YYYYMMDD"));

           this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
     }

}
export default Container;