import { connect } from "react-redux";
import Container from "./container";
import { bindActionCreators } from "redux";
import { actionCreators as timerActions } from "../../redux/modules/timer";

// const mapStateToProps = (state, ownProps) => {
//      const { timer } = state;
//      return {
//           monthSallery : timer.monthSallery,
//           workingWeekDay: timer.workingWeekDay,
//           workingHour: timer.workingHour,
//           startHour : timer.startHour,
//           endHour : timer.endHour,
//           currentDate:timer.currentDate,
//           isPlaying:timer.isPlaying,
//           isPlaying:true,
//           workingTime: timer.workingTime
//      }
//      const { timer } = state;
//      console.log(state);
//      console.log(user.isLoggedIn);
//      console.log(user.already)
//      return {
//           isLoggedIn: user.isLoggedIn,
//           profile: user.profile
//      };
// };


// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           addSecond : () => {
//                dispatch(timerActions.addSecond())
//           },
//           SetSecondMoney : (sallery) => {ß
//                dispatch(timerActions.SetSecondMoney(sallery))
//           },
//           addPercent : (percent) => {
//                dispatch(timerActions.addPercent(percent))
//           },
//      }
// }

export default connect()(Container);