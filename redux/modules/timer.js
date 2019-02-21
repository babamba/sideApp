// Imports
import { API_URL } from "../../constants";
// Actions

const START_TIMER = 'START_TIMER';

// 달마다 바뀔수있는 정보들 초당버는돈, 월의 총 주수 
const SET_SECONDS_MONEY = 'SET_SECONDS_MONEY';
const SET_WORKING_WEEKDAY = 'SET_WORKING_WEEKDAY';

// 계산 후 변경될 값들 -> 컴포넌트 render
const ADD_SECOND = 'ADD_SECOND';
const ADD_PERCENT = 'ADD_PERCENT';

// 기본적으로 계산에 필요한 시작떄 입력하는 월급 , 근무시작시간, 근무종료시간, 근무요일수 
const SET_MONTH_SALLERY = 'SET_MONTH_SALLERY'
const SET_END_HOUR = 'SET_END_HOUR';
const SET_START_HOUR = 'SET_START_HOUR';
const SET_ELAPSED_TIME = 'SET_ELAPSED_TIME';

// Action Creators

function setStartHour(){
     return {
          type : SET_START_HOUR
     }
}

function setEndHour(){
     return {
          type : SET_END_HOUR
     }
}

// 초당 버는돈 * 현재 시간
function SetSecondMoney(sallery){
    return {
        type: SET_SECONDS_MONEY,
        sallery
    }
}

// 몇주 일하는지  -> 한달에 몇주인지 적용
function setWorkingWeekDay(){
    return {
        type: SET_WORKING_WEEKDAY
    }
}

// 근무시작으로부터 흐른 근무시간
function addSecond(){
    return {
        type: ADD_SECOND,
    }
}

// 근무시간 퍼센트 state
function addPercent(percent){
     return {
          type:ADD_PERCENT,
          percent
     }
}

function startTimer(){
     return {
          type: START_TIMER
     }
}

function setElapsedTime(elapsedTime){
     return {
          type: SET_ELAPSED_TIME,
          elapsedTime
     }
}

//API Actions
function login(username, password){
     const user = { propfile : { "name" : "test"}}
    return dispatch => {
          dispatch(setLogIn("testToken"))
          dispatch(setUser(user))
          return true;
    }
}

// Initial State

// 유저가 앱을 처음받고 첫 로그인화면때는 false
// 로그인 후에는 state를 폰에 저장 
const initialState = {
     monthSallery : 2200000,
     workingWeekDay : 5,
     workingHour: 8,
     startHour:10,
     endHour:19,
     currentSecondSallery:0,
     elapsedTime: 0,
     currentDate:null,
     isPlaying:true,
     dayInMonth:0,
     workingTime: 32400,
     percent: 0
};




// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     switch(action.type){
          case START_TIMER :
               return applyStart(state, action);
          case SET_SECONDS_MONEY :
               return applySetSecondMoney(state, action);
          case ADD_SECOND : 
               return applyAddSecond(state, action);
          case SET_ELAPSED_TIME :
               return applySetElapsedTime(state, action);
          case ADD_PERCENT :
               return applyAddPercent(state, action);
          default : 
               return state;
          }
}

// Reducer Functions

function applySetElapsedTime(state, action){
     const elapsedTime = action;
     return {
          ...state,
          elapsedTime: elapsedTime
     }
}

function applySetSecondMoney(state, action) {
     // 현재 번 초당 돈 변경
     const { sallery } = action;
     console.log("setSconMoney : ", state.currentSecondSallery + sallery , "/ sallery : " , sallery )
     return {
          ...state,
          currentSecondSallery : state.currentSecondSallery + sallery
     }
}

function applyStart(state, action){
     return {
          ...state,
          isPlaying:true
     }
}

function applyAddPercent(state, action){
     const { percent } = action;
     if(action !== percent){
          return{
               ...state,
               percent
          }
     }
}

function applyAddSecond(state, action){
     const { secondSallery } = action;
     if(state.elapsedTime < state.workingTime){
          return {
              ...state,
              elapsedTime : state.elapsedTime + 1,
          }
      } else {
          return {
              ...state,
              //isPlaying: false,
              isPlaying: true,
          }
      }
}


// Exports
const actionCreators = {
     //login,
     addSecond,
     addPercent,
     SetSecondMoney
}

export { actionCreators };


// Default Reducer Export
export default reducer