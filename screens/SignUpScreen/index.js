import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          signUp: (username, password, email) => {
               return dispatch(userActions.signUp(username, password, email))
          },
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null , mapDispatchToProps)(Container);