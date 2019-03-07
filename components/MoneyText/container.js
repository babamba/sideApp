import React, {Component} from "react";
import PropTypes from "prop-types";
import MoneyText from "./presenter";
import { image } from "react-native";



class Container extends Component {

     state = {
          isFetching : false,
     }

     componentWillReceiveProps = nextProps => {
          if(nextProps.type === "Today"){
               console.log("!@!@! TODAY Money comp next: " , nextProps.CURRENT_SALARY)
          }else if(nextProps.type === "Month"){
               console.log("!@!@! MONTH Money comp next: " , nextProps.MONTH_CURRENT_SALARY)
          }
          
     }

     // constructor(props){
     //      super(props);
     //      //console.log(this.props); // prints out whatever is inside props
     //      const { monthSallery, workingWeekDay, workingHour, startHour, endHour ,SetSecondMoney ,addSecond ,isPlaying} = this.props

     //       // 근무시작 근무종료 객체들
     //      const TODAY_START_DATE = new Date(getYear, getMonth, getDate, startHour);
     //      const TODAY_END_DATE = new Date(getYear, getMonth, getDate, endHour);
     //      console.log("start and end : ", TODAY_START_DATE.toLocaleString(), "  / " ,  TODAY_END_DATE.toLocaleString())

     //      const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);


     //      //시작 시작부터 흐른 시간
     //      const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);

     //      const weekCount = dayInMonth();
     //      console.log(weekCount);

     //      const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
     //      // console.log("percent!!!!" , percent);
     
     //      const weekSallery = (monthSallery / weekCount);

     //      const hourSallery = Math.floor( weekSallery / workingHour );

     //      const minuteSallery = Math.floor( hourSallery / 60 );

     //      const secondSallery = Math.floor( minuteSallery / 60 );

     //      console.log(weekSallery , "  " ,hourSallery , "  " ,minuteSallery , "  " ,secondSallery , "  " );

     //      this.state = {
     //           isFetching : false,
     //           isPlaying,
     //           secondSallery,
     //           INTERVAL_SECOND,
     //           WORKING_SECOND,
     //           PERCENT
     //      };
     // }

     // static propsType = {
     //      SetSecondMoney:PropTypes.func.isRequired,
     // }

     // componentDidMount() {
     //      const currentProps = this.props;
     //      console.log(currentProps)

     //      const { secondSallery, WORKING_SECOND, INTERVAL_SECOND, PERCENT } = this.state;
     //      console.log(secondSallery)

     //      if(currentProps.isPlaying && INTERVAL_SECOND < WORKING_SECOND ){
     //           const timerInterval = setInterval(() => {
     //                console.log("실행 중");
     //                console.log("PERCENT",PERCENT);
     //                currentProps.SetSecondMoney(secondSallery);
     //                currentProps.addSecond();
     //                currentProps.SetSecondMoney(secondSallery);
     //                currentProps.addPercent(PERCENT);
     //           }, 1000);
     //      }else if(!currentProps.isPlaying || INTERVAL_SECOND >= WORKING_SECOND){
     //         console.log("정지")
     //         clearInterval(this.state.timerInterval);
     //      }
     // }

     // componentWillReceiveProps(nextProps){
     //      const currentProps = this.props;

     //      console.log("currentProps" , currentProps);

     //      //console.log(`The current props ar : ${currentProps.isPlaying} and the new ones are ${nextProps.isPlaying} `);
     //      //if(!currentProps.isPlaying && nextProps.isPlaying){
     //          console.log("should start");

     //          const timerInterval = setInterval(() => {
     //                console.log("asdfasdf");
     //                currentProps.addSecond();
     //          }, 1000);

     //          this.setState({
     //                timerInterval
     //          })
     //          // start interval
     //      //}else if(currentProps.isPlaying && !nextProps.isPlaying){
     //          // stop interval ( clear )
     //      //    console.log("should stop")
     //      //    clearInterval(this.state.timerInterval);
     //      //}
     // }

     componentWillReceiveProps = nextProps => {
          // const currentProps = this.props;

          // console.log("willProps : " , currentProps , " /nextProps :" ,nextProps);

          // this.setState({
          //      secondSallery : nextProps.secondSallery
          // })
     }

     render() {
          //console.log("money", this.props)
          //console.log("asdfasdfasdfasdfasdf", this.props)
          return (
               <MoneyText 
                    {...this.props} 
                    {...this.state} 
                    // refresh={this._refresh} 
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