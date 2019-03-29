import { connect } from "react-redux";
import AppContainer from "./presenter";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as dataActions } from "../../redux/modules/data";
import { actionCreators as timerActions } from "../../redux/modules/timer";

const mapStateToProps = (state, ownProps) => {
     const { user, timer } = state;
     //console.log("mapStateToProps", user.isLoggedIn);
     //console.log(user.already)
     return {
          locked: user.locked,
          isLoggedIn: user.isLoggedIn,
          profile: user.profile,
          isSetData : timer.isSetData,
          launched: user.launched
     };
};


const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          setAlreadyLaunch : (launched) => {
               dispatch(userActions.setAlreadyLaunch(launched));
          },
          logOut : () => {
               dispatch(userActions.logOut());
          },
          initApp: (date) => {
               //앱시작시 기준날짜 관리
               dispatch(timerActions.onInitCheckStandard());
               dispatch(userActions.registerForPush());
               dispatch(dataActions.getReportDataToday(date));
               dispatch(dataActions.getFixData());
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);