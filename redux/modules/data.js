// Imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";
import { actionCreators as userActions } from './user';
import { Permissions, Notifications, Facebook } from "expo";
import { timer } from "./timer";
import uuid from "uuid"

import moment from "moment";
// Actions

const AlREADY_LAUNCH = "AlREADY_LAUNCH";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT"
const SET_USER = "SET_USER";

const SET_DATA = 'SET_DATA';
const SET_DATA_MEAL = 'SET_DATA_MEAL';
const SET_DATA_MEAL_MONTH = "SET_DATA_MEAL_MONTH";

const SET_DATA_PURCHASE = 'SET_DATA_PURCHASE'
const SET_DATA_PURCHASE_MONTH = 'SET_DATA_PURCHASE_MONTH'

const SET_DATA_MONTH_INCREASE = 'SET_DATA_MONTH_INCREASE'
const SET_DATA_TODAY_INCREASE = 'SET_DATA_TODAY_INCREASE'

const GET_DATA_ALL = 'GET_DATA_ALL';
const SET_DATA_ALL = 'SET_DATA_ALL'

const GET_REPORT_TODAY = 'GET_REPORT_TODAY'
const GET_REPORT_MONTH = 'GET_REPORT_MONTH'

const SET_REPORT_TODAY_DATA = 'SET_REPORT_TODAY_DATA'
const SET_REPORT_MONTH_DATA = 'SET_REPORT_MONTH_DATA'

const SET_REPORT_TODAY_PRICE = 'SET_REPORT_TODAY_PRICE'
const SET_REPORT_MONTH_PRICE = 'SET_REPORT_MONTH_PRICE'

const SET_FIX_DATA = 'SET_FIX_DATA'

const SET_BUDGET_PRICE = 'SET_BUDGET_PRICE'

// Action Creators
function setData(json){
     return {
          type: SET_DATA,
          data : {
               income_name : json.income_name , 
               price : json.price , 
               feeling : json.feeling , 
               consumType : json.consumType , 
               created_at : json.created_at
          }
     }
}

function setDataMealToday(TodayMealProduct, currentPrice){
     return {
          type: SET_DATA_MEAL,
          TodayMealProduct, //format("YYYYMMDD-hhmmss")
          TodayMealPrice : currentPrice
     }
}

function setReportTodayPrice(ReportIncreaseTodayPrice, ReportMealTodayPrice, ReportPurchaseTodayPrice){
     return {
          type: SET_REPORT_TODAY_PRICE,
          ReportIncreaseTodayPrice,
          ReportMealTodayPrice,
          ReportPurchaseTodayPrice
     }
}

function setReportMonthPrice(ReportIncreaseMonthPrice, ReportMealMonthPrice, ReportPurchaseMonthPrice){
     return {
          type:SET_REPORT_MONTH_PRICE,
          ReportIncreaseMonthPrice,
          ReportMealMonthPrice, 
          ReportPurchaseMonthPrice,
     }
}


function setDataMealMonth(MonthMealProduct, MonthMealPrice){
     return {
          type: SET_DATA_MEAL_MONTH,
          MonthMealProduct, //format("YYYYMMDD-hhmmss")
          MonthMealPrice
     }
}


function setDataPurchaseToday(TodayPurchaseProduct, currentPrice){
     return {
          type: SET_DATA_PURCHASE,
          TodayPurchaseProduct, //format("YYYYMMDD-hhmmss")
          TodayPurchasePrice : currentPrice
     }
}

function setDataPurchaseMonth(MonthPurchaseProduct, MonthPurchasePrice){
     return {
          type: SET_DATA_PURCHASE_MONTH,
          MonthPurchaseProduct, //format("YYYYMMDD-hhmmss")
          MonthPurchasePrice
     }
}

function setDataTodayIncrease(TodayIncreaseProduct, TodayIncreasePrice){
     return {
          type: SET_DATA_TODAY_INCREASE,
          TodayIncreaseProduct, 
          TodayIncreasePrice 
     }
}

function setDataMonthIncrease(MonthIncreaseProduct, MonthIncreasePrice){
     return {
          type: SET_DATA_MONTH_INCREASE,
          MonthIncreaseProduct, 
          MonthIncreasePrice
     }
}

