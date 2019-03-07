import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as timerAction } from "../../redux/modules/timer";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submitData: (monthSallery, salaryDay, selectWeek, workingWeekDay, startHour, endHour) => {
               return dispatch(timerAction.submitData(monthSallery, salaryDay, selectWeek, workingWeekDay, startHour, endHour))
          },
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null , mapDispatchToProps)(Container);