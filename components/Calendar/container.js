import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import moment from "moment";

LocaleConfig.locales['ko_KR'] = {
  monthNames: ['1월','2월','3월','4월','7월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','7월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일.','월.','화.','수.','목.','금.','토.']
};

LocaleConfig.defaultLocale = 'ko_KR';

class Container extends Component {
     constructor(props) {
          super(props);
          //console.log("calendar : " , props)
          this.state = {
               items: {},
          };
     }

     componentWillMount = async () => {
          //console.log("loaded")
          const { getAllData } = this.props;

          const AllIncreaseData = await getAllData(moment().format("YYYYMMDD"), 0);
          const AllMealData = await getAllData(moment().format("YYYYMMDD"), 1);
          const AllPurchaseData = await getAllData(moment().format("YYYYMMDD"), 2);  
          
          this.setState({
               AllIncreaseData,
               AllMealData,
               AllPurchaseData
          })
     }

     componentWillReceiveProps = async (nextProps) => {
          if(nextProps){
               if(nextProps.AllIncreaseData){
                    console.log("nextProps.AllIncreaseData : ", nextProps.AllIncreaseData)
                    console.log("state.AllIncreaseData : ", this.state.AllIncreaseData)
                    await this.setState({
                         AllIncreaseData : nextProps.AllIncreaseData,
                    })
               }

               if(nextProps.AllMealData){
                    //console.log("nextProps.AllMealData : ", nextProps.AllMealData)
                    await this.setState({
                         AllMealData : nextProps.AllMealData,
                    })
               }

               if(nextProps.AllPurchaseData){
                    //console.log("nextProps.AllPurchaseData : ", nextProps.AllPurchaseData)
                    await this.setState({
                         AllPurchaseData : nextProps.AllPurchaseData,
                    })
               }

               // AllMealData : nextProps.AllMealData,
               // AllPurchaseData : nextProps.AllPurchaseData,

               //console.log("calendar Component nextProps increaseProduct: " , nextProps.increaseProduct)
               //console.log("calendar Component nextProps mealProduct: " , nextProps.mealProduct)
               //console.log("calendar Component nextProps purchaseProduct: " , nextProps.purchaseProduct)
          
          
          }else{
               console.log("nextProps.NOT : ", nextProps.AllIncreaseData)
          }

          // if(increaseProduct.length != this.state.increaseProduct.length
          //      || mealProduct.length != this.state.mealProduct.length
          //      || purchaseProduct.length != this.state.purchaseProduct.length
          //           ){
          //           this.setState({
          //                increaseProduct,
          //                mealProduct,
          //                purchaseProduct,
          //                isFetching : false,
          //           })
          // }else{
          //      this.setState({
          //           isFetching : false,
          //      })
          // }
     }

     render() {
          return (
               <Agenda
                    items={this.state.items}
                    pastScrollRange={3}
                    futureScrollRange={3}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={moment(new Date()).format("YYYY-MM-DD")}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                    // onRefresh={this.refresh.bind(this)}
                    // refreshing={this.state.refreshing}
                    // refreshControl = {null}
                    //onDayPress={(day)=>{  } }
                    onDayPress={(day)=>{ this.changeDay(day) }}
                    
                    // refreshControl={
                         
                         
                    // }
                    
                    //markingType={'period'}
                    // markedDates={{
                    //      '2019-03-19': {color: 'red'},
                    //      '2019-03-19': {endingDay: true, color: 'gray'}
                    // }}
                    // monthFormat={'yyyy'}
                    // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                    //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
               />
          );
     }