function setFixData(FixConsumProduct, FixConsumPrice){
     return {
          type:SET_FIX_DATA,
          FixConsumProduct,
          FixConsumPrice
     }
}

function setBudgetPrice(monthSallery){
     return {
          type:SET_BUDGET_PRICE,
          monthSallery
     }
}

function getDataPriceAll(){
     return {
          type: GET_DATA_ALL
     }
}

function setTodayReportData(TodayReportData){
     return {
          type: SET_REPORT_TODAY_DATA,
          TodayReportData
     }
}

function setMonthReportData(MonthReportData){
     return {
          type: SET_REPORT_MONTH_DATA,
          MonthReportData
     }
}

function getReportDataToday(date){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          //const { timer : { standardMonth, salaryDay } } = getState();
          return fetch(`${API_URL}/salary/${date}/today_report_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(async(json) => {
               if(json){
                    let TodayReportData = json;
                   //console.log("Report Today", json)


                    
                   let ReportIncreaseTodayPrice = 0;
                   let ReportMealTodayPrice = 0;
                   let ReportPurchaseTodayPrice = 0;

                    if(TodayReportData.length > 0 ){
                         

                         for (let i of json) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              if(i.consumType === "0" ){
                                   ReportIncreaseTodayPrice += price;
                              }else if(i.consumType === "1" ){
                                   ReportMealTodayPrice += price;
                              }else if(i.consumType === "2" ){
                                   ReportPurchaseTodayPrice += price;
                              }
                         }


                    }

                    console.log("$($($($($($( ReportTodayPrice" , ReportIncreaseTodayPrice)
                    console.log("$($($($($($( ReportMealPrice" , ReportMealTodayPrice)
                    console.log("$($($($($($( ReportPurchasePrice" , ReportPurchaseTodayPrice)

                    await dispatch(setTodayReportData(TodayReportData));
                    
                    await dispatch(setReportTodayPrice(ReportIncreaseTodayPrice, ReportMealTodayPrice, ReportPurchaseTodayPrice))

                    return json;
               }
          })
     }
}

function getReportDataMonth(date){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          const { timer : { standardMonth, salaryDay } } = getState();
          return fetch(`${API_URL}/salary/${date}/${standardMonth}/${salaryDay}/month_report_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(async(json) => {
               if(json){
                    let MonthReportData = json;
                   console.log("Report Month", json)

                   let ReportIncreaseMonthPrice = 0;
                   let ReportMealMonthPrice = 0;
                   let ReportPurchaseMonthPrice = 0;

                    if(MonthReportData.length > 0 ){
                         for (let i of json) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              if(i.consumType === "0" ){
                                   ReportIncreaseMonthPrice += price;
                              }else if(i.consumType === "1" ){
                                   ReportMealMonthPrice += price;
                              }else if(i.consumType === "2" ){
                                   ReportPurchaseMonthPrice += price;
                              }
                         }


                    }

                    console.log("$($($($($($( ReportIncreaseMonthPrice" , ReportIncreaseMonthPrice)
                    console.log("$($($($($($( ReportMealMonthPrice" , ReportMealMonthPrice)
                    console.log("$($($($($($( ReportPurchaseMonthPrice" , ReportPurchaseMonthPrice)

                    await dispatch(setMonthReportData(MonthReportData));
                    
                    await dispatch(setReportMonthPrice(ReportIncreaseMonthPrice, ReportMealMonthPrice, ReportPurchaseMonthPrice))

                   return json;
               }
          })
     }
}

function setDataAll(json , type){
     console.log("setDataAll type : ", type, " / json : ", json)
     return {
          type: SET_DATA_ALL,
          data : {
               json,
               type
          }
          
     }

}


