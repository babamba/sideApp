import { connect } from "react-redux";
import Container from "./container";

// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           submitConsum: (income_name, price, feeling, consumType) => {
//                console.log("submitConsum", income_name, price, feeling, consumType);
//                return dispatch(dataActions.submitConsum(income_name, price, feeling, consumType));
//           },
          
//           // fbLogin : () => {
//           //      dispatch(userActions.facebookLogin());
//           // }
//      }
// }


export default connect()(Container);