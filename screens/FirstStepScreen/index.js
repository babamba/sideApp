import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as timerAction } from "../../redux/modules/timer";
import { actionCreators as userActions } from "../../redux/modules/user";

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


export default connect(null , mapDispatchToProps)(Container);