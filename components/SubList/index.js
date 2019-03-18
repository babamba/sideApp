import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as timerActions } from "../../redux/modules/timer";

const mapStateToProps = (state, ownProps) => {
     const { timer } = state;
     return {
          timer : timer.percent
     };
};


// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           setAlreadyLaunch : (launched) => {
//                dispatch(userActions.setAlreadyLaunch(launched));
//           }
//      }
// }

export default connect()(Container);