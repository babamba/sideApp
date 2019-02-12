// Imports
//import { API_URL, FB_APP_ID } from "../../constant";
import { AsyncStorage } from "react-native";
import { Permissions, Notifications, Facebook } from "expo";
// Actions
const LOG_IN = "LOG_IN";

// Action Creators
function setLogIn(token){
     return {
          type: LOG_IN,
          token
     }
}

// API Actions

// API Actions
// function login(username, password){
//      return dispatch => {
//           console.log(`${API_URL}/rest-auth/login/`);
//           return fetch(`${API_URL}/rest-auth/login/`, {
//                method: "POST",
//                headers : {
//                     "Content-Type" : "application/json"
//                },
//                body: JSON.stringify({
//                     username,
//                     password
//                })
//           })
//           .then(response => response.json())
//           .then(json => {
//                if(json.user && json.token){
//                     //console.log(json)
//                     dispatch(setLogIn(json.token))
//                     dispatch(setUser(json.user))
//                     return true
//                }else{
//                     console.log("unable login")
//                     return false;
//                }
//           })
//           // .catch(function(error){
//           //      console.log("error message")
//           //      console.log(error);
//           // })
//      }
// }

// Initial State

// 유저가 앱을 처음받고 첫 로그인화면때는 false
// 로그인 후에는 state를 폰에 저장 
const initialState = {
     isLoggedIn: false
};

// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     return state;
}

// Reducer Functions

// async function applyLogOut(state, action){
//      await AsyncStorage.clear();
//      const { user } = action;
//      return {
//           ...state,
//           isLoggedIn:false,
//           token:""
//      }
// }

// Exports
const actionCreators = {
     //login,
}

export { actionCreators };


// Default Reducer Export
export default reducer