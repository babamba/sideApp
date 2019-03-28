import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions } from "../../redux/modules/data";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submitFixConsum: (income_name, price, feeling, consumType) => {
               console.log("submitConsum", income_name, price, feeling, consumType);
               return dispatch(dataActions.submitFixConsum(income_name, price, feeling, consumType));
          },
          getFixData : () => {
               return dispatch(dataActions.getFixData());
          }
          
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null ,mapDispatchToProps)(Container);