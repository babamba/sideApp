import { connect } from "react-redux";
import Container from "./container";
import { ThemeProvider } from "react-native-paper";
import { actionCreators as timerActions } from "../../redux/modules/timer";

// const mapStateToProps = (state, ownProps) => {
//      const { timer } = state;

//      return {
//      };
// };


// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           addSecond : () => {
//                dispatch(timerActions.addSecond())
//           },
//           SetSecondMoney : (sallery) => {
//                dispatch(timerActions.SetSecondMoney(sallery))
//           },
//           addPercent : (percent) => {
//                dispatch(timerActions.addPercent(percent))
//           },
//      }
// }

export default connect()(Container);