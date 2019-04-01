import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as timerAction } from "../../redux/modules/timer";
import { actionCreators as userActions } from "../../redux/modules/user";


const mapStateToProps = (state, ownProps) => {
     const { user, timer } = state;
     console.log("mapStateToProps", user.isLoggedIn);
     //console.log(user.already)
     return {
          isLoggedIn: user.isLoggedIn,
          profile: user.profile,
          isSetData : timer.isSetData,
          state_monthSallery: timer.monthSallery,
          state_salaryDay : timer.salaryDay,
          state_selectWeek : timer.selectWeek,
          state_startHour: timer.startHour,
          state_endHour : timer.endHour
     };
};

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submitData: (monthSallery, salaryDay, selectWeek, workingWeekDay, startHour, endHour) => {
               return dispatch(timerAction.submitData(monthSallery, salaryDay, selectWeek, workingWeekDay, startHour, endHour))
          },
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }

          logOut : () => {
               dispatch(userActions.logOut());
          }
     }
}


export default connect(mapStateToProps , mapDispatchToProps)(Container);