function getAllData(date, type){
     // salary/20190319/2/all_data/
     return async(dispatch, getState) => {
           const { user : { token } } = getState();
           const { timer : { standardMonth, salaryDay } } = getState();
 
           return fetch(`${API_URL}/salary/${date}/${type}/all_data/`, {
                method:"GET",
                headers: {
                     Authorization : `JWT ${token}`,
                     "Content-Type" : "application/json"
                }
           })
           .then(response => response.json())
           .then( async(json) => {
                if(json){
                    console.log("All", json)
                    await dispatch(setDataAll(json, type));
 
                     // if(json.length > 0 ){
                     //      for (let i of json) {
                     //           //console.log(i.price)
                     //           let price = Number(i.price);
                     //           MonthMealPrice += price;
                     //      }
                     // }
                     
                     //console.log("MonthIncreasePrice", MonthIncreasePrice)
                     //console.log("MonthIncreasePrice", MonthIncreasePrice)
                     //dispatch(setDataAll(json));
                     return json;
                }
           })
      }
 }

function getDataIncreaseMonth(date){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/${date}/${standardMonth}/${salaryDay}/${0}/month_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(json => {
                    if(json){
                         //console.log("TODAY", json)
                         let MonthIncreasePrice = 0;
                         let MonthIncreaseProduct = json;
     
                         if(json.length > 0 ){
                              for (let i of json) {
                                   //console.log(i.price)
                                   let price = Number(i.price);
                                   MonthIncreasePrice += price;
                              }
                         }
     
                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    dispatch(setDataMonthIncrease(MonthIncreaseProduct, MonthIncreasePrice));
               }
          })
     }
}

function getDataIncreaseToday(date){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          //const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/${date}/${0}/today_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(json => {
               if(json){
                    //console.log("TODAY", json)
                    let TodayIncreasePrice = 0;
                    let TodayIncreaseProduct = json;

                    if(json.length > 0 ){
                         for (let i of json) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              TodayIncreasePrice += price;
                         }
                    }

               //console.log("MonthIncreasePrice", MonthIncreasePrice)
               //console.log("TodayIncreasePrice", TodayIncreasePrice)
               dispatch(setDataTodayIncrease(TodayIncreaseProduct, TodayIncreasePrice));
          }
          })
     }
}

function getDataPurchaseToday(date){
     return async (dispatch, getState) => {
          const { user : { token } } = getState();
          //const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/${date}/${2}/today_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(json => {
               if(json){
                    //console.log("TODAY", json)
                    let TodayPurchasePrice = 0;
                    let TodayPurchaseProduct = json;

                    if(json.length > 0 ){
                         for (let i of TodayPurchaseProduct) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              TodayPurchasePrice += price;
                         }
                    }

               //console.log("MonthIncreasePrice", MonthIncreasePrice)
               //console.log("TodayIncreasePrice", TodayIncreasePrice)
               dispatch(setDataPurchaseToday(TodayPurchaseProduct, TodayPurchasePrice));
          }
          })
     }
}

function getDataPurchaseMonth(date){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/${date}/${standardMonth}/${salaryDay}/${2}/month_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(json => {
                    if(json){
                         //console.log("TODAY", json)
                         let MonthPurchasePrice = 0;
                         let MonthPurchaseProduct = json;
     
                         if(json.length > 0 ){
                              for (let i of json) {
                                   //console.log(i.price)
                                   let price = Number(i.price);
                                   MonthPurchasePrice += price;
                              }
                         }
     
                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    dispatch(setDataMealMonth(MonthPurchaseProduct, MonthPurchasePrice));
               }
          })
     }
}

function getDataMealMonth(date){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/${date}/${standardMonth}/${salaryDay}/${1}/month_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(json => {
                    if(json){
                         //console.log("TODAY", json)
                         let MonthMealPrice = 0;
                         let MonthMealProduct = json;
     
                         if(json.length > 0 ){
                              for (let i of json) {
                                   //console.log(i.price)
                                   let price = Number(i.price);
                                   MonthMealPrice += price;
                              }
                         }
     
                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    dispatch(setDataMealMonth(MonthMealProduct, MonthMealPrice));
               }
          })
     }
}

function getDataMealToday(date){
     return async (dispatch, getState) => {
          const { user : { token } } = getState();
          //const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/${date}/${1}/today_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => response.json())
          .then(json => {
               if(json){
                    //console.log("TODAY", json)
                    let TodayMealPrice = 0;
                    let TodayMealProduct = json;

                    if(json.length > 0 ){
                         for (let i of TodayMealProduct) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              TodayMealPrice += price;
                         }
                    }

               //console.log("MonthIncreasePrice", MonthIncreasePrice)
               //console.log("TodayIncreasePrice", TodayIncreasePrice)
               dispatch(setDataMealToday(TodayMealProduct, TodayMealPrice));

               return json;
          }
          })
     }
}

