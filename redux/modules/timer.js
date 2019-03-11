// Imports
import { API_URL, SALARY_PAY_TYPE } from "../../constants";
import moment from "moment";
// Actions

const START_TIMER = 'START_TIMER';

// 달마다 바뀔수있는 정보들 초당버는돈, 월의 총 주수 
const SET_SECONDS_MONEY = 'SET_SECONDS_MONEY';
const SET_WORKING_WEEKDAY = 'SET_WORKING_WEEKDAY';

// 기본적으로 계산에 필요한 시작떄 입력하는 월급 , 근무시작시간, 근무종료시간, 근무요일수 

const SET_MONTH_SALLERY = 'SET_MONTH_SALLERY'
const SET_END_HOUR = 'SET_END_HOUR';
const SET_START_HOUR = 'SET_START_HOUR';
const SET_SALARY_DAY = 'SET_SALARY_DAY'
const SET_SELECT_WEEK = 'SET_SELECT_WEEK'
const SET_WORKING_HOURS = 'SET_WORKING_HOURS'
const SET_STANDARD_MONTH = 'SET_STANDARD_MONTH'
const SET_DATA_YN ='SET_DATA_YN'

const SET_ELAPSED_TIME = 'SET_ELAPSED_TIME';
const SET_TODATE = 'SET_TODATE';

// 계산에 사용될 Date객체 
const TODAY_DATE = new Date();

// 계산에 필요한 연원일
const getDay = TODAY_DATE.getDay();
const getDate = TODAY_DATE.getDate();
const getMonth = TODAY_DATE.getMonth();
const getYear = TODAY_DATE.getFullYear();

// Action Creators

