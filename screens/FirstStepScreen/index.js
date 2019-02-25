import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as timerAction } from "../../redux/modules/timer";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submitData: (salary, salaryDay, salaryWeek, startHour, endHour) => {
               return dispatch(timerAction.submitData(salary, salaryDay, salaryWeek, startHour, endHour))
          },
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null , mapDispatchToProps)(Container);