function deleteFixData(enrollId){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();

          return fetch(`${API_URL}/salary/${enrollId}/fix_consum_delete/`, {
               method:"DELETE",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })
          .then(response => {
               if(response.status === '401'){
                    dispatch(userActions.logOut());
               }else if(response.ok){
                    dispatch(getFixData())
                    return true;
               }else{
                    return false;
               }
          });
     }
}


function uploadPhoto(file, caption, location, tags){
     const tagsArray = tags.split(",");
     const data = new FormData();
     data.append("caption", caption);
     data.append("location", location);
     data.append("file", {
          uri:file,
          type:"image/jpeg",
          name:`${uuid()}.jpg`
     });
     data.append("tags", JSON.stringify(tagsArray));
     return (dispatch, getState) => {
          const { user : { token } } = getState();
          return fetch(`${API_URL}/images/`, {
               method:"POST",
               headers:{
                    Authorization : `JWT ${token}`,
                    "Content-Type":"multipart/form-data"
               },
               body:data
          })
          .then(response => {
               if(response.status === '401'){
                    dispatch(userActions.logOut());
               }else if(response.ok){
                    //dispatch(getFeed());
                    //dispatch(userActions.getOwnProfile());
                    return true;
               }else{
                    return false;
               }
          });
     }
}

function getFixData(){
     return async(dispatch, getState) => {
          const { user : { token } } = getState();
          const { timer : { monthSallery } } = getState();
          //const { timer : { standardMonth, salaryDay } } = getState();

          return fetch(`${API_URL}/salary/fix_consum_data/`, {
               method:"GET",
               headers: {
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
               }
          })

          .then(response => response.json())
          .then(json => {
               if(json){
                    console.log("json inner")
                    let FixConsumPrice = 0;
                    let FixConsumProduct = json;

                    if(json.length > 0 ){
                         for (let i of json) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              FixConsumPrice += price;
                         }
                    }

                    //console.log("FixConsumPrice", FixConsumPrice)
                    //console.log("FixConsumProduct", FixConsumProduct)

               //console.log("MonthIncreasePrice", MonthIncreasePrice)
               //console.log("TodayIncreasePrice", TodayIncreasePrice)
               dispatch(setFixData(FixConsumProduct, FixConsumPrice));
               dispatch(setBudgetPrice(monthSallery));
               console.log("dispatch end")
          }
          })
     }
}

// function getDataPurchaseToday(date){
//      return async (dispatch) => {
//           const product = await AsyncStorage.getItem('products');
          
//           //console.log(JSON.parse(product))
//           //console.log("date", date);

//           const TodayPurchaseProduct= [];
//           let TodayPurchasePrice = 0;

//           if(product){
//                for (let i of JSON.parse(product)) {
//                     let array = TodayPurchaseProduct;
//                     //console.log("index : " , i);
//                     let id = i.id;
//                     let type = Number(i.data.consumType);
     
//                     let strArray = id.split("-")
//                     //console.log("date of dataSet" , strArray[0])
//                     //console.log(type)
//                     //console.log(typeof type)
     
     
//                     if(strArray[0] === date && type === 2){
//                          array.push(i)
//                     }
//                }

//                if(TodayPurchaseProduct.length > 0){
//                     for (let i of TodayPurchaseProduct) {
//                          //console.log("index : " , i);
//                          let price = Number(i.data.price);
//                          TodayPurchasePrice += price;
//                     }
//                }

//                await dispatch(setDataPurchaseToday(TodayPurchaseProduct, TodayPurchasePrice));
//           }

//           return TodayPurchaseProduct;
//      }
// }

// function getDataMealToday(date){
//      return async(dispatch) => {
          
//           const product = await AsyncStorage.getItem('products');
          
          
//           //console.log(JSON.parse(product))
//           //console.log("date", date);

//           const TodayMealProduct= [];
//           let TodayMealPrice = 0;

//           if(product){
//                for (let i of JSON.parse(product)) {
//                     let array = TodayMealProduct;
//                     //console.log("index : " , i);
//                     let id = i.id;
//                     let type = Number(i.data.consumType);
     
