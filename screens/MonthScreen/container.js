import React, {Component} from "react";
import PropTypes from "prop-types";
import MonthScreen from "./presenter";
import { image } from "react-native";
import { SALARY_PAY_TYPE } from "../../constants";
import moment from "moment";
import {calcFilterHolidayWorkingDay , calcPastWeekDay , TodayIsWorkingDay} from "../../timerFn";

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

          //console.log("constructor WEEK_COUNT", WEEK_COUNT);

          const date = moment(new Date());
          const isWorkingDay = TodayIsWorkingDay(date.day(), selectWeek);
          //console.log("constructor isWorkingDay :" , isWorkingDay)
          
          this.state = {
               WEEK_COUNT,  // 월급시작일자부터 월급 종료일자까지 선택한 요일 기준 몇일 인지
               isWorkingDay, //오늘이 일하는 날인지
          }
          //console.log(this.props)
     }

     //스크린이 붙기전 setState해도 리렌더링 되지않음
     // 붙기전에 미리 데이터를 만들어놓는다
     componentWillMount(){
          console.log('MONTH componentWillMount');
          if(this.state.timerInterval){
               console.log('componentWillMount clearInterval timer');
               clearInterval(this.state.timerInterval)
          }

          const { WEEK_COUNT, isWorkingDay } = this.state;

          const { monthSallery, 
                    workingWeekDay ,
                    workingHour, 
                    startHour, 
                    endHour  ,
                    isPlaying, 
                    salaryDay, 
                    salaryPayType, 
                    standardMonth,
                    selectWeek,
                    todayDate
          } = this.props
          
          // 계산에 사용될 Date객체 
          // const TODAY_DATE = moment(new Date());

          // // 계산에 필요한 연원일
          // const getDay = TODAY_DATE.day();
          // const getDate = TODAY_DATE.date();
          // const getMonth = TODAY_DATE.month();
          // const getYear = TODAY_DATE.year();

          const CURRENT_DATE = moment(new Date());
          //CURRENT_DATE.set({hour:24})

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

               //선택한 요일 기준 현재까지 일한 날 수 
               let temp_salary_start_month2 =  moment(new Date());
               temp_salary_start_month2.set({date: salaryDay, month:standardMonth-2, hour:0, minute:0, second:0})
               const filterPastday = calcFilterHolidayWorkingDay(temp_salary_start_month2, TODAY_START_DATE, selectWeek);
               //console.log("filterPastday : " , filterPastday) // 전날까지 기준이니 -1


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
               //console.log("(%_%_%_PERCENT_MONTH" , PERCENT_MONTH, "%");

               //한달월급을 일하는 요일에 나눠서 일당 얼마인지 계산  -> 일당
               const TODAY_SALARY = (monthSallery / WEEK_COUNT).toFixed(1);
               //console.log("monthSallery / WEEK_COUNT", monthSallery , " / ", WEEK_COUNT)
               //console.log("weekSallery : 하루" , TODAY_SALARY, "원");
               
               //하루 일당   -> 주간급여 / 주간일하는 날수
               //const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
               //console.log("workingWeekDay 1주 일하는 일수:" , workingWeekDay, "일");
               //console.log("todaySallery 하루일당" , TODAY_SALARY, "원");

               const hourSallery = Math.floor( TODAY_SALARY / workingHour );
               console.log("workingHour" , workingHour, "시간");
               //console.log("hourSallery : 시간" , hourSallery, "원");

               const minuteSallery = Math.floor( hourSallery / 60 );
               //console.log("minuteSallery : 분당" , minuteSallery, "원");

               const SECOND_SALARY = ( minuteSallery / 60 ).toFixed(1);
               console.log("secondSallery : 초당" , SECOND_SALARY, "원");

               //타이머에서 계속 증가되야될것들
               //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * SECOND_SALARY), "원");

               // 2월에서 3월넘어갈때 날짜정보를 어떻게할것인가..? 

               const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);
               

               const MONTH_CURRENT_SALARY = Math.floor((TODAY_SALARY * ( PAST_DAY - 1)) + CURRENT_SALARY);
               console.log('MONTH_CURRENT_SALARY' , MONTH_CURRENT_SALARY)
               //console.log('TODAY_SALARY' , TODAY_SALARY)
               //console.log('PAST_DAY' , PAST_DAY)
               //console.log('CURRENT_SALARY' , CURRENT_SALARY)
               //const MONTH_CLOSE_CURRENT_SALARY = Math.floor(WORKING_SECOND * SECOND_SALARY) + Math.floor(TODAY_SALARY * PAST_DAY);
               //오늘 종료시간 이후까지 번동
               const MONTH_CLOSE_CURRENT_SALARY = Math.floor(filterPastday * TODAY_SALARY);
               console.log("오늘이 근무날인경우 오늘의 완료시간 총 월급 : " , MONTH_CLOSE_CURRENT_SALARY)

               //오늘 일안하는날일떄 전날까지 번돈
               const NOT_WORK_CURRENT_SALARY = Math.round((filterPastday  - 1 ) * TODAY_SALARY);
               console.log("전날까지 번돈 : ", filterPastday , " / ", NOT_WORK_CURRENT_SALARY , " / WORKING_SECOND :", WORKING_SECOND , " /  SECOND_SALARY", SECOND_SALARY)

               //console.log("어제까지 번돈 : " ,(TODAY_SALARY * PAST_DAY))
               //console.log("시작일로부터 계산된 오늘 일자 월급" , MONTH_CURRENT_SALARY)
                    console.log('일하는 날 ')

                    if(!isWorkingDay){
                         console.log('쉬는 날 ')
                         this.setState({
                              timerInterval:null,
                              MONTH_CURRENT_SALARY : NOT_WORK_CURRENT_SALARY,
                              PERCENT:PERCENT_MONTH,
                              REMAIN_DATE
                         })
                    }

                    if(CHECK_START_DATE < CURRENT_DATE && CHECK_END_DATE > CURRENT_DATE && isWorkingDay){
                         console.log('일하는 시간 ')

                         

                         if(CHECK_START_DATE.date() === CURRENT_DATE.date()){
                              console.log("()()()()  CHECK_START_DATE", CHECK_START_DATE)
                              console.log("()()()()  CURRENT_DATE", CURRENT_DATE)
                         }

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
                              isWorkingDay,
                              MONTH_CLOSE_CURRENT_SALARY
                         });

                    }else if(CHECK_END_DATE < CURRENT_DATE){
                         console.log('근무종료시간 이후 ')
                         this.setState({
                              timerInterval:null,
                              MONTH_CURRENT_SALARY : MONTH_CLOSE_CURRENT_SALARY,
                              PERCENT:PERCENT_MONTH,
                              REMAIN_DATE
                              //MONTH_CURRENT_SALARY:PREV_MONTH_CURRENT_SALARY
                         });
                    //다음날로 넘어갈때?
                    }else if(moment(todayDate).date() < CURRENT_DATE.date()){
                         console.log('날이 지난 이후 ')
                         
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
                              REMAIN_DATE,
                              MONTH_CURRENT_SALARY : MONTH_CLOSE_CURRENT_SALARY,
                              PERCENT:PERCENT_MONTH
                         });
                    }else{
                         console.log('그외에? ')
                         this.setState({
                              timerInterval:null,
                              REMAIN_DATE,
                              MONTH_CLOSE_CURRENT_SALARY,
                              PERCENT:PERCENT_MONTH
                         });
                    }
     }

     //스크린이 붙은 후
     // 타이머를 돌리면서 정보를 계속 수정
     componentDidMount() {
          console.log('componentDidMount');
          const { startHour, endHour } = this.props
          const { isWorkingDay } = this.state

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
          //CURRENT_DATE.set({hour:24})
          const getDay = CURRENT_DATE.day();
          const getDate = CURRENT_DATE.date();
          const getMonth = CURRENT_DATE.month();
          const getYear = CURRENT_DATE.year();



          console.log('CURRENT_DATE', CURRENT_DATE.format('YYYY-MM-DD HH:mm ss'));
          console.log("isWorkingDay ? ", isWorkingDay)
          
          if(CHECK_START_DATE > CURRENT_DATE){
               console.log('근무시작 전 ')
               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval);
                    this.setState({
                         timerInterval:null
                    })
               }
               
               if(CURRENT_DATE.hour() >= 6){
                    console.log('근무시작 아침 6시 ')
                    // 아침시작
                    this.setState({
                         REMAIN_DATE: this.state.REMAIN_DATE,
                         MONTH_CURRENT_SALARY : this.state.MONTH_CLOSE_CURRENT_SALARY ,
                         PERCENT:this.state.PERCENT_MONTH
                    });
               }

          }else if(CHECK_END_DATE < CURRENT_DATE){
               console.log('근무종료 후 ')
               console.log('this.state.REMAIN_DATE', this.state.REMAIN_DATE)
               console.log('this.state.MONTH_CURRENT_SALARY', this.state.MONTH_CURRENT_SALARY)
               console.log('this.state.PERCENT_MONTH : ' , this.state)

               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval);
                    this.setState({
                         timerInterval:null,
                    })
               }

               this.setState({
                    REMAIN_DATE: this.state.REMAIN_DATE,
                    MONTH_CLOSE_CURRENT_SALARY : this.state.MONTH_CLOSE_CURRENT_SALARY,
                    PERCENT:this.state.PERCENT
               })

          }else if(CHECK_START_DATE === CURRENT_DATE || CHECK_START_DATE < CURRENT_DATE && isWorkingDay){
               if(this.state.timerInterval){
                    clearInterval(this.state.timerInterval)
               }

               if(CHECK_START_DATE.date() === CURRENT_DATE.date()){
                    console.log("()()()()  CHECK_START_DATE", CHECK_START_DATE)
                    console.log("()()()()  CURRENT_DATE", CURRENT_DATE)
               }


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
                    //console.log("(%_%_%_PERCENT_MONTH" , PERCENT_MONTH, "%");
               
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

                    const SECOND_SALARY = ( minuteSallery / 60 ).toFixed(1);
                    //console.log("secondSallery : 초당" , SECOND_SALARY, "원");

                    //타이머에서 계속 증가되야될것들
                    //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * SECOND_SALARY), "원");

                    // 2월에서 3월넘어갈때 날짜정보를 어떻게할것인가..? 

                    const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);

                    const MONTH_CURRENT_SALARY = Math.floor((TODAY_SALARY * ( PAST_DAY - 1)) + CURRENT_SALARY);
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
                         console.log("근무 시작전")
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
          const { onChangeScrollControl } = this.props;
          onChangeScrollControl(true);
     }

     componentWillUnmount = async() => {
          console.log("_@_@_@_@_@_@_@_ Month Unmount")
          console.log("after this.timerInterval", this.timerInterval)
          await clearInterval(this.timerInterval);
          console.log("before this.timerInterval", this.timerInterval)
          // this.setState({
          //      timerInterval: null,
          // })
          //this.setState({timerInterval : null})
      }


     render() {
          return (
               <MonthScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          //const { getNotifications } = this.props;
         
          const { getDataIncreaseMonth } = this.props;
          getDataIncreaseMonth(moment().format("YYYYMMDD"));

           this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
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