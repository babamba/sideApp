import React, {Component} from "react";
import PropTypes from "prop-types";
import TodayScreen from "./presenter";
import { image } from "react-native";
import { SALARY_PAY_TYPE } from "../../constants";
import moment from "moment";


// 계산에 사용될 Date객체 
const TODAY_DATE = moment(new Date());

// 계산에 필요한 연원일
const getDay = TODAY_DATE.day();
const getDate = TODAY_DATE.date();
const getMonth = TODAY_DATE.month();
const getYear = TODAY_DATE.year();


// 시작날짜부터 종료날짜까지 로 수정해야함
// 지금은 이번달로만 되어있음.
dayInMonth = () =>  {
     const date = new Date();
     const year  = Number(date.toLocaleDateString("de-DE", {year: "numeric"}));
     const month = Number(date.toLocaleDateString("de-DE", {month: "2-digit"}));

     const nowDate = new Date(year, month-1, 1);
     const lastDate = new Date(year, month, 0).getDate();
     const monthSWeek = nowDate.getDay();
     const weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
     return weekSeq;
}


class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     // constructor(props){
     //      super(props);

     //      //console.log(this.props)
          
     // }

     static navigationOptions = {
          gesturesEnabled: false,
     }  


     componentWillMount(){
          console.log('TODAY componentWillMount')

          const { monthSallery, workingWeekDay , workingHour, startHour, endHour  ,isPlaying, salaryDay, salaryPayType , standardMonth} = this.props
          //console.log("props", props)
          //console.log("standardMonth" ,standardMonth)
          //console.log("salaryDay" ,salaryDay)

          // 오늘 일자 근무시작 근무종료 객체들
          //const TODAY_START_DATE = new Date(getYear, getMonth, getDate, startHour);
          const TODAY_START_DATE = moment(new Date());
          TODAY_START_DATE.set({year:getYear , date: getDate, month:getMonth,hour:startHour,minute:0, second:0})

          console.log("TODAY_START_DATE", TODAY_START_DATE.format('YYYY-MM-DD HH:mm'));

          //const TODAY_END_DATE = new Date(getYear, getMonth, getDate, endHour);
          const TODAY_END_DATE = moment(new Date());
          TODAY_END_DATE.set({year:getYear , date: getDate, month:getMonth,hour:endHour,minute:0, second:0})
          //Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_DATE)).asHours());

          //console.log("TODAY_END_DATE", TODAY_END_DATE.format('YYYY-MM-DD HH:mm'));

          //근무 시작일자 (salaryDay)
          //const SALARY_START_MONTHDAY = new Date(getYear, standardMonth-2, salaryDay, startHour);
          //const SALARY_END_MONTHDAY = new Date(getYear, standardMonth-1 , salaryDay, endHour);

          const SALARY_START_MONTHDAY = moment(new Date());
          SALARY_START_MONTHDAY.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})

          //0부터 시작임 3 = 4ㅇㅜㅓㄹ 
          // SALARY_START_MONTHDAY.date(salaryDay);
          // SALARY_START_MONTHDAY.month(standardMonth-2);
          // SALARY_START_MONTHDAY.hour(0);
          // SALARY_START_MONTHDAY.minute(0);

          const SALARY_END_MONTHDAY = moment(new Date());
          SALARY_START_MONTHDAY.set({date: salaryDay, month:standardMonth-1, hour:0, minute:0, second:0})

          // SALARY_END_MONTHDAY.date(salaryDay);
          // SALARY_END_MONTHDAY.month(standardMonth-1);
          // SALARY_END_MONTHDAY.hour(0);
          // SALARY_END_MONTHDAY.minute(0);

          //console.log("SALARY_START_MONTHDAY", SALARY_START_MONTHDAY.format('YYYY-MM-DD HH:mm'));
          //console.log("SALARY_END_MONTHDAY", SALARY_END_MONTHDAY.format('YYYY-MM-DD HH:mm'));

          const TODAY_NEW_DATE = moment();
                    
          console.log("TODAY_NEW_DATE", TODAY_NEW_DATE.format('HH시 :mm분 :ss초'))

          const CHECK_START_DATE = moment(new Date());
          CHECK_START_DATE.set({year : getYear , date: getDate, month:getMonth, hour:startHour, minute:0, second:0})

          const CHECK_END_DATE = moment(new Date());
          CHECK_END_DATE.set({year : getYear , date: getDate, month:getMonth, hour:endHour, minute:0, second:0})        
          
          //월별
          //if(salaryPayType === SALARY_PAY_TYPE[0]){
     
           //일할 시간 (고정))
           //const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
           const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
           //console.log('일할 시간: ',WORKING_SECOND);
     
           //시작 시작부터 흐른 시간
           //const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
           const INTERVAL_SECOND = moment.duration(TODAY_NEW_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000;
           console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")
     
           const WEEK_COUNT = dayInMonth();
           //console.log("weekCount",WEEK_COUNT ,"주");
     
           const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
           //console.log("percent" , PERCENT, "%");
          
           const WEEK_SALARY = (monthSallery / WEEK_COUNT);
           //console.log("weekSallery : 주간" , WEEK_SALARY, "원");
           
           //하루 일당   -> 주간급여 / 주간일하는 날수
           const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
           //console.log("workingWeekDay 1주 일하는 일수:" , workingWeekDay, "일");
           //console.log("todaySallery 하루일당" , TODAY_SALARY, "원");
     
           const hourSallery = Math.floor( TODAY_SALARY / workingHour );
           //console.log("hourSallery : 시간" , hourSallery, "원");
     
           const minuteSallery = Math.floor( hourSallery / 60 );
           //console.log("minuteSallery : 분당" , minuteSallery, "원");
     
           const SECOND_SALARY = Math.floor( minuteSallery / 60 );
           //console.log("secondSallery : 초당" , SECOND_SALARY, "원");
     
           //타이머에서 계속 증가되야될것들
           //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * SECOND_SALARY), "원");
     
           const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);
           // this.setState({
           //      CURRENT_SALARY,
           //      PERCENT,
           //      SECOND_SALARY
           // })
          //}
          const CLOSE_CURRENT_SALARY = Math.floor(WORKING_SECOND * SECOND_SALARY);

          console.log("WORKING_SECOND :  ",WORKING_SECOND)
          console.log("SECOND_SALARY :  ",SECOND_SALARY)

          const CurrentTime = moment(new Date());

          // 계산에 필요한 연원일

          const remainHours = {
               hour : moment.duration(TODAY_END_DATE.diff(CurrentTime)).hours(),
               minutes : moment.duration(TODAY_END_DATE.diff(CurrentTime)).minutes()
          }
          if(CHECK_START_DATE < TODAY_DATE && CHECK_END_DATE > TODAY_DATE){

               this.setState({
                    isFetching : false,
                    //isPlaying,
                    //SECOND_SALARY:0,         // 1초당 금액
                    //INTERVAL_SECOND:0,       // 지난 시간
                    //WORKING_SECOND:0,        // 일한 시간
                    CURRENT_SALARY,        //현 시간까지 번돈
                    PERCENT,               // 근무시간 진행퍼센트
                    //변경되지않을값들
                    TODAY_START_DATE,        // 근무시작 일자
                    TODAY_END_DATE,          // 근무종료 일자
                    SALARY_START_MONTHDAY,   // 월급시작 일자
                    SALARY_END_MONTHDAY,     // 월급종료 일자

                    monthSallery,
                    workingWeekDay,
                    workingHour,
                    renderArray: [true, false, false, false],
                    timerInterval:null,
                    salaryDay,
                    salaryPayType,
                    REMAIN_HOUR : remainHours.hour,
                    REMAIN_MINUTES : remainHours.minutes,
                    timerInterval: null,
               });
          }else{
               this.setState({
                    timerInterval:null,
                    CURRENT_SALARY : CLOSE_CURRENT_SALARY,
                    PERCENT:100
               });
          }
          
     }

     componentDidMount() {
          console.log('TODAY componentDidMount')
          const { startHour, endHour } = this.props
          
          const CHECK_START_DATE = moment(new Date());
          CHECK_START_DATE.set({year : getYear , date: getDate, month:getMonth, hour:startHour, minute:0, second:0})

          const CHECK_END_DATE = moment(new Date());
          CHECK_END_DATE.set({year : getYear , date: getDate, month:getMonth, hour:endHour, minute:0, second:0})
          
          //console.log("TODAY_DATE.hours()", TODAY_DATE.format('YYYY-MM-DD HH:mm'));
          //console.log("CHECK_START_DATE", CHECK_START_DATE.format('YYYY-MM-DD HH:mm'));

          // 시작시간보다 이른경우 타이머 있으면 클리어
         
          if(CHECK_START_DATE > TODAY_DATE){
               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval);
                    this.setState({
                         timerInterval:null
                    })
               }
          }else if(CHECK_END_DATE < TODAY_DATE){
               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval);
                    this.setState({
                         timerInterval:null
                    })
               }
          }else{

               let timerInterval = setInterval(() => {

                    //const {CURRENT_SALARY, PERCENT, SECOND_SALARY, TODAY_END_DATE} = this.state;
                    const { TODAY_START_DATE, TODAY_END_DATE, monthSallery, workingWeekDay, workingHour, salaryPayType, PAST_TIME, PAST_DAY} = this.state;
                    // 계산에 사용될 Date객체 
                    const TODAY_NEW_DATE = moment();
                    
                    console.log("TODAY_NEW_DATE", TODAY_NEW_DATE.format('HH시 :mm분 :ss초'))
                    console.log("TODAY_START_DATE", TODAY_START_DATE.format('HH시 :mm분 :: ss초'))
                    
                    //월별
                    //if(salaryPayType === SALARY_PAY_TYPE[0]){
          
                     //일할 시간 (고정))
                     //const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
                     const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
                     //console.log('일할 시간: ',WORKING_SECOND);
          
                     //시작 시작부터 흐른 시간
                     //const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
                     const INTERVAL_SECOND = moment.duration(TODAY_NEW_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000;
                     console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")
          
                     const WEEK_COUNT = dayInMonth();
                     //console.log("weekCount",WEEK_COUNT ,"주");
          
                     const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
                     //console.log("percent" , PERCENT, "%");
               
                     const WEEK_SALARY = (monthSallery / WEEK_COUNT);
                     //console.log("weekSallery : 주간" , WEEK_SALARY, "원");
                     
                     //하루 일당   -> 주간급여 / 주간일하는 날수
                     const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
                     //console.log("workingWeekDay 1주 일하는 일수:" , workingWeekDay, "일");
                     //console.log("todaySallery 하루일당" , TODAY_SALARY, "원");
          
                     const hourSallery = Math.floor( TODAY_SALARY / workingHour );
                     //console.log("hourSallery : 시간" , hourSallery, "원");
          
                     const minuteSallery = Math.floor( hourSallery / 60 );
                     //console.log("minuteSallery : 분당" , minuteSallery, "원");
          
                     const SECOND_SALARY = Math.floor( minuteSallery / 60 );
                     //console.log("secondSallery : 초당" , SECOND_SALARY, "원");
          
                     //타이머에서 계속 증가되야될것들
                     //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * SECOND_SALARY), "원");
          
                     const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);
                     // this.setState({
                     //      CURRENT_SALARY,
                     //      PERCENT,
                     //      SECOND_SALARY
                     // })
                    //}


                    console.log("timer CURRENT_SALARY :  ",CURRENT_SALARY)
                    
                    const CurrentTime = moment(new Date());

                    // 계산에 필요한 연원일

                    //TEMP_SALARY = CURRENT_SALARY + (SECOND_SALARY * 2)

                    const remainHours = {
                         hour : moment.duration(TODAY_END_DATE.diff(CurrentTime)).hours(),
                         minutes : moment.duration(TODAY_END_DATE.diff(CurrentTime)).minutes()
                    }
                    //console.log("몇시간 남았나?", remainHours.hour , '시간' , remainHours.minutes, '분');

                    //console.log("실행 중 rerender Today");
                    console.log(CHECK_START_DATE.format('HH시 :mm분 :: ss초'), " ::: " , TODAY_DATE.format('HH시 :mm분 :: ss초'))
                    console.log(CHECK_END_DATE.format('HH시 :mm분 :: ss초'), " ::: " , TODAY_DATE.format('HH시 :mm분 :: ss초'))

                    this.setState({
                         CURRENT_SALARY, // 현재시간까지 번돈
                         PERCENT,            //현재시간까지의 퍼센트
                         remainHours,
                         timerInterval
                    })
                    
               }, 2000);
          }
     }

     componentWillUnmount() {
          console.log("Today Unmount")
          if(this.state.timerInterval){
               clearInterval(this.state.timerInterval);
               this.setState({
                    timerInterval:null
               })
          }
          //this.setState({timerInterval : null})
      }

     // componentWillReceiveProps = nextProps => {
     //      const currentProps = this.props;

     //      if(currentProps.CURRENT_SALARY === nextProps.CURRENT_SALARY){
     //           console.log("current === next ")
     //      }else{
     //           console.log("current !== next TodayScreen")
     //           console.log("Today nextProp :" , nextProps.CURRENT_SALARY)
     //           console.log("PERCENT :" , nextProps.PERCENT)
     //           this.setState({
     //                CURRENT_SALARY: nextProps.CURRENT_SALARY,
     //                PERCENT: nextProps.PERCENT
     //           })
     //      }
     // }

     render() {
          return (
               <TodayScreen 
                    {...this.props} 
                    {...this.state} 
                    //refresh={this._refresh} 
               />
          );
     }
}

export default Container;