//                     let strArray = id.split("-")
//                     //console.log("date of dataSet" , strArray[0])
//                     //console.log(type)
//                     //console.log(typeof type)
     
     
//                     if(strArray[0] === date && type === 1){
//                          array.push(i)
//                     }
//                }

//                const Today = moment(new Date());
               

//                if(TodayMealProduct.length > 0){
//                     for (let i of TodayMealProduct) {
//                          let price = Number(i.data.price);
//                          TodayMealPrice += price;
//                     }
//                }
     
//                await dispatch(setDataMealToday(TodayMealProduct, TodayMealPrice));
//           }

//           return TodayMealProduct;
//      }
// }

// API Actions
function submitFixConsum(income_name, price, feeling, consumType){
     console.log("!@# submitConsum / ", income_name, price, feeling, consumType);

     return (dispatch , getState) => {
          const { user : { token } } = getState();
          const { timer : { monthSallery } } = getState();

          return fetch(`${API_URL}/salary/consum/`, {
               method:"POST",
               headers: {
                    Authorization : `JWT ${token}`,
                     "Content-Type" : "application/json"
               },
               body: JSON.stringify({
                    income_name,
                    price,
                    feeling,
                    consumType
               })
               
          })
          .then(response => {
               if(response.ok){
                    console.log(response)
                    return response.json()
               }else{
                    return false;
               }
               
          })
          .then(async(json) => {
               if(json){
                    console.log("json inner")
                    let FixConsumPrice = 0;
                    let FixConsumProduct = json;

                    if(json.length > 0 ){
                         for (let i of json) {
                              //console.log(i.price)
                              let price = Number(i.price);
                              FixConsumPrice += price;
                         }
                    }

                    console.log("()()() FixConsumPrice", FixConsumPrice)
                    console.log("()()() FixConsumProduct", FixConsumProduct)
                    console.log("()()() monthSallery",monthSallery)

                    //console.log("MonthIncreasePrice", MonthIncreasePrice)
                    //console.log("TodayIncreasePrice", TodayIncreasePrice)
                    await dispatch(getFixData());
                    await dispatch(setBudgetPrice(monthSallery));

                    console.log("dispatch end")
                    return true;
               }else{
                    return true;
               }
               
          })
          // .then(response => {
          //      console.log(response)
          //      // if(response.status === 401){
          //      //      dispatch(userActions.logOut());
          //      // }else 
          //      if(response.ok){
          //           console.log(JSON.parse(response))
          //           return true;
          //      }else{
          //           return false;
          //      }
          // })
     }
}

function submitConsum(income_name, price, feeling, consumType){
     console.log("!@#  submitFixConsum / ", income_name, price, feeling, consumType);

     return (dispatch , getState) => {
          const { user : { token } } = getState();

          return fetch(`${API_URL}/salary/consum/`, {
               method:"POST",
               headers: {
                    Authorization : `JWT ${token}`,
                     "Content-Type" : "application/json"
               },
               body: JSON.stringify({
                    income_name,
                    price,
                    feeling,
                    consumType
               })
               
          })
          .then(response => {
               if(response.ok){
                    console.log(response)
                    return response.json()
               }else{
                    return false;
               }
               
          })
          .then( json => {
               // response 기준으로 loacl storage 저장

               console.log("response created_at : ", json.created_at)
               //console.log("response enrollId : ", json.enrollId)
               dispatch(setFixData(json))
               return true;
          })
          // .then(response => {
          //      console.log(response)
          //      // if(response.status === 401){
          //      //      dispatch(userActions.logOut());
          //      // }else 
          //      if(response.ok){
          //           console.log(JSON.parse(response))
          //           return true;
          //      }else{
          //           return false;
          //      }
          // })
     }
}

// Initial State

