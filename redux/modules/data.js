// Imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";
import { Permissions, Notifications, Facebook } from "expo";
//import { user } from "./user";

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

// function getDataIncreaseMonth(date){
//      return async(dispatch, getState) => {
//           const { timer : { standardMonth, salaryDay } } = getState();
//           const product = await AsyncStorage.getItem('products');
          
//           console.log("standardMonth : ", standardMonth)
//           //console.log(JSON.parse(product))
//           //console.log("date", date);

//           const MonthIncreaseProduct = [];
//           const TodayIncreaseProduct = [];
//           let MonthIncreasePrice = 0;
//           let TodayIncreasePrice = 0;

//           const StartDate = moment(new Date());
//           StartDate.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})
          
//           const EndDate = moment(new Date());
//           EndDate.set({date: salaryDay, month:standardMonth-1, hour:0, minute:0, second:0})

//           //console.log('StartDate',StartDate.format('YYYYMMDD'))
//           //console.log('EndDate',EndDate.format('YYYYMMDD'))

//           if(product){
//                for (let i of JSON.parse(product)) {
//                     let array = MonthIncreaseProduct;
//                     let TodayArray = TodayIncreaseProduct
//                     //console.log(product)
//                     //console.log("index : " , i);
//                     let id = i.id;
//                     let type = Number(i.data.consumType);
//                     //console.log("_@_@_@ type",type)
     
//                     let strArray = id.split("-")
//                     //console.log("#_#_#_#_#_#_#_# date of dataSet" , strArray[0])
//                     //console.log("#_#_#_#_#_#_#_# date of dataSet" , )
//                     //console.log(type)
//                     //console.log(typeof type)
                    
//                     let confirmDate = strArray[0]
//                     //console.log("confirmDate", confirmDate)
//                     //console.log("object length ",Object.keys(confirmDate).length)


//                     moment(confirmDate);
//                     // console.log("moment confirmDate", confirmDate)
                    

//                     // if(confirmDate >= StartDate.format('YYYYMMDD')){
//                     //      console.log("confirmDate >= StartDate.format('YYYYMMDD') true")
//                     // }else{
//                     //      console.log("confirmDate >= StartDate.format('YYYYMMDD') false")
//                     // }
     
//                     if(confirmDate >= StartDate.format('YYYYMMDD') && type === 0 && confirmDate <= EndDate.format('YYYYMMDD') ){
//                          //console.log("_@_@_@ id", i.id)
//                          //console.log("_@_@_@ type",type)
//                          array.push(i)
//                     }

//                     if(type=== 0 && confirmDate === date){
//                          TodayArray.push(i)
//                     }
//                }

//                if(MonthIncreaseProduct.length > 0){
//                     for (let i of MonthIncreaseProduct) {
//                          let price = Number(i.data.price);
//                          MonthIncreasePrice += price;
//                     }
//                }

//                if(TodayIncreaseProduct.length >0 ){
//                     for (let i of TodayIncreaseProduct) {
//                          let price = Number(i.data.price);
//                          TodayIncreasePrice += price;
//                     }
//                }

//                //console.log("MonthIncreasePrice", MonthIncreasePrice)
//                //console.log("TodayIncreasePrice", TodayIncreasePrice)
     
//                await dispatch(setDataIncrease(MonthIncreaseProduct, MonthIncreasePrice, TodayIncreasePrice));
//           }

//           return MonthIncreaseProduct;
//      }
// }

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
function submitConsum(income_name, price, feeling, consumType){
     console.log("!@# submitConsum / ", income_name, price, feeling, consumType);

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
               dispatch(setData(json))
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
     TodayIncreasePrice : 0

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
          default : 
               return state;
          }
}

// Reducer Functions
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

     console.log("applysetDataTodayIncrease" , TodayIncreaseProduct)
     console.log("applysetDataTodayIncrease" , TodayIncreasePrice)

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

     console.log();
     return {
          ...state,
          MonthPurchaseProduct,
          MonthPurchasePrice
     }
}

async function applySetData(state, action){

     const { data } = action;
     const id = data.created_at
     moment(id);
     console.log("id : " , moment(id).format("YYYYMMDD-hhmmss"))

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

     getDataMealToday,
     getDataMealMonth,

     getDataPurchaseToday,
     getDataPurchaseMonth,

     getDataIncreaseToday,
     getDataIncreaseMonth
}

export { actionCreators };


// Default Reducer Export
export default reducer