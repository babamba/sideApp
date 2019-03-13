// Imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";
import { Permissions, Notifications, Facebook } from "expo";
import moment from "moment";
// Actions

const AlREADY_LAUNCH = "AlREADY_LAUNCH";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT"
const SET_USER = "SET_USER";

const SET_DATA = 'SET_DATA';
const SET_DATA_MEAL = 'SET_DATA_MEAL';
const SET_DATA_PURCHASE = 'SET_DATA_PURCHASE'

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

function setDataPurchaseToday(TodayPurchaseProduct, currentPrice){
     return {
          type: SET_DATA_PURCHASE,
          TodayPurchaseProduct, //format("YYYYMMDD-hhmmss")
          TodayPurchasePrice : currentPrice
     }
}


function getDataPurchaseToday(date){
     return async (dispatch) => {
          const product = await AsyncStorage.getItem('products');
          
          //console.log(JSON.parse(product))
          //console.log("date", date);

          const TodayPurchaseProduct= [];
          let TodayPurchasePrice = 0;

          if(product){
               for (let i of JSON.parse(product)) {
                    let array = TodayPurchaseProduct;
                    //console.log("index : " , i);
                    let id = i.id;
                    let type = Number(i.data.consumType);
     
                    let strArray = id.split("-")
                    //console.log("date of dataSet" , strArray[0])
                    //console.log(type)
                    //console.log(typeof type)
     
     
                    if(strArray[0] === date && type === 2){
                         array.push(i)
                    }
               }

               if(TodayPurchaseProduct.length > 0){
                    for (let i of TodayPurchaseProduct) {
                         //console.log("index : " , i);
                         let price = Number(i.data.price);
                         TodayPurchasePrice += price;
                    }
               }

               await dispatch(setDataPurchaseToday(TodayPurchaseProduct, TodayPurchasePrice));
          }

          return TodayPurchaseProduct;
     }
}

function getDataMealToday(date){
     return async(dispatch) => {
          
          const product = await AsyncStorage.getItem('products');
          
          
          //console.log(JSON.parse(product))
          //console.log("date", date);

          const TodayMealProduct= [];
          let TodayMealPrice = 0;

          if(product){
               for (let i of JSON.parse(product)) {
                    let array = TodayMealProduct;
                    //console.log("index : " , i);
                    let id = i.id;
                    let type = Number(i.data.consumType);
     
                    let strArray = id.split("-")
                    //console.log("date of dataSet" , strArray[0])
                    //console.log(type)
                    //console.log(typeof type)
     
     
                    if(strArray[0] === date && type === 1){
                         array.push(i)
                    }
               }

               const Today = moment(new Date());
               

               if(TodayMealProduct.length > 0){
                    for (let i of TodayMealProduct) {
                         let price = Number(i.data.price);
                         TodayMealPrice += price;
                    }
               }
     
               await dispatch(setDataMealToday(TodayMealProduct, TodayMealPrice));
          }

          return TodayMealProduct;
     }
}

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
     TodayPurchaseProduct : [],
     TodayMealPrice : 0,
     TodayPurchasePrice : 0,
     product : []

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
          case SET_DATA_PURCHASE :
               return applysetDataPurchase(state, action);
          default : 
               return state;
          }
}

// Reducer Functions

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

function applysetDataPurchase(state, action){
     const { TodayPurchaseProduct, TodayPurchasePrice } = action;

     console.log("applysetDataPurchase" , TodayPurchasePrice)
     return {
          ...state,
          TodayPurchaseProduct,
          TodayPurchasePrice
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
     getDataPurchaseToday
}

export { actionCreators };


// Default Reducer Export
export default reducer