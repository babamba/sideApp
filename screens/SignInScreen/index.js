import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as timerActions } from "../../redux/modules/timer";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          login: (username, password) => {
               return dispatch(userActions.login(username, password))
          },
          getData : () => {
               return dispatch(timerActions.getData());
          }
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null , mapDispatchToProps)(Container);