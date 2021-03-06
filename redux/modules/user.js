// Imports
import { API_URL } from "../../constants";
import { AsyncStorage } from "react-native";
import { actionCreators as timerActions } from "../modules/timer";
import { actionCreators as dataActions } from "../modules/data";
import { Permissions, Notifications, Facebook } from "expo";
// Actions

const AlREADY_LAUNCH = "AlREADY_LAUNCH";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT"
const SET_USER = "SET_USER";
const SET_LOCKED = "SET_LOCKED";

// Action Creators
function setLogIn(token){
     return {
          type: LOG_IN,
          token
     }
}

// Action Creators
function setLogOut(){
     return {
          type: LOG_OUT,
     }
}

function setUser(user){
     return {
          type: SET_USER,
          user
     }
}

function setLocked(value){
     return {
          type:SET_LOCKED,
          value
     }
}

function setAlreadyLaunch(launched){
     console.log("!@# setAlreadyLaunch / " + launched);
     return {
          type : AlREADY_LAUNCH,
          launched
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
     return ( dispatch, getState ) => {
          dispatch(timerActions.resetData())
          dispatch(dataActions.resetData())
          dispatch(setLogOut());
     }
}


// API Actions
function login(username, password){
     return ( dispatch, getState ) => {
          const { timer } = getState()
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
          .then(async(json) => {
               if(json.user && json.token){
                    console.log("json",json.user, json.token);

                    await dispatch(setLogIn(json.token));
                    await dispatch(timerActions.getData())

                    await dispatch(setUser(json.user))

                    

                    // if(getData){
                    //      console.log("getData",getData)
                    //      await dispatch(setUser(json.user))
                    //      console.log("able login")
                    // }
                    
                    console.log(json.token)
                    return true;
               } else {
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

function signUp(username, password, email){
     return async dispatch => {
          return fetch(`${API_URL}/rest-auth/registration/`, {
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
         .then(response => {
               if(response.ok){
                    console.log("response.json()",response)
                    //return response.json()
                    return true;
               }else{
                    return false;
               }
         })
         //.then(response => response.json())
     //     .then(json => {
     //         if(json.token){
     //                // dispatch(setLogIn(json.token))
     //                // dispatch(setUser(json.user))
     //                return true;
     //         }
     //     })
     }
 }

 function pushNotifications(type){
     return async (dispatch, getState) => {
          const { user: { token } } = getState();
          return fetch(`${API_URL}/notifications/${type}/`, {
             method : "POST",
             headers:{
                    Authorization : `JWT ${token}`,
                    "Content-Type" : "application/json"
             },
         })
         .then(response => 
               console.log(response)
          )
     //     .then(json => {
     //         if(json.token){
     //              console.log(json)
     //                //dispatch(setLogIn(json.token))
     //         }
     //     })
     }
 }


function registerForPush() {
          return async (dispatch, getState) => {
               const { user: { token } } = getState();
               const { status: existingStatus } = await Permissions.getAsync(
                    Permissions.NOTIFICATIONS
               );
          let finalStatus = existingStatus;
               if (existingStatus !== "granted") {
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                    finalStatus = status;
               }
          if (finalStatus === "denied") {
               return;
          }
     
          let pushToken = await Notifications.getExpoPushTokenAsync();
          console.log("push Token : ",pushToken);
          console.log("token " , `JWT ${token}`)
          console.log("push Token strigify : ",JSON.stringify({
               token: pushToken
          }));

          return fetch(`${API_URL}/users/push/`, {
               method:"POST",
               headers:{
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`
               },
               body: JSON.stringify({
                    token: pushToken
               })
          });
     };
}

 
// Initial State

// 유저가 앱을 처음받고 첫 로그인화면때는 false
// 로그인 후에는 state를 폰에 저장 
const initialState = {
     isLoggedIn: false,
     launched: false,
     locked: false
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
          case SET_LOCKED :
               return applyLocked(state, action);
          default : 
               return state;
          }
}

// Reducer Functions

async function applyAlreadyLaunch(state, action){
     await AsyncStorage.setItem('already', 'true');
     const { launched } = action;
     console.log("reducer action alreadyLaunched : " , launched)
     return {  
          ...state,
          launched
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

function applyLocked(state, action){
     const { value } = action;
     return {
          ...state,
          locked : value
     }
}    

function applyLogIn(state, action){
     const { token } = action;
     console.log("applyLogIn", token);
     return {
          ...state,
          isLoggedIn : true,
          token
     }
}

function applySetUser(state, action){
     const { user } = action;
     console.log("applySetUser", user);
     return {
          ...state,
          profile : user
     }
}

function applyLogOut(state, action){
     console.log("!@#!@#state",state)
     return {
          isLoggedIn:false,
          profile:"",
          token:"",
          locked: false
     }
}

// Exports
const actionCreators = {
     //login,
     setAlreadyLaunch,
     login,
     logOut,
     signUp,
     pushNotifications,
     registerForPush,
     setLocked
}

export { actionCreators };


// Default Reducer Export
export default reducer