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
     constructor(props){
          super(props);

          //console.log(this.props)
          const { monthSallery, workingWeekDay , workingHour, startHour, endHour  ,isPlaying, salaryDay, salaryPayType , standardMonth} = this.props
          //console.log("props", props)
          //console.log("standardMonth" ,standardMonth)
          //console.log("salaryDay" ,salaryDay)
          // 오늘 일자 근무시작 근무종료 객체들
          //const TODAY_START_DATE = new Date(getYear, getMonth, getDate, startHour);
          const TODAY_START_DATE = moment(new Date());
          TODAY_START_DATE.year(getYear)
          TODAY_START_DATE.date(getDate);
          TODAY_START_DATE.month(getMonth);
          TODAY_START_DATE.hour(startHour);
          TODAY_START_DATE.minute(0);

          //console.log("TODAY_START_DATE", TODAY_START_DATE.format('YYYY-MM-DD HH:mm'));

          //const TODAY_END_DATE = new Date(getYear, getMonth, getDate, endHour);
          const TODAY_END_DATE = moment(new Date());
          TODAY_END_DATE.year(getYear)
          TODAY_END_DATE.date(getDate);
          TODAY_END_DATE.month(getMonth);
          TODAY_END_DATE.hour(endHour);
          TODAY_END_DATE.minute(0);

          //console.log("TODAY_END_DATE", TODAY_END_DATE.format('YYYY-MM-DD HH:mm'));

          //근무 시작일자 (salaryDay)
          //const SALARY_START_MONTHDAY = new Date(getYear, standardMonth-2, salaryDay, startHour);
          //const SALARY_END_MONTHDAY = new Date(getYear, standardMonth-1 , salaryDay, endHour);

          const SALARY_START_MONTHDAY = moment(new Date());

          //0부터 시작임 3 = 4ㅇㅜㅓㄹ 
          SALARY_START_MONTHDAY.date(salaryDay);
          SALARY_START_MONTHDAY.month(standardMonth-2);
          SALARY_START_MONTHDAY.hour(0);
          SALARY_START_MONTHDAY.minute(0);

          const SALARY_END_MONTHDAY = moment(new Date());

          SALARY_END_MONTHDAY.date(salaryDay);
          SALARY_END_MONTHDAY.month(standardMonth-1);
          SALARY_END_MONTHDAY.hour(0);
          SALARY_END_MONTHDAY.minute(0);

          //console.log("SALARY_START_MONTHDAY", SALARY_START_MONTHDAY.format('YYYY-MM-DD HH:mm'));
          //console.log("SALARY_END_MONTHDAY", SALARY_END_MONTHDAY.format('YYYY-MM-DD HH:mm'));

          //항상 초기화해야할것들
          this.state = {
               isFetching : false,
               //isPlaying,
               SECOND_SALARY:0,
               INTERVAL_SECOND:0,
               WORKING_SECOND:0,
               CURRENT_SALARY:0,
               PERCENT:0,
               //변경되지않을값들
               TODAY_START_DATE,
               TODAY_END_DATE,
               SALARY_START_MONTHDAY,   // 월급시작일자
               SALARY_END_MONTHDAY,     // 월급종료일자

               monthSallery,
               workingWeekDay,
               workingHour,
               renderArray: [true, false, false, false],
               timerInterval:null,
               salaryDay,
               salaryPayType
          };
     }

     static navigationOptions = {
          gesturesEnabled: false,
     }  


     componentWillMount(){
          const { TODAY_START_DATE, TODAY_END_DATE, monthSallery, workingWeekDay, workingHour, salaryPayType, PAST_TIME, PAST_DAY} = this.state;

          //월별
          if(salaryPayType === SALARY_PAY_TYPE[0]){

               //일할 시간 (고정))
               //const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
               const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
               //console.log('밀리세컨즈 차이: ',WORKING_SECOND);

               //시작 시작부터 흐른 시간
               //const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
               const INTERVAL_SECOND = Math.floor(moment.duration(TODAY_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
               //console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")

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

               this.setState({
                    CURRENT_SALARY,
                    PERCENT,
                    SECOND_SALARY,
               })
          }
     }

     componentDidMount() {
          const { startHour } = this.props
          
          const CHECK_START_DATE = moment(new Date());
          CHECK_START_DATE.year(getYear)
          CHECK_START_DATE.date(getDate);
          CHECK_START_DATE.month(getMonth);
          CHECK_START_DATE.hour(startHour);
          CHECK_START_DATE.minute(0);
          
          console.log("TODAY_DATE.hours()", TODAY_DATE.format('YYYY-MM-DD HH:mm'));
          console.log("CHECK_START_DATE", CHECK_START_DATE.format('YYYY-MM-DD HH:mm'));

          // 시작시간보다 이른경우 타이머 있으면 클리어
          if(CHECK_START_DATE > TODAY_DATE){
               if(this.timerInterval){
                    clearInterval(this.timerInterval);
               }
          }else{
               this.timerInterval = setInterval(() => {
                    const {CURRENT_SALARY, PERCENT, SECOND_SALARY} = this.state;
                    //console.log("state 샐러리",CURRENT_SALARY, PERCENT, SECOND_SALARY)
                    console.log("실행 중 rerender Today");
                    this.setState({
                         CURRENT_SALARY: CURRENT_SALARY + (SECOND_SALARY * 2 ), // 현재시간까지 번돈
                         PERCENT,            //현재시간까지의 퍼센트
                    })
               }, 2000);
          }
     }

     componentWillUnmount() {
          console.log("Today Unmount")
          clearInterval(this.timerInterval);
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