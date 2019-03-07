import { connect } from "react-redux";
import Container from "./container";
import { ThemeProvider } from "react-native-paper";
import { actionCreators as timerActions } from "../../redux/modules/timer";

const mapStateToProps = (state, ownProps) => {
     const { timer } = state;
     return {
          isSetData: timer.isSetData,
          monthSallery : timer.monthSallery,
          selectWeek: timer.selectWeek,
          workingWeekDay: timer.workingWeekDay,
          workingHour: timer.workingHour,
          startHour : timer.startHour,
          endHour : timer.endHour,
          currentDate:timer.currentDate,
          isPlaying:timer.isPlaying,
          //isPlaying:true,
          salaryDay:timer.salaryDay,
          salaryPayType :timer.salaryPayType,
          standardMonth:timer.standardMonth
     }
     //const { timer } = state;
     //console.log(state);
     // console.log(user.isLoggedIn);
     // console.log(user.already)
     // return {
     //      isLoggedIn: user.isLoggedIn,
     //      profile: user.profile
     // };
};


// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//      }
// }

export default connect(mapStateToProps)(Container);