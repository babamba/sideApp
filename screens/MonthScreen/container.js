import React, {Component} from "react";
import PropTypes from "prop-types";
import MonthScreen from "./presenter";
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

calcPastWeekDay = (todayDate, salaryStartDate, past) => {
     const temp_today = moment();

     temp_today.year(todayDate.year())
     temp_today.date(todayDate.date());
     temp_today.month(todayDate.month());
     //temp_today.hour(startHour);
     temp_today.minute(0);

     //(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

     console.log(temp_today)

     const DecreaseTodayDate = temp_today;
     DecreaseTodayDate.date(temp_today.date());
     
     console.log("calc startDate : " , DecreaseTodayDate.format('YYYY-MM-DD HH:mm'));
     console.log("calc salaryStartDate : " , salaryStartDate.format('YYYY-MM-DD HH:mm'));
     
     count = 0;
     
     while(true) {  
          const temp_date = salaryStartDate;

          // 요기부분이 참애매하다 월급날 기준으로 다시돌릴지 월급날 다음날 기준으로 다시돌릴지..
          // 일단 월급날 다음날부터 돌리자

          //temp_date.setDate(temp_date.getDate() - 1)
          console.log("temp_date", temp_date)

          //28일이면 27일까지 계산됨
          console.log("DecreaseTodayDate", DecreaseTodayDate)

          if(temp_date > DecreaseTodayDate){
               console.log("count", count)
               break;
          }else{
               const day = temp_date.day();
               console.log(day);
               if(day === 0 || day === 6){
                    console.log("주말")
               }else{
                    console.log("평일");
                    count++;
               }
               temp_date.date(temp_date.date() + 1);
          }
     }

     return count;
     //console.log(count);
}


// calcPastWeekDay = (todayDate, salaryStartDate, past) => {
//      const temp_today = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() +1, todayDate.getHours());
//      console.log(temp_today)

//      const DecreaseTodayDate = temp_today;
//      DecreaseTodayDate.setDate(temp_today.getDate() - 1);
     
//      console.log("calc startDate : " , DecreaseTodayDate.toLocaleDateString());
//      console.log("calc salaryStartDate : " , salaryStartDate.toLocaleDateString());

//      count = 0;
     
//      while(true) {  
//           const temp_date = salaryStartDate;

//           // 요기부분이 참애매하다 월급날 기준으로 다시돌릴지 월급날 다음날 기준으로 다시돌릴지..
//           // 일단 월급날 다음날부터 돌리자

//           //temp_date.setDate(temp_date.getDate() - 1)
//           console.log("temp_date", temp_date)

//           //28일이면 27일까지 계산됨
//           console.log("DecreaseTodayDate", DecreaseTodayDate)

//           if(temp_date > DecreaseTodayDate){
//                console.log("count", count)
//                break;
//           }else{
//                console.log("count loop")
//                const day = temp_date.getDay();
//                console.log(day);
//                if(day === 0 || day === 6){
//                     console.log("주말")
//                }else{
//                     console.log("평일");
//                     count++;
//                     console.log("count",count);
//                }
//                temp_date.setDate(temp_date.getDate() + 1);
//           }
//      }
//      return count;
     
