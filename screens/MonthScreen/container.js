import React, {Component} from "react";
import PropTypes from "prop-types";
import MonthScreen from "./presenter";
import { image } from "react-native";
import { SALARY_PAY_TYPE } from "../../constants";
import moment from "moment";
import {calcFilterHolidayWorkingDay , calcPastWeekDay } from "../../timerFn";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     //최초 스크린이 그려질때 초기화 
      constructor(props){
          super(props);
          console.log('constructor');
          const { salaryDay, standardMonth, selectWeek } = this.props

          let temp_salary_start_month =  moment(new Date());
          temp_salary_start_month.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})

          let temp_salary_end_month = moment(new Date());
          temp_salary_end_month.set({date: salaryDay, month:standardMonth-1, hour:0, minute:0, second:0})

          const WEEK_COUNT = calcFilterHolidayWorkingDay(temp_salary_start_month, temp_salary_end_month, selectWeek);
          console.log("constructor WEEK_COUNT", WEEK_COUNT);
          
          this.state = {
               WEEK_COUNT
          }
          //console.log(this.props)
     }

     //스크린이 붙기전 setState해도 리렌더링 되지않음
     // 붙기전에 미리 데이터를 만들어놓는다
     componentWillMount(){
          console.log('componentWillMount');

          const { WEEK_COUNT } = this.state;

          const { monthSallery, 
                    workingWeekDay ,
                    workingHour, 
                    startHour, 
                    endHour  ,
                    isPlaying, 
                    salaryDay, 
                    salaryPayType, 
                    standardMonth,
                    selectWeek
          } = this.props
          
          // 계산에 사용될 Date객체 
          // const TODAY_DATE = moment(new Date());

          // // 계산에 필요한 연원일
          // const getDay = TODAY_DATE.day();
          // const getDate = TODAY_DATE.date();
          // const getMonth = TODAY_DATE.month();
          // const getYear = TODAY_DATE.year();

          const CURRENT_DATE = moment(new Date());

          const getDay = CURRENT_DATE.day();
          const getDate = CURRENT_DATE.date();
          const getMonth = CURRENT_DATE.month();
          const getYear = CURRENT_DATE.year();
          
          console.log('CURRENT_DATE', CURRENT_DATE.format('YYYY-MM-DD HH:mm ss'));

           const CHECK_START_DATE = moment(new Date());
               CHECK_START_DATE.set({year : getYear , date: getDate, month:getMonth, hour:startHour, minute:0, second:0})
     
               const CHECK_END_DATE = moment(new Date());
               CHECK_END_DATE.set({year : getYear , date: getDate, month:getMonth, hour:endHour, minute:0, second:0})        

               // 근무시작 근무종료 객체들
               const TODAY_START_DATE = moment(new Date());
               TODAY_START_DATE.set({year:getYear , date: getDate, month:getMonth, hour:startHour, minute:0, second:0})
               //console.log("TODAY_START_DATE", TODAY_START_DATE.format('YYYY-MM-DD HH:mm'));

               const TODAY_END_DATE = moment(new Date());
               TODAY_END_DATE.set({year:getYear , date: getDate, month:getMonth,hour:endHour,minute:0, second:0})

               //console.log("TODAY_END_DATE", TODAY_END_DATE.format('YYYY-MM-DD HH:mm'));

               //근무 시작일자 (salaryStartDay)
               const SALARY_START_MONTHDAY = moment(new Date());
               SALARY_START_MONTHDAY.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})
               //0부터 시작임 3 = 4ㅇㅜㅓㄹ 

               const SALARY_END_MONTHDAY = moment(new Date());
               SALARY_END_MONTHDAY.set({date: salaryDay, month:standardMonth-1, hour:0, minute:0, second:0})

               console.log("SALARY_START_MONTHDAY", SALARY_START_MONTHDAY.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
               console.log("SALARY_END_MONTHDAY", SALARY_END_MONTHDAY.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));

               //const PAST_TIME = SALARY_END_MONTHDAY.date() - TODAY_START_DATE.date();
               const PAST_TIME = Math.floor(moment.duration(TODAY_START_DATE.diff(SALARY_START_MONTHDAY)).asDays());
               

               let temp_salary_start_month =  moment(new Date());
               temp_salary_start_month.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})

               let temp_salary_end_month = moment(new Date());
               temp_salary_end_month.set({date: salaryDay, month:standardMonth-1, hour:0, minute:0, second:0})

               const PAST_DAY = calcPastWeekDay(TODAY_START_DATE, temp_salary_start_month, selectWeek);

               //console.log("start and end : ", TODAY_START_DATE.format('YYYY-MM-DD HH:mm'), "  / " ,  TODAY_END_DATE.format('YYYY-MM-DD HH:mm'))
               //console.log("SALARY_START_MONTHDAY", SALARY_START_MONTHDAY.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
               //console.log("SALARY_END_MONTHDAY", SALARY_END_MONTHDAY.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));

               //console.log("지난시간들" ,PAST_TIME , "일")

               //console.log("주말 제외지난시간들" ,PAST_DAY , "일")

               const CurrentDate = moment(new Date());
               //남은 일자
               const REMAIN_DATE= Math.floor(moment.duration(SALARY_END_MONTHDAY.diff(CurrentDate)).asDays() + 1);
               //console.log("몇일남았나? " ,REMAIN_DATE , "일")

               const TODAY_NEW_DATE = moment();
                         
               //console.log("TODAY_NEW_DATE", TODAY_NEW_DATE.format('HH시 :mm분 :ss초'))
               //console.log("TODAY_START_DATE", TODAY_START_DATE.format('HH시 :mm분 :: ss초'))

               const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
               //console.log('일할 시간: ',WORKING_SECOND);
          
               //시작 시작부터 흐른 시간
               const INTERVAL_SECOND = moment.duration(TODAY_NEW_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000;
               //console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")


               //console.log(SALARY_END_MONTHDAY)
               const tempSalaryStartMonth = new Date(SALARY_END_MONTHDAY.year(), SALARY_END_MONTHDAY.month() - 1, SALARY_END_MONTHDAY.date(), SALARY_END_MONTHDAY.minute());
               
               //const WORKING_SECOND_MONTH = Math.floor((SALARY_END_MONTHDAY.getTime() - tempSalaryStartMonth.getTime()) / 1000);
               const WORKING_SECOND_MONTH =  Math.floor(moment.duration(SALARY_END_MONTHDAY.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

               //console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
               //console.log("SALARY_END_MONTHDAY : ", SALARY_END_MONTHDAY.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
               
               //console.log("WORKING_SECOND_MONTH 고정 일할 시간 한달",WORKING_SECOND_MONTH,"초")

               //const INTERVAL_SECOND_MONTH = Math.floor((TODAY_DATE.getTime() - tempSalaryStartMonth.getTime()) / 1000);
               const INTERVAL_SECOND_MONTH = Math.floor(moment.duration(CURRENT_DATE.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

               //console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
               //console.log("TODAY_DATE : ", TODAY_DATE);

               //console.log("INTERVAL_SECOND_MONTH 시작날부터 오늘까지 일한시간",INTERVAL_SECOND_MONTH,"초")

               // 한달 일하는 요일 계산 ( ex : 2월 21 일 부터 2월 31일까지는 월화수목금 으로했을때 토일빼고 21일 )
               //const WEEK_COUNT = calcFilterHolidayWorkingDay(SALARY_START_MONTHDAY, SALARY_END_MONTHDAY, selectWeek);
               //console.log("weekCount",WEEK_COUNT ,"주");

               // const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
               // console.log("PERCENT_TODAY" , PERCENT, "%");

               const PERCENT_MONTH = Math.floor(( INTERVAL_SECOND_MONTH / WORKING_SECOND_MONTH  ) * 100);
               //console.log("PERCENT_MONTH" , PERCENT_MONTH, "%");

               //한달월급을 일하는 요일에 나눠서 일당 얼마인지 계산  -> 일당
               const TODAY_SALARY = (monthSallery / WEEK_COUNT);
               console.log("weekSallery : 하루" , TODAY_SALARY, "원");
               
               //하루 일당   -> 주간급여 / 주간일하는 날수
               //const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
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

               // 2월에서 3월넘어갈때 날짜정보를 어떻게할것인가..? 

               const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);
               

               const MONTH_CURRENT_SALARY = Math.floor((TODAY_SALARY * PAST_DAY) + CURRENT_SALARY);
               
               const MONTH_CLOSE_CURRENT_SALARY = Math.floor(WORKING_SECOND * SECOND_SALARY) + Math.floor(TODAY_SALARY * PAST_DAY);
               
               //console.log("어제까지 번돈 : " ,(TODAY_SALARY * PAST_DAY))
               //console.log("시작일로부터 계산된 오늘 일자 월급" , MONTH_CURRENT_SALARY)
               if(CHECK_START_DATE < CURRENT_DATE && CHECK_END_DATE > CURRENT_DATE){
                    //항상 초기화해야할것들
                    this.setState({
                         isFetching : false,
                         //isPlaying,
                         SECOND_SALARY:0,
                         INTERVAL_SECOND:0,
                         WORKING_SECOND:0,
                         CURRENT_SALARY:0,
                         PERCENT: PERCENT_MONTH,
                         MONTH_CURRENT_SALARY,
                         
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
                         standardMonth,
                         selectWeek,
                         salaryPayType,
                         REMAIN_DATE,
                    });

               }else if(CHECK_START_DATE > CURRENT_DATE && CHECK_END_DATE < CURRENT_DATE){
                    this.setState({
                         timerInterval:null,
                         MONTH_CURRENT_SALARY : MONTH_CLOSE_CURRENT_SALARY,
                         PERCENT:PERCENT_MONTH,
                         REMAIN_DATE
                         //MONTH_CURRENT_SALARY:PREV_MONTH_CURRENT_SALARY
                    });
               //다음날로 넘어갈때?
               }else if(moment(todayDate).date() < CURRENT_DATE.date()){
                    
                    //store state에 저장된 날짜와 현재 만들어진 날짜객체의 날이 다를때만 store 저장
                    if(moment(todayDate).date() !== CURRENT_DATE.date()){
                         const { setTodate } = this.props;
               
                         const newToday = moment(new Date());
                         today.set({hour:0, minute:0, second:0})
                         console.log("newToday")
          
                         setTodate(newToday);
                    }

                    this.setState({
                         timerInterval:null,
                         REMAIN_HOUR: null,
                         REMAIN_MINUTES:null,
                         CURRENT_SALARY : 0,
                         PERCENT:0
                    });
               }
     }

     //스크린이 붙은 후
     // 타이머를 돌리면서 정보를 계속 수정
     componentDidMount() {
          console.log('componentDidMount');

          const { startHour, endHour } = this.props

          const CHECK_START_DATE = moment(new Date());
          CHECK_START_DATE.set({year : getYear , date: getDate, month:getMonth, hour:startHour, minute:0, second:0})
     
          const CHECK_END_DATE = moment(new Date());
          CHECK_END_DATE.set({year : getYear , date: getDate, month:getMonth, hour:endHour, minute:0, second:0})        

          // 계산에 사용될 Date객체 
          // const TODAY_DATE = moment(new Date());

          // // 계산에 필요한 연원일
          // const getDay = TODAY_DATE.day();
          // const getDate = TODAY_DATE.date();
          // const getMonth = TODAY_DATE.month();
          // const getYear = TODAY_DATE.year();

          const CURRENT_DATE = moment(new Date());
          //CURRENT_DATE.set({second:0})
          const getDay = CURRENT_DATE.day();
          const getDate = CURRENT_DATE.date();
          const getMonth = CURRENT_DATE.month();
          const getYear = CURRENT_DATE.year();



          console.log('CURRENT_DATE', CURRENT_DATE.format('YYYY-MM-DD HH:mm ss'));
          
          if(CHECK_START_DATE > CURRENT_DATE){
               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval);
                    this.setState({
                         timerInterval:null
                    })
               }
          
          }else if(CHECK_END_DATE < CURRENT_DATE){
               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval);
                    this.setState({
                         timerInterval:null
                    })
               }
          }else if(CHECK_START_DATE === CURRENT_DATE || CHECK_START_DATE < CURRENT_DATE){
               let timerInterval = setInterval(() => {

                    //const {PERCENT, SECOND_SALARY, MONTH_CURRENT_SALARY, SALARY_END_MONTHDAY} = this.state;

                    const {SALARY_START_MONTHDAY, 
                         SALARY_END_MONTHDAY, 
                         salaryDay,
                         selectWeek, 
                         standardMonth, 
                         TODAY_START_DATE, 
                         TODAY_END_DATE, 
                         monthSallery, 
                         workingWeekDay,
                         workingHour, 
                         salaryPayType, 
                         PAST_TIME,
                         PAST_DAY,
                         WEEK_COUNT
                    } = this.state;

                    //월별
                    //if(salaryPayType === SALARY_PAY_TYPE[0]){
                    
                    const TODAY_NEW_DATE = moment();
                         
                    //console.log("TODAY_NEW_DATE", TODAY_NEW_DATE.format('HH시 :mm분 :ss초'))
                    //console.log("TODAY_START_DATE", TODAY_START_DATE.format('HH시 :mm분 :: ss초'))

                    //const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
                    //console.log('일할 시간: ',WORKING_SECOND);
               
                    //시작 시작부터 흐른 시간
                    const INTERVAL_SECOND = moment.duration(TODAY_NEW_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000;
                    //console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")


                    //console.log(SALARY_END_MONTHDAY)
                    const tempSalaryStartMonth = new Date(SALARY_END_MONTHDAY.year(), SALARY_END_MONTHDAY.month() - 1, SALARY_END_MONTHDAY.date(), SALARY_END_MONTHDAY.minute());
                    
                    //const WORKING_SECOND_MONTH = Math.floor((SALARY_END_MONTHDAY.getTime() - tempSalaryStartMonth.getTime()) / 1000);
                    const WORKING_SECOND_MONTH =  Math.floor(moment.duration(SALARY_END_MONTHDAY.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

                    //console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
                    //console.log("SALARY_END_MONTHDAY : ", SALARY_END_MONTHDAY);
                    
                    //console.log("WORKING_SECOND_MONTH 고정 일할 시간 한달",WORKING_SECOND_MONTH,"초")

                    //const INTERVAL_SECOND_MONTH = Math.floor((TODAY_DATE.getTime() - tempSalaryStartMonth.getTime()) / 1000);
                    const INTERVAL_SECOND_MONTH = Math.floor(moment.duration(CURRENT_DATE.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

                    //console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
                    //console.log("TODAY_DATE : ", TODAY_DATE);

                    //console.log("INTERVAL_SECOND_MONTH 시작날부터 오늘까지 일한시간",INTERVAL_SECOND_MONTH,"초")

                    // let temp_salary_start_month =  moment(new Date());
                    // temp_salary_start_month.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})

                    // let temp_salary_end_month = moment(new Date());
                    // temp_salary_end_month.set({date: salaryDay, month:standardMonth-1, hour:0, minute:0, second:0})

                    // // 한달 일하는 요일 계산 ( ex : 2월 21 일 부터 2월 31일까지는 월화수목금 으로했을때 토일빼고 21일 )
                    // const WEEK_COUNT = calcFilterHolidayWorkingDay(temp_salary_start_month, temp_salary_end_month, selectWeek);
                    //console.log("weekCount",WEEK_COUNT ,"주");

                    // const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
                    // console.log("PERCENT_TODAY" , PERCENT, "%");

                    const PERCENT_MONTH = Math.floor(( INTERVAL_SECOND_MONTH / WORKING_SECOND_MONTH  ) * 100);
                    //console.log("PERCENT_MONTH" , PERCENT_MONTH, "%");
               
                    //const WEEK_SALARY = (monthSallery / WEEK_COUNT);
                    const TODAY_SALARY = (monthSallery / WEEK_COUNT);
                    //console.log("todaySallery 하루일당" , TODAY_SALARY, "원");
                    //console.log("weekSallery : 주간" , WEEK_SALARY, "원");
                    
                    //하루 일당   -> 주간급여 / 주간일하는 날수
                    //const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
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

                    // 2월에서 3월넘어갈때 날짜정보를 어떻게할것인가..? 

                    const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);

                    const MONTH_CURRENT_SALARY = Math.floor((TODAY_SALARY * PAST_DAY) + CURRENT_SALARY);
                    //console.log("어제까지 번돈 : " ,(TODAY_SALARY * PAST_DAY))
                    //console.log("시작일로부터 계산된 오늘 일자 월급" , MONTH_CURRENT_SALARY)

                    // this.setState({
                    //      PERCENT: PERCENT_MONTH,
                    //      SECOND_SALARY,
                    //      MONTH_CURRENT_SALARY
                    // })
               //}

                    //console.log("state 샐러리",CURRENT_SALARY, PERCENT, SECOND_SALARY)
                    //console.log("실행 중 rerender Month");
                    if(CHECK_START_DATE > CURRENT_DATE){
                         if(this.state.timerInterval){
                              clearInterval(this.state.timerInterval);
                              this.setState({
                                   timerInterval:null
                              })
                         }
                    }else{
                         this.setState({
                              MONTH_CURRENT_SALARY:MONTH_CURRENT_SALARY, // 현재시간까지 번돈
                              PERCENT: PERCENT_MONTH,            //현재시간까지의 퍼센트
                              timerInterval
                         })
                    }
                    
               }, 2500);
          }
     }

     async componentWillUnmount() {
          console.log("Month Unmount")
          if(this.state.timerInterval){
               clearInterval(this.state.timerInterval);
               await this.setState({
                    timerInterval:null
               })
          }
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