function startTimer(){
     return {
          type: START_TIMER
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

function setSalary(monthSallery){
     return{
          type: SET_MONTH_SALLERY,
          monthSallery
     }
}

function setSelectWeek(selectWeek){
     return{
          type:SET_SELECT_WEEK,
          selectWeek
     }
}

function setWorkingWeekDay(workingWeekDay){
     return{
          type:SET_WORKING_WEEKDAY,
          workingWeekDay
     }
}

function setSalaryDay(salaryDay){
     return{
          type:SET_SALARY_DAY,
          salaryDay
     }
}

function setWorkingHours(workingHour){
     return {
          type:SET_WORKING_HOURS,
          workingHour
     }
}

function setStandardMonth(standardMonth){
     return {
          type:SET_STANDARD_MONTH,
          standardMonth
     }
}

function setSubmitData(){
     return {
          type:SET_DATA_YN
     }
}

function setTodate(todayDate){
     return {
          type : SET_TODATE,
          todayDate
     }
}

function submitData(monthSallery, salaryDay, selectWeek, workingWeekDay , startHour, endHour){
     //const user = { propfile : { "name" : "test"}}
     const workingHour = endHour - startHour;
     
     //현재날짜
     //const STANDARD_MONTH_DATE = new Date();
     const STANDARD_MONTH_DATE = moment(new Date());
     //console.log(STANDARD_MONTH_DATE.format('YYYY-MM-DD HH:mm'));

     const getToYear = STANDARD_MONTH_DATE.year();
     const getToMonth = (STANDARD_MONTH_DATE.month()+1);
     const getToDate = STANDARD_MONTH_DATE.date();

     // const getToYear  = Number(STANDARD_MONTH_DATE.toLocaleDateString("de-DE", {year: "numeric"}));
     // const getToMonth = Number(STANDARD_MONTH_DATE.toLocaleDateString("de-DE", {month: "2-digit"}));
     // const getToDay = Number(STANDARD_MONTH_DATE.toLocaleDateString("de-DE", {day: "numeric"}));
     
     console.log("getToYear getToMonth : " , getToYear ,"년 " , getToMonth , "월 ", getToDate , "일")
     const standardMonth = getToMonth;
     
     // //월급날짜 
     const tempSalaryDate = moment(STANDARD_MONTH_DATE);
     tempSalaryDate.date(salaryDay)


     console.log("salaryDay : " , salaryDay)
     console.log("tempSalaryDate : ", tempSalaryDate.format('YYYY-MM-DD HH:mm'));

     console.log("STANDARD_MONTH_DATE : " , STANDARD_MONTH_DATE.format('YYYY-MM-DD HH:mm'))
     console.log("standardMonth : " , standardMonth)

     // 현재 날짜 > 월급날짜 
     if( STANDARD_MONTH_DATE < tempSalaryDate){
          console.log("standardMonth 1 : " , standardMonth + 1 )
     
     // 현재 날짜 < 월급날짜 
     }else if(STANDARD_MONTH_DATE > tempSalaryDate){
          console.log("standardMonth  : " , standardMonth )
     }

     return dispatch => {
               dispatch(setSalary(monthSallery));
               dispatch(setSalaryDay(salaryDay));
               dispatch(setSelectWeek(selectWeek));
               dispatch(setWorkingWeekDay(workingWeekDay));

               dispatch(setStartHour(startHour));
               dispatch(setEndHour(endHour));
               dispatch(setWorkingHours(workingHour));
               dispatch(setStandardMonth(standardMonth));

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
     monthSallery : 0,
     selectWeek: [],  //일하는 요일 배열 
     workingWeekDay : 0, // 카운팅
     workingHour: 0,
     startHour:0,
     endHour:0,
     isPlaying:false,
     salaryDay : 0,
     salaryPayType : SALARY_PAY_TYPE[0],
     todayDate:null,

     // 월급계산때 사용할 달 

     // 오늘이 3월 18 일이고 월급날이 21일 경우
     // 현재 달로 

     // 오늘이 3월 22일이고 월급날이 21일 경우
     // 다음달로 + 
     standardMonth: 0 


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
          case SET_ELAPSED_TIME :
               return applySetElapsedTime(state, action);

          //월급 등록관련
          case SET_MONTH_SALLERY :
               return applyMonthSalary(state, action);
          case SET_END_HOUR:
               return applySetEndHour(state, action);
          case SET_START_HOUR:
               return applySetStartHour(state, action);
          case SET_SALARY_DAY:
               return applySalaryDay(state, action);
          case SET_SELECT_WEEK:
               return applySelectyWeek(state, action);
          case SET_WORKING_WEEKDAY:
               return applyWorkingWeekDay(state, action);
          case SET_WORKING_HOURS:
               return applyWorkingHours(state, action);
          case SET_STANDARD_MONTH:
               return applySetStandardMonth(state, action)
          case SET_DATA_YN:
               return applySetData(state, action);
          case SET_TODATE:
               return applySetTodate(state, action)
          default : 
               return state;
          }
}

// Reducer Functions
// 한달 월급
function applyMonthSalary(state, action){
     const { monthSallery } = action;
     return{
          ...state,
          monthSallery
     }
}

// 월급 날
function applySalaryDay(state, action){
     const { salaryDay } = action;
     return{
          ...state,
          salaryDay
     }
}


//일하는 날 배열정보
function applySelectyWeek(state, action){
     const { selectWeek } = action;
     console.log("applySelectWeek : " , selectWeek)
     return{
          ...state,
          selectWeek
     }
}

//일하는 날 배열길이 카운팅
function applyWorkingWeekDay(state, action){
     const { workingWeekDay } = action;
     console.log("workingWeekDay insert : ", workingWeekDay)
     return{
          ...state,
          workingWeekDay
     }
}

// 하루 일하는 시간
function applyWorkingHours(state, action){
     const { workingHour } = action;
     return {
          ...state,
          workingHour
     }
}

// 근무시작 시간
function applySetStartHour(state, action){
     const { startHour } = action;
     return{
          ...state,
          startHour
     }
}

// 근무종료 시간
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
          isSetData : true,
          isPlaying : true
     }
}

function applySetStandardMonth(state, action){
     const { standardMonth } = action;
     console.log("standardMonth insert : ", standardMonth)
     return {
          ...state,
          standardMonth
     }
}

function applySetTodate(state, action){
     const { todayDate } = action;
     console.log('today : ' , todayDate.format('YYYY년 - MM월 - DD일 HH시:mm분 초'));
     return {
          ...state,
          todayDate
     }
}

// Exports
const actionCreators = {
     submitData,
     setTodate
}

export { actionCreators };


// Default Reducer Export
export default reducer