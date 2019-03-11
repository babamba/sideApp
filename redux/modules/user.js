// Imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";
import { Permissions, Notifications, Facebook } from "expo";
// Actions

const AlREADY_LAUNCH = "AlREADY_LAUNCH";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT"
const SET_USER = "SET_USER";

// Action Creators
function setLogIn(token){
     return {
          type: LOG_IN,
          token
     }
}

function setUser(user){
     return {
          type: SET_USER,
          user
     }
}

function setAlreadyLaunch(already){
     console.log("!@# setAlreadyLaunch / " + already);
     return {
          type : AlREADY_LAUNCH,
          already
     }
}


// API Actions
// function login(username, password){
//      const user = { propfile : { "name" : "test"}}
//     return dispatch => {
//           dispatch(setLogIn("testToken"))
//           dispatch(setUser(user))
//           return true;
//     }
// }

function logOut() {
     return { 
          type: LOG_OUT 
     };
}


// API Actions
function login(username, password){
     return dispatch => {
          console.log(`${API_URL}/rest-auth/login/`);
          return fetch(`${API_URL}/rest-auth/login/`, {
               method: "POST",
               headers : {
                    "Content-Type" : "application/json"
               },
               body: JSON.stringify({
                    username,
                    password
               })
          })
          .then(response => response.json())
          .then(json => {
               if(json.user && json.token){
                    //console.log(json)
                    dispatch(setLogIn(json.token))
                    dispatch(setUser(json.user))
                    console.log(json.token)
                    return true
               }else{
                    console.log("unable login")
                    return false;
               }
          })
          // .catch(function(error){
          //      console.log("error message")
          //      console.log(error);
          // })
     }
}

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
               console.log(response)
               // if(response.status === 401){
               //      dispatch(userActions.logOut());
               // }else 
               if(response.ok){
                    return true;
               }else{
                    return false;
               }
          });
     }
}

function signUp(username, password, email){
     return function(dispatch){
         fetch(`${API_URL}/rest-auth/registration/`, {
             method : "POST",
             headers:{
                 "Content-Type" : "application/json"
             },
             body : JSON.stringify({
                 //access_token: access_token
                 username,
                 password1 : password,
                 password2 : password,
                 email
             })
         })
         .then(response => response.json())
         .then(json => {
             if(json.token){
                    dispatch(setLogIn(json.token))
                    dispatch(setUser(json.user))
             }
         })
     }
 }


// Initial State

// 유저가 앱을 처음받고 첫 로그인화면때는 false
// 로그인 후에는 state를 폰에 저장 
const initialState = {
     isLoggedIn: false,
     already: false
};

// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     switch(action.type){
          case AlREADY_LAUNCH : 
               return applyAlreadyLaunch(state, action);
          case LOG_IN :
               return applyLogIn(state, action);
          case SET_USER :
               return applySetUser(state, action);  
          case LOG_OUT :
               return applyLogOut(state, action);
          default : 
               return state;
          }
}

// Reducer Functions

async function applyAlreadyLaunch(state, action){
     await AsyncStorage.setItem('already', 'true');
     const { already } = action;
     console.log("reducer action alreadyLaunched : " , already)
     return {  
          ...state,
          already : already
     }
}

// function applySetToken(state, action) {
//      const { token } = action;
//      await AsyncStorage.setItem("jwt", token);
//      return {
//        ...state,
//        isLoggedIn: true,
//        token: token
//      };
// }

function applyLogIn(state, action){
     const { token } = action;
     return {
          ...state,
          isLoggedIn : true,
          token
     }
}

function applySetUser(state, action){
     const { user } = action;
     console.log(user);
     return {
          ...state,
          profile : user
     }
}

function applyLogOut(state, action){
     const { user } = action;
     return {
          ...state,
          isLoggedIn:false,
          token:""
     }
}

// Exports
const actionCreators = {
     //login,
     setAlreadyLaunch,
     login,
     logOut,
     signUp,
     submitConsum
}

export { actionCreators };


// Default Reducer Export
export default reducer