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
const SET_DATA = 'SET_DATA'

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

};

// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     switch(action.type){
          case SET_DATA : 
               return applySetData(state, action);
          default : 
               return state;
          }
}

// Reducer Functions

async function applySetData(state, action){
     const { data } = action;
     const id = data.created_at
     moment(id);
     console.log("id : " , moment(id).format("YYYYMMDD-hhmmss"))

     const existingProducts = await AsyncStorage.getItem('products');

     let newProduct = JSON.parse(existingProducts);
     console.log(existingProducts)
     
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

     newProduct.push( productToBeSaved )

     await AsyncStorage.setItem( 'products', JSON.stringify(newProduct))
     
     if(!newProduct){
          await console.log("products",AsyncStorage.getItem("products"));
     }
     
     //console.log("reducer action object id : ", moment(id).format("YYYYMMDD-hhmmss") , "data : " , productToBeSaved)
     return {  
          ...state
     }
}

// Exports
const actionCreators = {
     //login,
     submitConsum
}

export { actionCreators };


// Default Reducer Export
export default reducer