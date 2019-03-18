import { connect } from "react-redux";
import Container from "./container";

// const mapStateToProps = (state, ownProps) => {
//      const { timer } = state;
//      return {
//           timer : timer.percent
//      };
// };


// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           setAlreadyLaunch : (launched) => {
//                dispatch(userActions.setAlreadyLaunch(launched));
//           }
//      }
// }

export default connect()(Container);