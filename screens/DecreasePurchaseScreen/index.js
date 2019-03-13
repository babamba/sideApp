import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions } from "../../redux/modules/data";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          submitConsum: (income_name, price, feeling, consumType) => {
               console.log("submitConsum", income_name, price, feeling, consumType);
               return dispatch(dataActions.submitConsum(income_name, price, feeling, consumType));
          },
          // getDataMealToday : (date) => {
          //      dispatch(dataActions.getDataMealToday(date));
          // },
          // fbLogin : () => {
          //      dispatch(userActions.facebookLogin());
          // }
     }
}


export default connect(null ,mapDispatchToProps)(Container);