// }

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

 constructor(props){
          super(props);

          //console.log(this.props)
          const { monthSallery, workingWeekDay , workingHour, startHour, endHour  ,isPlaying, salaryDay, salaryPayType, standardMonth} = this.props
          
          // 근무시작 근무종료 객체들
          const TODAY_START_DATE = moment(new Date());
          TODAY_START_DATE.year(getYear)
          TODAY_START_DATE.date(getDate);
          TODAY_START_DATE.month(getMonth);
          TODAY_START_DATE.hour(startHour);
          TODAY_START_DATE.minute(0);
          console.log("TODAY_START_DATE", TODAY_START_DATE.format('YYYY-MM-DD HH:mm'));

          const TODAY_END_DATE = moment(new Date());
          TODAY_END_DATE.year(getYear)
          TODAY_END_DATE.date(getDate);
          TODAY_END_DATE.month(getMonth);
          TODAY_END_DATE.hour(endHour);
          TODAY_END_DATE.minute(0);

          console.log("TODAY_END_DATE", TODAY_END_DATE.format('YYYY-MM-DD HH:mm'));

          //근무 시작일자 (salaryStartDay)
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

          console.log("SALARY_START_MONTHDAY", SALARY_START_MONTHDAY.format('YYYY-MM-DD HH:mm'));
          console.log("SALARY_END_MONTHDAY", SALARY_END_MONTHDAY.format('YYYY-MM-DD HH:mm'));

          //const PAST_TIME = SALARY_END_MONTHDAY.date() - TODAY_START_DATE.date();
          const PAST_TIME = Math.floor(moment.duration(TODAY_START_DATE.diff(SALARY_START_MONTHDAY)).asDays());
          
          const PAST_DAY = calcPastWeekDay(TODAY_START_DATE, SALARY_START_MONTHDAY, PAST_TIME);

          console.log("start and end : ", TODAY_START_DATE.format('YYYY-MM-DD HH:mm'), "  / " ,  TODAY_END_DATE.format('YYYY-MM-DD HH:mm'))
          console.log("SALARY_START_MONTHDAY", SALARY_START_MONTHDAY.format('YYYY-MM-DD HH:mm'));
          console.log("SALARY_END_MONTHDAY", SALARY_END_MONTHDAY.format('YYYY-MM-DD HH:mm'));

          console.log("지난시간들" ,PAST_TIME , "일")

          console.log("주말 제외지난시간들" ,PAST_DAY , "일")

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
               PAST_TIME,               // 시작일자로 부터 종료일자까지 지난 일자 
               PAST_DAY,                // 주말빼고 당일제외한 일한 날수

               monthSallery,
               workingWeekDay,
               workingHour,
               timerInterval:null,
               salaryDay,
               salaryPayType
          };
     }

     componentWillMount(){
          const { SALARY_START_MONTHDAY,SALARY_END_MONTHDAY, TODAY_START_DATE, TODAY_END_DATE, monthSallery, workingWeekDay, workingHour, salaryPayType, PAST_TIME, PAST_DAY} = this.state;

          //월별
          if(salaryPayType === SALARY_PAY_TYPE[0]){

               //일할 시간 (고정))
               //const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
               const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
               console.log('밀리세컨즈 차이: ',WORKING_SECOND);

               //시작 시작부터 흐른 시간
               //const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
               
               const INTERVAL_SECOND = Math.floor(moment.duration(TODAY_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
               console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")
               console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")
               
               //console.log("tempSalaryStartMonth" , tempSalaryStartMonth, "/ " )
               //console.log("SALARY_END_MONTHDAY, " , SALARY_END_MONTHDAY)

               console.log(SALARY_END_MONTHDAY)
               const tempSalaryStartMonth = new Date(SALARY_END_MONTHDAY.year(), SALARY_END_MONTHDAY.month() - 1, SALARY_END_MONTHDAY.date(), SALARY_END_MONTHDAY.minute());
               
               //const WORKING_SECOND_MONTH = Math.floor((SALARY_END_MONTHDAY.getTime() - tempSalaryStartMonth.getTime()) / 1000);
               const WORKING_SECOND_MONTH =  Math.floor(moment.duration(SALARY_END_MONTHDAY.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

               console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
               console.log("SALARY_END_MONTHDAY : ", SALARY_END_MONTHDAY);
               
               console.log("WORKING_SECOND_MONTH 고정 일할 시간 한달",WORKING_SECOND_MONTH,"초")

               //const INTERVAL_SECOND_MONTH = Math.floor((TODAY_DATE.getTime() - tempSalaryStartMonth.getTime()) / 1000);
               const INTERVAL_SECOND_MONTH = Math.floor(moment.duration(TODAY_DATE.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

               //console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
               console.log("TODAY_DATE : ", TODAY_DATE);

               console.log("INTERVAL_SECOND_MONTH 시작날부터 오늘까지 일한시간",INTERVAL_SECOND_MONTH,"초")

               const WEEK_COUNT = dayInMonth();
               console.log("weekCount",WEEK_COUNT ,"주");

               const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
               console.log("PERCENT_TODAY" , PERCENT, "%");

               const PERCENT_MONTH = Math.floor(( INTERVAL_SECOND_MONTH / WORKING_SECOND_MONTH  ) * 100);
               console.log("PERCENT_MONTH" , PERCENT_MONTH, "%");
          
               const WEEK_SALARY = (monthSallery / WEEK_COUNT);
               console.log("weekSallery : 주간" , WEEK_SALARY, "원");
               
               //하루 일당   -> 주간급여 / 주간일하는 날수
               const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
               console.log("workingWeekDay 1주 일하는 일수:" , workingWeekDay, "일");
               console.log("todaySallery 하루일당" , TODAY_SALARY, "원");

               const hourSallery = Math.floor( TODAY_SALARY / workingHour );
               //console.log("hourSallery : 시간" , hourSallery, "원");

               const minuteSallery = Math.floor( hourSallery / 60 );
               //console.log("minuteSallery : 분당" , minuteSallery, "원");

               const SECOND_SALARY = Math.floor( minuteSallery / 60 );
               //console.log("secondSallery : 초당" , SECOND_SALARY, "원");

               //타이머에서 계속 증가되야될것들
               //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * SECOND_SALARY), "원");

               // 2월에서 3월넘어갈때 날짜정보를 어떻게할것인가..? 

               const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);

               const MONTH_CURRENT_SALARY = Math.floor((TODAY_SALARY * PAST_DAY) + CURRENT_SALARY);
               console.log("어제까지 번돈 : " ,(TODAY_SALARY * PAST_DAY))
               console.log("시작일로부터 계산된 오늘 일자 월급" , MONTH_CURRENT_SALARY)

               this.setState({
                    PERCENT: PERCENT_MONTH,
                    SECOND_SALARY,
                    MONTH_CURRENT_SALARY
               })
          }
     }

     componentDidMount() {
          this.timerInterval = setInterval(() => {
               const {PERCENT, SECOND_SALARY, MONTH_CURRENT_SALARY} = this.state;
               //console.log("state 샐러리",CURRENT_SALARY, PERCENT, SECOND_SALARY)
               console.log("실행 중 rerender Month");
               this.setState({
                    MONTH_CURRENT_SALARY: MONTH_CURRENT_SALARY + (SECOND_SALARY * 2 ), // 현재시간까지 번돈
                    PERCENT,            //현재시간까지의 퍼센트
               })
          }, 2000);
     }

     componentWillUnmount() {
          console.log("Month Unmount")
          clearInterval(this.timerInterval);
      }


     render() {
          return (
               <MonthScreen 
                    {...this.props} 
                    {...this.state} 
                    //refresh={this._refresh} 
               />
          );
     }

     // _refresh = () => {
     //      //const { getSalary } = this.props;
     //      this.setState({
     //           isFetching : true
     //      });
     //      //getFeed();
     //      console.log("isFetch refresh")
     // }

}
export default Container;