// 유저가 앱을 처음받고 첫 로그인화면때는 false
// 로그인 후에는 state를 폰에 저장 
const initialState = {
     TodayMealProduct : [],
     TodayMealPrice : 0,
     MonthMealProduct : [],
     MonthMealPrice : 0,

     TodayPurchaseProduct : [],
     TodayPurchasePrice : 0,
     MonthPurchaseProduct :[],
     MonthPurchasePrice : 0,

     product : [],

     MonthIncreaseProduct : [],
     MonthIncreasePrice : 0,
     TodayIncreaseProduct : [],
     TodayIncreasePrice : 0,

     AllIncreaseData : [],
     AllMealData : [],
     AllPurchaseData : [],

     TodayReportData : [],
     MonthReportData : [],

     ReportIncreaseTodayPrice : 0, 
     ReportMealTodayPrice : 0, 
     ReportPurchaseTodayPrice :0 ,

     ReportIncreaseMonthPrice : 0, 
     ReportMealMonthPrice : 0, 
     ReportPurchaseMonthPrice :0 ,

     FixConsumProduct : [],
     FixConsumPrice : 0,

     BudgetPrice : 0

};

// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     switch(action.type){
          case SET_DATA : 
               return applySetData(state, action);

          case SET_DATA_MEAL :
               return applysetDataMeal(state, action);
          case SET_DATA_MEAL_MONTH :
               return applysetDataMealMonth(state, action);

          case SET_DATA_PURCHASE :
               return applysetDataPurchase(state, action);
          case SET_DATA_PURCHASE_MONTH :
               return applysetDataPurchaseMonth(state, action);

          case SET_DATA_TODAY_INCREASE :
               return applysetDataTodayIncrease(state, action);
          case SET_DATA_MONTH_INCREASE :
               return applysetDataMonthIncrease(state, action);
          case GET_DATA_ALL :
               return applyGetDataAll(state, action);
          case SET_DATA_ALL :
               return applySetDataAll(state, action);
          case SET_REPORT_TODAY_DATA :
               return applySetReportToday(state, action);
          case SET_REPORT_MONTH_DATA :
               return applySetReportMonth(state, action);
          case SET_REPORT_TODAY_PRICE :
               return applySetReportPriceToday(state, action);
          case SET_REPORT_MONTH_PRICE :
               return applySetReportPriceMonth(state, action);
          case SET_FIX_DATA :
               return applySetFixData(state, action);
          case SET_BUDGET_PRICE:
               return applySetBudgetPrice(state, action);
          default : 
               return state;
          }
}


// Reducer Functions
function applySetReportPriceToday(state, action){
     const {ReportIncreaseTodayPrice, ReportMealTodayPrice, ReportPurchaseTodayPrice} = action;
     return {
          ...state,
          ReportIncreaseTodayPrice,
          ReportMealTodayPrice,
          ReportPurchaseTodayPrice
     }
}

function applySetReportPriceMonth(state, action){
     const {ReportIncreaseMonthPrice, ReportMealMonthPrice, ReportPurchaseMonthPrice} = action;
     return {
          ...state,
          ReportIncreaseMonthPrice, 
          ReportMealMonthPrice, 
          ReportPurchaseMonthPrice
     }
}


function applySetReportToday(state, action){
     const { TodayReportData } = action
     return {
          ...state,
          TodayReportData
     }
}

function applySetReportMonth(state, action){
     const { MonthReportData } = action
     return {
          ...state,
          MonthReportData
     }
}

function applyGetDataAll(state, action){
     //const { AllIncreaseData , AllMealData, AllPurchaseData} = action
     return {
          ...state,
          AllIncreaseData,
          AllMealData,
          AllPurchaseData
     }
}

function applySetDataAll(state, action){
     console.log(action);
     const { data } = action
     console.log("applySetDataAll type : ", data.type , "json : " , data.json)
     if(data.type === 0){
          return {
               ...state,
               AllIncreaseData :  data.json,
          }
     }else if(data.type === 1){
          return {
               ...state,
               AllMealData :  data.json,
          }
     }else{
          return {
               ...state,
               AllPurchaseData :  data.json
          }
     }
     
}

function applysetDataMonthIncrease(state, action){
     const { MonthIncreaseProduct, MonthIncreasePrice } = action;

     console.log("applysetDataMonthIncrease" , MonthIncreasePrice)
     console.log("applysetDataMonthIncrease" , MonthIncreasePrice)

     return {
          ...state,
          MonthIncreaseProduct,
          MonthIncreasePrice,
     }
}
function applysetDataTodayIncrease(state, action){
     const { TodayIncreaseProduct, TodayIncreasePrice } = action;
     console.log("applysetDataTodayIncrease")
     //console.log("applysetDataTodayIncrease" , TodayIncreaseProduct)
     //console.log("applysetDataTodayIncrease" , TodayIncreasePrice)

     return {
          ...state,
          TodayIncreaseProduct,
          TodayIncreasePrice
     }
}