     filterProduct = (strTime) => {
          const { increaseProduct , mealProduct, purchaseProduct}  = this.state;
          const {AllIncreaseData, AllMealData, AllPurchaseData} = this.state
          // increaseProduct
          // mealProduct 
          // purchaseProduct
          //console.log("strTime : " , strTime);
          //console.log(this.state.increaseProduct);
          //console.log(this.state.mealProduct);
          //console.log(this.state.purchaseProduct);

          let count = 0;

          let time = strTime;
          let convert_strTime = moment(time).format("YYYY-MM-DD")

          let dataObj = {};
          dataObj.increase = [];
          dataObj.meal = [];
          dataObj.purchase = [];

          //console.log("())()()()()()()() increaseProduct", increaseProduct)
          if(typeof AllIncreaseData != "undefined"){
               if(AllIncreaseData.length > 0){
                    let obj = AllIncreaseData;
                    

                    for (let j = 0; j < Object.keys(obj).length; j++) {
                         let inner = obj[j];

                         let createTime = inner.created_at;
                         let convert_createTime = moment(createTime).format("YYYY-MM-DD")

                         //console.log("#_)#_#_#_#_#_#_#__increase strTime : ",convert_strTime , " / createTime : " , convert_createTime)
                         
                         if(convert_strTime === convert_createTime){
                              //count++;
                              dataObj.increase.push({ time : convert_createTime, color:"#55efc4", price : inner.price , consumType: "수입" , income_name : inner.income_name});
                              //console.log("#_)#_#_#_#_#_#_#_increase strTime createTime same time" , convert_strTime , " / " , convert_createTime)
                         }
                         //MonthMealPrice += price;
                    }
               }
               //console.log("dataobj.meal : " , dataObj.increase)
          }

          if(typeof AllMealData != "undefined" ){
               if(AllMealData.length > 0){
                    let obj = AllMealData;
                    

                    //console.log("mealProduct : ", obj)
                    for (let j = 0; j < Object.keys(obj).length; j++) {
                         let inner = obj[j];

                         let createTime = inner.created_at;
                         let convert_createTime = moment(createTime).format("YYYY-MM-DD")

                         if(convert_strTime === convert_createTime){
                              dataObj.meal.push({time : convert_createTime, color:"#74b9ff", price : inner.price , consumType: "식사", income_name : inner.income_name});
                         }
                    }
               }
               //console.log("dataobj.meal : " , dataObj.meal)
          }

          if( typeof AllPurchaseData != "undefined"){
               if(AllPurchaseData.length > 0){
                    let obj = AllPurchaseData;
               

                    for (let j = 0; j < Object.keys(obj).length; j++) {
                         let inner = obj[j];

                         let createTime = inner.created_at;
                         let convert_createTime = moment(createTime).format("YYYY-MM-DD")

                         //console.log("#_)#_#_#_#_#_#_#_ meal strTime : ",convert_strTime , " / createTime : " , convert_createTime)
                         
                         if(convert_strTime === convert_createTime){
                              //count++;
                              dataObj.purchase.push({ time : convert_createTime, color:"#ff7675", price : inner.price , consumType: "소비" , income_name : inner.income_name});
                              //console.log("#_)#_#_#_#_#_#_#_ meal strTime createTime same time" , convert_strTime , " / " , convert_createTime)
                         }
                         //MonthMealPrice += price;s
                    }
               }

               //console.log("dataobj.purchase : " , dataObj.purchase)
          }

          //console.log("filter end : " , count)

          //dataObj.count = count
          

          return dataObj;
     }

     loadItems(day) {
          this.setState({
               day : day
          })
          setTimeout(() => {
               //console.log("day", day)

                    //달력 만드는 부분(YYYY-MM-DD)
                    for (let i = -15; i < 30; i++) {
                         const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                         const strTime = this.timeToString(time);
                         //console.log("strTime : " , strTime , " / time : ", time)
                         const dataObj = this.filterProduct(strTime)

                         // 해당날짜에 아이템 삽입 
                         if (!this.state.items[strTime]) {
                              this.state.items[strTime] = [];

                              if(typeof dataObj != 'undefined' ){

                                   if(dataObj.increase.length > 0){
                                        
                                        //console.log("Object.keys increase",Object.keys(dataObj.increase));
                                        for (let j = 0; j < dataObj.increase.length; j++) {
                                             //console.log("Object.keys increase", dataObj.increase[j]);
                                             
                                             this.state.items[strTime].push({
                                                  time: strTime,
                                                  income_name: dataObj.increase[j].income_name,
                                                  name: dataObj.increase[j].consumType,
                                                  color: dataObj.increase[j].color,
                                                  price : dataObj.increase[j].price,
                                                  //height: Math.max(50, Math.floor(Math.random() * 150))
                                                  height: 60
                                             });
                                        }
                                   }

                                   if(dataObj.meal.length > 0){
                                        //console.log("Object.keys meal",Object.keys(dataObj.meal));
                                        for (let j = 0; j < dataObj.meal.length; j++) {

                                             this.state.items[strTime].push({
                                                  time: strTime,
                                                  income_name: dataObj.meal[j].income_name,
                                                  name: dataObj.meal[j].consumType,
                                                  color: dataObj.meal[j].color,
                                                  price : dataObj.meal[j].price,
                                                  //height: Math.max(50, Math.floor(Math.random() * 150))
                                                  height: 60
                                             });
                                        }
                                   }

                                   if(dataObj.purchase.length > 0 ){
                                        //console.log("Object.keys purchase",Object.keys(dataObj.purchase));
                                        for (let j = 0; j < dataObj.purchase.length; j++) {
                                             this.state.items[strTime].push({
                                                  time: strTime,
                                                  income_name: dataObj.purchase[j].income_name,
                                                  name: dataObj.purchase[j].consumType,
                                                  color: dataObj.purchase[j].color,
                                                  price : dataObj.purchase[j].price,
                                                  //height: Math.max(50, Math.floor(Math.random() * 150))
                                                  height: 60
                                             });
                                        }
                                   }
                              }
                                   
                              
                              //   this.state.items[strTime].push({
                              //     name: 'Item for ' + strTime,
                              //     height: Math.max(50, Math.floor(Math.random() * 150))
                              //   });
                              
                         }
                    }
               //console.log(this.state.items);
               const newItems = {};
               Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
               
               this.setState({
                    items: newItems
               });
          }, 1000);
          // console.log(`Load Items for ${day.year}-${day.month}`);
     }
     changeDay = (day) => {
          // console.log("changeDay", day)
          // this.setState({
          //      day : day
          // })

          console.log("current state day" , this.state.day)
     }

