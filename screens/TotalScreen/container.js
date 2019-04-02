import React, {Component} from "react";
import PropTypes from "prop-types";
import TotalScreen from "./presenter";
import moment from "moment";
import { Alert, Keyboard } from "react-native"
const listColor = ['#C4E9E4','#F0D9C7','#F79CB1']

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     constructor (props) {
          super(props);
          console.log("this.props", this.props)
          this.props.getFixData();
      }

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

     randomItem = (a) => {
          return a[Math.floor(Math.random() * a.length)];
     }

     _replaceData = data => {
          let newArray = [];
          if(data.length > 0 ){
               for (let i of data) {
                    let obj = {};
                    obj.title = i.income_name
                    obj.subtitle = i.price
                    obj.backgroundColor = this.randomItem(listColor);
                    newArray.push(obj)
               }
          }
          console.log("newArray", newArray)
          return newArray;
     }

     componentWillMount = async () => {
          const {FixConsumProduct, FixConsumPrice, BudgetPrice, getFixData, navigation, monthSallery} = this.props;
          console.log('screen props: ', this.props.navigation.getScreenProps())
          const screenProps = this.props.navigation.getScreenProps('username')

          const Fixdata = this._replaceData(FixConsumProduct)
          //임시
          // const data = [
          //      {
          //           title: '이번달 급여',
          //           subtitle: monthSallery,
          //           backgroundColor:"#C4E9E4",
          //           illustration: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/pro/ipad-pro-12-11-select-201810_GEO_KR?wid=870&amp;hei=1100&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1540576022267'
          //      },
          //      {
          //           title: '고정지출',
          //           subtitle: FixConsumPrice,
          //           illustration: 'https://cdn.clien.net/web/api/file/F01/7642247/afd0e9da5919e.jpg?w=780&h=30000',
          //           backgroundColor:"#F0D9C7"
          //      },
          //      {
          //           title: '예산금액',
          //           subtitle: BudgetPrice,
          //           illustration: 'http://www.autodaily.co.kr/news/photo/201812/406447_33632_195.jpg',
          //           backgroundColor:"#F79CB1"
          //      },
          // ]

          

          this.setState({
               FixConsumProduct,
               FixConsumPrice,
               BudgetPrice,
               username: screenProps.username,
               Fixdata
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
                    Fixdata={this.state.Fixdata}
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