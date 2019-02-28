import React, {Component} from "react";
import PropTypes from "prop-types";
import SwipeScreen from "./presenter";
import { image } from "react-native";

// 계산에 사용될 Date객체 
const TODAY_DATE = new Date();

// 계산에 필요한 연원일
const getDay = TODAY_DATE.getDay();
const getDate = TODAY_DATE.getDate();
const getMonth = TODAY_DATE.getMonth();
const getYear = TODAY_DATE.getFullYear();

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

     // 계산에 사용될 Date객체 

     constructor(props){
          super(props);
          //console.log(this.props); // prints out whatever is inside props
          const { monthSallery, workingWeekDay , workingHour, startHour, endHour  ,isPlaying} = this.props

           // 근무시작 근무종료 객체들
          const TODAY_START_DATE = new Date(getYear, getMonth, getDate, startHour);
          const TODAY_END_DATE = new Date(getYear, getMonth, getDate, endHour);
          console.log("start and end : ", TODAY_START_DATE.toLocaleString(), "  / " ,  TODAY_END_DATE.toLocaleString())

          //console.log(weekSallery , "  " ,hourSallery , "  " ,minuteSallery , "  " ,secondSallery , "  " );

          //항상 초기화해야할것들
          this.state = {
               isFetching : false,
               isPlaying,
               SECOND_SALARY:0,
               INTERVAL_SECOND:0,
               WORKING_SECOND:0,
               CURRENT_SALARY:0,
               PERCENT:0,
               selectedIndex:0,

               //변경되지않을값들
               TODAY_START_DATE,
               TODAY_END_DATE,
               monthSallery,
               workingWeekDay,
               workingHour,
               renderArray: [true, false, false, false],
               timerInterval:null
          };
     }

     static propsType = {
          SetSecondMoney:PropTypes.func.isRequired,
     }

     componentWillUnmount() {
          // if (this.state.timerInterval) {
          //   clearInterval(this.state.timerInterval)
          //   this.setState({ timerInterval: null })
          // }
          if(this.state.timerInterval){
               clearInterval(this.state.timerInterval);
               this.setState({timerInterval : null})
          }
          
        }

     componentWillMount() {
          const { TODAY_START_DATE, TODAY_END_DATE, monthSallery, workingWeekDay, workingHour} = this.state;

          //일할 시간 (고정))
          const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);

          //시작 시작부터 흐른 시간
          const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);
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

          const secondSallery = Math.floor( minuteSallery / 60 );
          //console.log("secondSallery : 초당" , secondSallery, "원");

          //타이머에서 계속 증가되야될것들
          //console.log("CURRENT_SALARY : 지금까지 번돈 초당" , (INTERVAL_SECOND * secondSallery), "원");

          const CURRENT_SALARY = Math.floor(INTERVAL_SECOND * secondSallery);
          
          
          // this.setState({
          //            CURRENT_SALARY: CURRENT_SALARY + secondSallery, // 현재시간까지 번돈
          //            PERCENT            //현재시간까지의 퍼센트
          // })

          console.log("계산된 샐러리",CURRENT_SALARY)
          this.setState({
               CURRENT_SALARY,
               PERCENT,
               SECOND_SALARY: secondSallery
          })

     }

     componentDidMount() {
          //const currentProps = this.props;
          //console.log(currentProps)

          
          

          // }, 1000);

          const timerInterval = setInterval(() => {
               const {CURRENT_SALARY, PERCENT, SECOND_SALARY} = this.state;
               console.log("state 샐러리",CURRENT_SALARY, PERCENT, SECOND_SALARY)
               console.log("실행 중 rerender swipeScreen");
               this.setState({
                    CURRENT_SALARY: CURRENT_SALARY + (SECOND_SALARY * 3 ), // 현재시간까지 번돈
                    PERCENT,            //현재시간까지의 퍼센트
                    timerInterval
               })
          }, 3000);


          //if(currentProps.isPlaying && INTERVAL_SECOND < WORKING_SECOND ){
        //     if(currentProps.isPlaying  ){
        //        const timerInterval = setInterval(() => {
        //             console.log("실행 중");
        //             console.log("PERCENT",PERCENT);
        //             currentProps.SetSecondMoney(secondSallery);
        //             currentProps.addSecond();
        //             currentProps.addPercent(PERCENT);

        //             this.setState({
        //                 currentSecondSallery,
        //                 PERCENT,
        //                 timerInterval
        //             })

        //        }, 1000);
        //   }else if(!currentProps.isPlaying ){
        //      console.log("정지")
        //      clearInterval(this.state.timerInterval);
        //   }
     }

     static navigationOptions = {
          gesturesEnabled: false,
     }  

     componentWillReceiveProps = nextProps => {
          const currentProps = this.props;
          //console.log("!@# next ",nextProps)
     }

     onIndexChanged = index => {
          console.log("swiperIndexChanged", "index", index);
          
          //setTimeout(()=>this.setState({selectedIndex:index}),200)
          //this.setState({ renderArray: tempvar});
          const tempvar = this.state.renderArray;
               console.log("index  >>>> 0 " )
               tempvar.forEach(function(val,idx) { 
                    console.log(idx, " : " , index)
                    tempvar[idx] = false
                    if(index === idx){
                         tempvar[idx] = true
                    }
               }) 
          
          this.setState({ renderArray: tempvar, selectedIndex:index}); //<<======== problem with this
          console.log(tempvar)
     };

     _onScrollBeginDrag = (e, state) => {
          console.log("_onScrollBeginDrag is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),1000)
          // this.setState({
          //      selectedIndex:state.index
          // });
     }

     _onMomentumScrollEnd =  (e, state) => {
          console.log("_onMomentumScrollEnd is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),100)
          setTimeout(()=>this.setState({refresh:true}),400);
     }

     _onTouchStartCapture = (e, state) => {
          console.log("_onTouchStartCapture is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),100)
          // this.setState({
          //      selectedIndex:state.index
          // });
     }

     _onScrollEnd = (e, state) => {
          console.log("_onScrollEnd:", state.index);
          // this.setState({
          //      selectedIndex:state.index
          // });
     };

     render() {
          return (
               <SwipeScreen 
                    {...this.props} 
                    {...this.state}
                    //refresh={this._refresh} 
                    onIndexChanged={this.onIndexChanged}
                    onScrollEnd={this._onScrollEnd}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onTouchStartCapture={this._onTouchStartCapture}
               />
          );
     }
}

export default Container;