     renderItem(item) {
          console.log("render item")
          return (
          //<View style={[styles.item, {height: item.height}]}>

                    <View style={[styles.item, 
                         {
                              backgroundColor: item.color,
                              shadowColor: item.color,
                              shadowOffset: { width: 0, height: 0 },
                              shadowOpacity: 0.5,
                              shadowRadius: 6,
                         
                         }]}>
                    
                              <Text style={styles.incomeText}>{item.income_name}</Text>

                              <Text style={styles.priceText}>{item.price}</Text>
                              <Text style={styles.won}>원</Text>
                              <Text style={styles.typeText}>{item.name}</Text>
                         {/* <Text>{item.time}</Text> */}
                         
                    </View>
          );
     }

     refresh = async() => {
          const { getAllData } = this.props;
          console.log("isFetch refresh")
          this.setState({
               refreshing : true
          });


          await getAllData(moment().format("YYYYMMDD"), 0);
          await getAllData(moment().format("YYYYMMDD"), 1);
          await getAllData(moment().format("YYYYMMDD"), 2);  
     }

     renderEmptyDate() {
          return (
               <View style={styles.emptyDate}><Text>기록이 없습니다.</Text></View>
          );
     }

     rowHasChanged(r1, r2) {
          return r1.name !== r2.name;
     }

     timeToString(time) {
          const date = new Date(time);
          return date.toISOString().split('T')[0];
     }
}

const styles = StyleSheet.create({
     item: {
          flex: 1,
          padding: 10,
          marginRight: 10,
          marginTop: 17,
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 10,
          marginRight: 10,
          marginTop: 17,
          flexDirection: 'row',
          alignItems: 'center',
          },
     emptyDate: {
          height: 15,
          flex:1,
          paddingTop: 30
     },
     //   text : {
     //      fontFamily: 'NanumBarunGothicUltraLight',
     //      fontSize:15,
     //      padding:5
     //   },
     won: {
          paddingLeft:5, 
          color:'white', 
          fontSize:18,
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 6,
          },
     priceText : {
          justifyContent: 'flex-end',
          fontFamily: 'NanumBarunGothicBold',
          fontSize:18,
          padding:5,
          color:'white',
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 6,
     },

     typeText: {
          justifyContent: 'flex-end',
          fontFamily: 'NanumBarunGothic',
          fontSize:18,
          padding:5,
          color:'white',
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 6,
     },

     incomeText : {
          alignSelf: 'center',
          fontFamily: 'NanumBarunGothic',
          fontSize:18,
          padding:5,
          color:'white',
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 6,
     },
     //   emptyDate: {
     //      backgroundColor: 'grey',
     //      flex: 1,
     //      borderRadius: 5,
     //      padding: 10,
     //      marginRight: 10,
     //      marginTop: 17
     //    }
});

export default Container