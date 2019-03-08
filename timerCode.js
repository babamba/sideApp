         // const { monthSallery, workingWeekDay, workingHour, startHour, endHour } = this.state

          // const Todaydate = new Date();

          // const getDay = Todaydate.getDay();
          // const getDate = Todaydate.getDate();
          // const getMonth = Todaydate.getMonth();
          // const getYear = date.getFullYear();


          // const ToadyStartDate = new Date(getYear, getMonth, getDate, startHour);
          // const ToadyEndDate = new Date(getYear, getMonth, getDate, endHour);

          // console.log("ToadyStartDate :" , ToadyStartDate.toLocaleString());
          // console.log("시작시간 :" , ToadyStartDate.getHours());
          
          // console.log("ToadyEndDate :" , ToadyEndDate.toLocaleString());
          // console.log("종료시간 :" , ToadyEndDate.getHours());
          
          // //시작 시간 부터 현재 시간까지 밀리초 계산
          // const intervalSecond = Math.floor((Todaydate.getTime() - ToadyStartDate.getTime()) / 1000);
          
          // //시작 시간 부터 현재 시간까지 분 계산
          // const intervalMinute = Math.floor(intervalSecond / 60);
          
          // console.log("지난시간 " , intervalSecond, "초");
          // console.log("지난시간 " , intervalMinute, "분");
          
          // //시작 시간 부터 종료시간까지 밀리초 계산
          // const workingHours = Math.floor((ToadyEndDate.getTime() - ToadyStartDate.getTime()) / 1000);
          // console.log("근무시간 초", workingHours);
          // console.log("근무시간 분", Math.floor(workingHours) / 60);
          // console.log("근무시간",  Math.floor( Math.floor( workingHours / 60 ) / 60 ) );
          
          // // 경과시간 초 / 총근무시간 초  * 100 = 퍼센트
          // const percent = Math.floor(( intervalSecond / workingHours  ) * 100);
          // console.log("percent!!!!" , percent);

          // const weekCount = _dayInMonth();
          // console.log("weekCount!!!!" , weekCount);

          // //주간 급여   -> 월 실수령액 / 한달에 주 수(ex 5주 / 6주 )
          // const weekSallery = monthSallery / weekCount;
          // console.log("weekSallery!!!!" , weekSallery);
          
          // //하루 일당   -> 주간급여 / 주간일하는 날수
          // const todaySallery = Math.floor( weekSallery / workingWeekDay );
          // console.log("todaySallery!!!!" , todaySallery);
          
          // // 1시간 급여 -> 일급여 / 하루 일하는 시간 = 시급
          // const hourSallery = Math.floor( todaySallery / workingHour );
          // console.log("hourSallery!!!!" , hourSallery);
          
          // // 1분 급여 => 
          // const minuteSallery = Math.floor( hourSallery / 60 );
          // console.log("minuteSallery!!!!" , minuteSallery);

          // // 1초 급여 => 
          // const secontSallery = Math.floor( minuteSallery / 60 );
          // console.log("secontSallery!!!!" , secontSallery);
              
          // 경과 시간  => 등록된 startHour 
          //const elapsedTime = 

          //const percent = 
          // default  minute 0 +  current minute현재 시간 초 / 하르근무 총 초 * 100

          // this.setState({
          //      todaySallery : minuteSallery
          // })
          



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




