// Imports
import { API_URL, SALARY_PAY_TYPE } from "../../constants";
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
const SET_SALARY_DAY = 'SET_SALARY_DAY'
const SET_SALARY_WEEK = 'SET_SALARY_WEEK'
const SET_DATA_YN ='SET_DATA_YN'

const SET_ELAPSED_TIME = 'SET_ELAPSED_TIME';



// Action Creators

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


//기본입력정보
function setStartHour(startHour){
     return {
          type : SET_START_HOUR,
          startHour
     }
}

function setEndHour(endHour){
     return {
          type : SET_END_HOUR,
          endHour
     }
}

function setSalary(salary){
     return{
          type: SET_MONTH_SALLERY,
          salary
     }
}

function setSalaryWeek(salaryWeek){
     return{
          type:SET_SALARY_WEEK,
          salaryWeek
     }
}

function setSalaryDay(salaryDay){
     return{
          type:SET_SALARY_DAY,
          salaryDay
     }
}

function setSubmitData(){
     return {
          type:SET_DATA_YN
     }
}

function submitData(salary, salaryDay, salaryWeek, startHour, endHour){
     //const user = { propfile : { "name" : "test"}}
     return dispatch => {
               dispatch(setSalary(salary));
               dispatch(setSalaryDay(salaryDay))
               dispatch(setSalaryWeek(salaryWeek))
               dispatch(setStartHour(startHour))
               dispatch(setEndHour(endHour))
               dispatch(setSubmitData());
               return true;
     }


      
     // return dispatch => {
     //      console.log(`${API_URL}/rest-auth/login/`);
     //      return fetch(`${API_URL}/rest-auth/login/`, {
     //           method: "POST",
     //           headers : {
     //                "Content-Type" : "application/json"
     //           },
     //           body: JSON.stringify({
     //                username,
     //                password
     //           })
     //      })
     //      .then(response => response.json())
     //      .then(json => {
     //           if(json.user && json.token){
     //                //console.log(json)
     //                dispatch(setLogIn(json.token))
     //                dispatch(setUser(json.user))
     //                return true
     //           }else{
     //                console.log("unable login")
     //                return false;
     //           }
     //      })
     //      // .catch(function(error){
     //      //      console.log("error message")
     //      //      console.log(error);
     //      // })
     // }
     // return {
     //      type: SET_SALARY_DATA,
     //      salary,
     //      salaryDay,
     //      salaryWeek
     // }
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
     isSetData : false,
     monthSallery : 2200000,
     workingWeekDay : 5,
     workingHour: 8,
     startHour:9,
     endHour:18,
     currentSecondSallery:0,
     elapsedTime: 0,
     currentDate:null,
     isPlaying:true,
     dayInMonth:0,
     workingTime: 32400,
     percent: 0,
     salaryStartDay : 21,
     salaryPayType : SALARY_PAY_TYPE[0]
};




// Reducer

// 페이지를 새로고침할때 마다 모든 state는 무효가 되고 intialState 를 얻게된다.
// 유저가 앱을 처음으로 열떄의 state
function reducer(state = initialState, action){
     switch(action.type){

          //타이머 관련
          case START_TIMER :
               return applyTimerStart(state, action);
          case SET_SECONDS_MONEY :
               return applySetSecondMoney(state, action);
          case ADD_SECOND : 
               return applyAddSecond(state, action);
          case SET_ELAPSED_TIME :
               return applySetElapsedTime(state, action);
          case ADD_PERCENT :
               return applyAddPercent(state, action);

          //월급 등록관련
          case SET_MONTH_SALLERY :
               return applyMonthSalary(state, action);
          case SET_END_HOUR:
               return applySetEndHour(state, action);
          case SET_START_HOUR:
               return applySetStartHour(state, action);
          case SET_SALARY_DAY:
               return applySalaryDay(state, action);
          case SET_SALARY_WEEK:
               return applySalaryWeek(state, action);
          case SET_DATA_YN:
               return applySetData(state, action);

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

function applyTimerStart(state, action){
     return {
          ...state,
          isPlaying:true
     }
}

//한달월급
function applyMonthSalary(state, action){
     const { salary } = action;
     return{
          ...state,
          salary
     }
}

//월급날
function applySalaryDay(state, action){
     const { salaryDay } = action;
     return{
          ...state,
          salaryDay
     }
}

//일하는 날
function applySalaryWeek(state, action){
     const { salaryWeek } = action;
     return{
          ...state,
          salaryDay
     }
}
//근무시작 시간
function applySetStartHour(state, action){
     const { startHour } = action;
     return{
          ...state,
          startHour
     }
}

//근무종료시간
function applySetEndHour(state, action){
     const { endHour } = action;
     return{
          ...state,
          endHour
     }
}

function applySetData(state, action){
     return {
          ...state,
          isSetData : true
     }
}

// function applySetData(state, action){
//      const { salary , salaryDay, salaryWeek} = action;
//      return{
//           ...state,
//           salary,
//           salaryDay,
//           salaryWeek,
//           isSetData : false,
//      }
// }

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
     SetSecondMoney,
     submitData
}

export { actionCreators };


// Default Reducer Export
export default reducer