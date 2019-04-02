import React, {Component} from "react";
import PropTypes from "prop-types";
import TotalScreen from "./presenter";
import moment from "moment";
import { Alert, Keyboard } from "react-native"
const listColor = ['#C4E9E4','#F0D9C7','#FCD0D0','#F79CB1','#37898C','#9DD8D4']

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     constructor (props) {
          super(props);
          //console.log("this.props", this.props)
          const {getFixData ,oninit } = this.props
          getFixData();
          // getAllData(moment().format("YYYYMMDD"), 0);
          // getAllData(moment().format("YYYYMMDD"), 1);
          // getAllData(moment().format("YYYYMMDD"), 2);  

          oninit(moment().format("YYYYMMDD"));
         
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
          //console.log(nextProps);

          if(nextProps){
               console.log("nextProps.FixConsumProduct : ", nextProps.FixConsumProduct.length)
               console.log("nextProps.currentPrice : " , nextProps.FixConsumPrice)

               const Fixdata = this._replaceFixData(nextProps.FixConsumProduct)

               const increasedata = this._replaceConsumData(nextProps.MonthReportData , 0)
               const mealdata = this._replaceConsumData(nextProps.MonthReportData , 1)
               const purchasedata = this._replaceConsumData(nextProps.MonthReportData , 2)
          

               this.setState({
                    FixConsumProduct : nextProps.FixConsumProduct,
                    FixConsumPrice : nextProps.FixConsumPrice,
                    BudgetPrice: nextProps.BudgetPrice,
                    isFetching: false,
                    Fixdata,
                    increasedata,
                    mealdata,
                    purchasedata,
               })
          }
     }

     randomItem = (a) => {
          return a[Math.floor(Math.random() * a.length)];
     }

     _replaceFixData = data => {
          let newArray = [];
          if(data.length > 0 ){
               for (let i of data) {
                    let obj = {};
                    obj.id = i.enrollId
                    obj.title = i.income_name
                    obj.subtitle = i.price
                    obj.date = ""
                    obj.backgroundColor = this.randomItem(listColor);
                    newArray.push(obj)
               }
          }
          //console.log("newArray", newArray)
          return newArray;
     }

     _replaceConsumData = (data, type) => {
          //let all =[];

          let newArray = [];

          if(data.length > 0 ){
               for (let i of data) {
                    let obj = {};
                    obj.id = i.enrollId
                    obj.title = i.income_name
                    obj.subtitle = i.price
                    obj.date = i.created_at.substring(0, 10)
                    obj.backgroundColor = this.randomItem(listColor);
                    if(Number(i.consumType) === type){
                         newArray.push(obj) 
                    }
               }
          }
          return newArray;
     }

     componentWillMount (){
          const {FixConsumProduct, 
               FixConsumPrice, 
               BudgetPrice, 
               getFixData, 
               navigation, 
               monthSallery,
               MonthReportData,
               ReportIncreaseMonthPrice, 
               ReportMealMonthPrice, 
               ReportPurchaseMonthPrice
          } = this.props;
          //console.log('screen props: ', this.props.navigation.getScreenProps())
          //console.log('MonthReportData :' , MonthReportData)

          

          const screenProps = this.props.navigation.getScreenProps('username')

          const Fixdata = this._replaceFixData(FixConsumProduct)

          const increasedata = this._replaceConsumData(MonthReportData , 0)
          const mealdata = this._replaceConsumData(MonthReportData , 1)
          const purchasedata = this._replaceConsumData(MonthReportData , 2)
          

          //console.log('increasedata :' , increasedata)
          // const increasedata = await this._replaceConsumData(MonthReportData , 0)
          // const mealdata = await this._replaceConsumData(MonthReportData , 1)
          // const purchasedata = await this._replaceConsumData(MonthReportData , 2)



          //const AllData = await this._replaceConsumData(MonthReportData)

          //console.log('AllData : ' , AllData)
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
               Fixdata,
               increasedata,
               mealdata,
               purchasedata,
               
               // increasedata,
               // mealdata,
               // purchasedata
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
          //console.log('state data : ' , this.state.increasedata)
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
          const { deleteFixData, getFixData, getReportDataMonth } = this.props;
          Alert.alert(
               '삭제하시겠습니까 ?',
               '',
               [
                    {
                         text: 'OK', 
                         onPress: () => {
                              deleteFixData(enrollId)
                              getFixData()
                              getReportDataMonth(moment().format("YYYYMMDD"))
                              this._refresh();
                              // this._onSwipeClose(this.state.rowIndex)
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
                    increasedata={this.state.increasedata}
                    mealdata={this.state.mealdata}
                    purchasedata={this.state.purchasedata}
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