function applysetDataMeal(state, action){
     const { TodayMealProduct, TodayMealPrice } = action;
     
     //console.log("applysetDataMeal" , TodayMealProduct)
     console.log("applysetDataMeal" , TodayMealPrice)

     return {
          ...state,
          TodayMealProduct,
          TodayMealPrice
     }
}

function applysetDataMealMonth(state, action){
     const { MonthMealProduct, MonthMealPrice } = action;
     
     //console.log("applysetDataMeal" , TodayMealProduct)
     console.log("applysetDataMeal" , MonthMealPrice)

     return {
          ...state,
          MonthMealProduct,
          MonthMealPrice
     }
}

function applysetDataPurchase(state, action){
     const { TodayPurchaseProduct, TodayPurchasePrice } = action;

     console.log("applysetDataPurchase" , TodayPurchasePrice)
     return {
          ...state,
          TodayPurchaseProduct,
          TodayPurchasePrice
     }
}

function applysetDataPurchaseMonth(state, action){
     const {MonthPurchaseProduct, MonthPurchasePrice} = action;

     return {
          ...state,
          MonthPurchaseProduct,
          MonthPurchasePrice
     }
}

function applySetBudgetPrice(state, action){
     const { FixConsumPrice }  = state;
     const { monthSallery } = action;
     console.log("@#@#@# applySetBudgetPrice")
     //console.log("@#@#@# monthSallery", monthSallery)
     //console.log("@#@#@# FixConsumPrice", FixConsumPrice)
    // console.log("Budget price = " , monthSallery - FixConsumPrice )
     return {
          ...state,
          BudgetPrice : monthSallery - FixConsumPrice 
     }
}

function applySetFixData(state, action){
     const { FixConsumProduct, FixConsumPrice } = action;
     console.log("@#@#@# applySetFixData")
     //console.log("applyFix : ", FixConsumProduct , FixConsumPrice)
     return {
          ...state,
          FixConsumProduct,
          FixConsumPrice
     }
}

async function applySetData(state, action){

     const { data } = action;
     const id = data.created_at
     moment(id);
     //console.log("id : " , moment(id).format("YYYYMMDD-hhmmss"))

     const existingProducts = await AsyncStorage.getItem('products');

     let newProduct = JSON.parse(existingProducts);
     //console.log(existingProducts)
     
     if( !newProduct ){
          console.log("로컬 스토리지 비어있으니까 초기화")
          newProduct = []
     }

     const productToBeSaved = { 
          'id':moment(id).format("YYYYMMDD-hhmmss"),
          'data':{
               'create_at': data.created_at, 
               'income_name': data.income_name, 
               'price': data.price, 
               'feeling': data.feeling, 
               'consumType': data.consumType, 
          }
     }

     await newProduct.push( productToBeSaved )

     await AsyncStorage.setItem( 'products', JSON.stringify(newProduct))
     //console.log("newProduct", newProduct)

     //const product = await AsyncStorage.getItem('products');
          
          
          //console.log(JSON.parse(product))
          //console.log("date", date);

     
     
     // if(!newProduct){
     //      await console.log("products",AsyncStorage.getItem("products"));
     // }
     
     //console.log("reducer action object id : ", moment(id).format("YYYYMMDD-hhmmss") , "data : " , productToBeSaved)
     return {  
          ...state,
          product : newProduct
     }
}

// Exports
const actionCreators = {
     //login,
     submitConsum,
     submitFixConsum,

     getDataMealToday,
     getDataMealMonth,

     getDataPurchaseToday,
     getDataPurchaseMonth,

     getDataIncreaseToday,
     getDataIncreaseMonth,

     getDataPriceAll,
     getAllData,

     getReportDataMonth,
     getReportDataToday,

     uploadPhoto,
     getFixData,

     deleteFixData
}

export { actionCreators };


// Default Reducer Export
export default reducer