import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";
//import { actionCreators as timerActions } from "../../redux/modules/timer";

const mapStateToProps = (state, ownProps) => {
     const { user, timer } = state;
     console.log("mapStateToProps", user.isLoggedIn);
     //console.log(user.already)
     return {
          isLoggedIn: user.isLoggedIn,
          profile: user.profile,
     };
};

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          logOut : () => {
               dispatch(userActions.logOut());
          },
          // resetData : () => {
          //      dispatch(timerActions.resetData());
          // }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);