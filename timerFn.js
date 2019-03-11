import moment from "moment";
//근무시작일자 근무종료일자 선택한 요일로 해당 달에 일하는 일수 계산

export function calcFilterHolidayWorkingDay(startDate, endDate, selectWeek){
          let temp_start = startDate
          console.log('temp_start' , startDate.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
          console.log('temp_end' , endDate.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
          console.log('selectWeek' , selectWeek);
          
          let count = 0;
          
          while(true) {  
               let temp_end = endDate;

               if(temp_start > temp_end){
                    break;
               }else{
                    let day = temp_start.day();
                    //console.log('day : ' , day)
                    //console.log('temp date : ' , temp_start.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
                    if(selectWeek.indexOf(day) != -1 ){
                    //if(day === 0 || day === 6){
                         count++;
                         //console.log("일하는날 count++");
                         //console.log('count : ' , count)
                    }else{
                         
                         //console.log("일안하는 날")
                    }
                    temp_start.date(temp_start.date() + 1);
               }
          }
          //console.log('시작일자부터 종료일짜 까지 총 일하는 일수 : ' , count)
          return count;
     }



// 근무시작일자부터 오늘까지 선택한 요일로 계산하여 지난 날수 계산
export function  calcPastWeekDay(todayDate, salaryStartDate, selectWeek){
          const temp_today = moment();

          temp_today.year(todayDate.year())
          temp_today.date(todayDate.date());
          temp_today.month(todayDate.month());
          //temp_today.hour(startHour);
          temp_today.minute(0);

          console.log('temp_today' , temp_today.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
          console.log('salaryStartDate' , salaryStartDate.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
          console.log('selectWeek' , selectWeek);
          //console.log('selectWeek' , selectWeek);

          const DecreaseTodayDate = temp_today;
          DecreaseTodayDate.date(temp_today.date());
          
          let count = 0;
          
          while(true) {  
               let temp_date = salaryStartDate;
               // 요기부분이 참애매하다 월급날 기준으로 다시돌릴지 월급날 다음날 기준으로 다시돌릴지..
               // 일단 월급날 다음날부터 돌리자

               //temp_date.setDate(temp_date.getDate() - 1)
               //console.log("temp_date", temp_date)

               //28일이면 27일까지 계산됨
               //console.log("DecreaseTodayDate", DecreaseTodayDate)

               if(temp_date > DecreaseTodayDate){
                    //console.log("count", count)
                    break;
               }else{
                    const day = temp_date.day();
                    //console.log('day : ' , day)
                    //console.log('temp date : ' , temp_date.format('YYYY년 - MM월 -DD일 HH시 : mm분 dddd요일'));
                    
                    // if(selectWeek.indexOf(day) != -1 ){
                    //      console.log('index is : ' , day)
                    // }else{
                    //      console.log('index not in :' , day)
                    // }

                    //console.log(day);
                    if(selectWeek.indexOf(day) != -1 ){
                    //if(day === 0 || day === 6){
                         count++;
                         //console.log("평일");
                         //console.log('count : ' , count)
                    }else{
                         //console.log("주말")
                    }
                    temp_date.date(temp_date.date() + 1);
               }
          }
          //console.log('week count : ' , count)

          return count;
          //console.log(count);
     }

export function TodayIsWorkingDay(today, selectWeek){

          //console.log("today", today)
          //console.log("today", selectWeek)

          if(selectWeek.indexOf(today) != -1){
               console.log("오늘은 일하는 날")
               return true;
          }else{
               console.log("오늘은 일안하는 날")
               return false;
          }
          
          
     }