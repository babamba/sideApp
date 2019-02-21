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
          
