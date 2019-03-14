import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as timerActions } from "../../redux/modules/timer";
import { actionCreators as dataActions } from "../../redux/modules/data";

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
          },
          getDataIncreaseToday : (date) => {
               return dispatch(dataActions.getDataIncreaseToday(date));
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);