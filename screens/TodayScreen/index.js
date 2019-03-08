import { connect } from "react-redux";
import Container from "./container";
import { ThemeProvider } from "react-native-paper";
import { actionCreators as timerActions } from "../../redux/modules/timer";

const mapStateToProps = (state, ownProps) => {
     const { timer } = state;

     return {
          todayDate : timer.todayDate
     };
};


const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          setTodate : (todayDate) => {
               dispatch(timerActions.setTodate(todayDate))
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);