// componentWillMount(){
//      console.log('componentWillMount');
     // const { SALARY_START_MONTHDAY,SALARY_END_MONTHDAY, TODAY_START_DATE, TODAY_END_DATE, monthSallery, workingWeekDay, workingHour, salaryPayType, PAST_TIME, PAST_DAY} = this.state;

     // //월별
     // //if(salaryPayType === SALARY_PAY_TYPE[0]){

     //      //일할 시간 (고정))
     //      //const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
     //      const WORKING_SECOND = Math.floor(moment.duration(TODAY_END_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
     //      console.log('밀리세컨즈 차이: ',WORKING_SECOND);

     //      //시작 시작부터 흐른 시간
     //      //const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
          
     //      const INTERVAL_SECOND = Math.floor(moment.duration(TODAY_DATE.diff(TODAY_START_DATE)).asMilliseconds() / 1000);
     //      console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")
     //      console.log("INTERVAL_SECOND 시작시간부터 일한시간",INTERVAL_SECOND,"초")
          
     //      //console.log("tempSalaryStartMonth" , tempSalaryStartMonth, "/ " )
     //      //console.log("SALARY_END_MONTHDAY, " , SALARY_END_MONTHDAY)

     //      console.log(SALARY_END_MONTHDAY)
     //      const tempSalaryStartMonth = new Date(SALARY_END_MONTHDAY.year(), SALARY_END_MONTHDAY.month() - 1, SALARY_END_MONTHDAY.date(), SALARY_END_MONTHDAY.minute());
          
     //      //const WORKING_SECOND_MONTH = Math.floor((SALARY_END_MONTHDAY.getTime() - tempSalaryStartMonth.getTime()) / 1000);
     //      const WORKING_SECOND_MONTH =  Math.floor(moment.duration(SALARY_END_MONTHDAY.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

     //      console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
     //      console.log("SALARY_END_MONTHDAY : ", SALARY_END_MONTHDAY);
          
     //      console.log("WORKING_SECOND_MONTH 고정 일할 시간 한달",WORKING_SECOND_MONTH,"초")

     //      //const INTERVAL_SECOND_MONTH = Math.floor((TODAY_DATE.getTime() - tempSalaryStartMonth.getTime()) / 1000);
     //      const INTERVAL_SECOND_MONTH = Math.floor(moment.duration(TODAY_DATE.diff(tempSalaryStartMonth)).asMilliseconds() / 1000);

     //      //console.log("SALARY_START_MONTHDAY : ", SALARY_START_MONTHDAY);
     //      console.log("TODAY_DATE : ", TODAY_DATE);

     //      console.log("INTERVAL_SECOND_MONTH 시작날부터 오늘까지 일한시간",INTERVAL_SECOND_MONTH,"초")

     //      const WEEK_COUNT = dayInMonth();
     //      console.log("weekCount",WEEK_COUNT ,"주");

     //      const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
     //      console.log("PERCENT_TODAY" , PERCENT, "%");

     //      const PERCENT_MONTH = Math.floor(( INTERVAL_SECOND_MONTH / WORKING_SECOND_MONTH  ) * 100);
     //      console.log("PERCENT_MONTH" , PERCENT_MONTH, "%");
     
     //      const WEEK_SALARY = (monthSallery / WEEK_COUNT);
     //      console.log("weekSallery : 주간" , WEEK_SALARY, "원");
          
     //      //하루 일당   -> 주간급여 / 주간일하는 날수
     //      const TODAY_SALARY = Math.floor( WEEK_SALARY / workingWeekDay );
     //      console.log("workingWeekDay 1주 일하는 일수:" , workingWeekDay, "일");
     //      console.log("todaySallery 하루일당" , TODAY_SALARY, "원");

     //      const hourSallery = Math.floor( TODAY_SALARY / workingHour );
     //      //console.log("hourSallery : 시간" , hourSallery, "원");

     //      const minuteSallery = Math.floor( hourSallery / 60 );
     //      //console.log("minuteSallery : 분당" , minuteSallery, "원");

     //      const SECOND_SALARY = Math.floor( minuteSallery / 60 );
     //      //console.log("secondSallery : 초당" , SECOND_SALARY, "원");

     //      //타이머에서 계속 증가되야될것들
     //      //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * SECOND_SALARY), "원");

     //      // 2월에서 3월넘어갈때 날짜정보를 어떻게할것인가..? 

     //      const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * SECOND_SALARY);

     //      const MONTH_CURRENT_SALARY = Math.floor((TODAY_SALARY * PAST_DAY) + CURRENT_SALARY);
     //      console.log("어제까지 번돈 : " ,(TODAY_SALARY * PAST_DAY))
     //      console.log("시작일로부터 계산된 오늘 일자 월급" , MONTH_CURRENT_SALARY)

     //      this.setState({
     //           PERCENT: PERCENT_MONTH,
     //           SECOND_SALARY,
     //           MONTH_CURRENT_SALARY
     //      })
     // }

     //)


     // 시작날짜부터 종료날짜까지 로 수정해야함
// 지금은 이번달로만 되어있음.
// dayInMonth = () =>  {
//      const date = new Date();
//      const year  = Number(date.toLocaleDateString("de-DE", {year: "numeric"}));
//      const month = Number(date.toLocaleDateString("de-DE", {month: "2-digit"}));

//      const nowDate = new Date(year, month-1, 1);
//      const lastDate = new Date(year, month, 0).getDate();
//      const monthSWeek = nowDate.getDay();
//      const weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
//      return weekSeq;
// }