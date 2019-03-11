import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submitConsum: (income_name, price, feeling, consumType) => {
               console.log("submitConsum", income_name, price, feeling, consumType);
               return dispatch(userActions.submitConsum(income_name, price, feeling, consumType));
          },
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null ,mapDispatchToProps)(Container);