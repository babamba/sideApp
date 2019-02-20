import React, {Component} from "react";
import PropTypes from "prop-types";
import TodayScreen from "./presenter";
import { image } from "react-native";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
     };

     static navigationOptions = {
          gesturesEnabled: false,
     }  

     state = {
          isFetching : false,
          monthSallery : 2300000,
          todaySallery : 0,
          progress: 20,
          progressWithOnComplete: 0,
          progressCustomized: 0,
          workingWeekDay : 5,
          workingHour: 8
     };

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.feed", nextProps.feed);
          if(nextProps.feed){
               this.setState({
                    isFetching : false
               })
          }
     }

     componentDidMount = () => {
          const { monthSallery, workingWeekDay, workingHour } = this.state

          const weekCount = dayInMonth();
          console.log("weekCount!!!!" , weekCount);

          //주간 급여   -> 월 실수령액 / 한달에 주 수(ex 5주 / 6주 )
          const weekSallery = monthSallery / weekCount;
          console.log("weekSallery!!!!" , weekSallery);
          
          //하루 일당   -> 주간급여 / 주간일하는 날수
          const todaySallery = Math.floor( weekSallery / workingWeekDay );
          console.log("todaySallery!!!!" , todaySallery);
          
          // 1시간 급여 -> 일급여 / 하루 일하는 시간 = 시급
          const hourSallery = Math.floor( todaySallery / workingHour );
          console.log("todayPercent!!!!" , hourSallery);
          
          // 1분 급여 => 
          const minuteSallery = Math.floor( hourSallery / 60 );
          console.log("todayPercent!!!!" , minuteSallery);

          const percent = 

          // const { initApp } = this.props;
          // initApp();
          //const progressValue = Math.floor(todaySallery)

     };

     render() {
          return (
               <TodayScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
               />
          );
     }

     _refresh = () => {
          //const { getSalary } = this.props;
          this.setState({
               isFetching : true
          });
          //getFeed();
          console.log("isFetch refresh")
     }
}

const date = new Date();
// const dayCount = 

dayInMonth = () => {
     const date = new Date();

     const year  = Number(date.toLocaleDateString("de-DE", {year: "numeric"}));
     const month = Number(date.toLocaleDateString("de-DE", {month: "2-digit"}));
     const nowDate = new Date(year, month-1, 1);
     const lastDate = new Date(year, month, 0).getDate();
     const monthSWeek = nowDate.getDay();
     const weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
  
     return weekSeq;
}

export default Container;