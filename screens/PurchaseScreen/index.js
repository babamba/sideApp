import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"

const mapStateToProps = (state, ownProps ) => {
     const { data } = state;
     //console.log("stateToprops : ", data.TodayPurchaseProduct)
     return {
          TodayPurcahseProduct : data.TodayPurchaseProduct,
          currentPrice : data.TodayPurchasePrice
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getDataPurchaseToday : (date) => {
               return dispatch(dataActions.getDataPurchaseToday(date));
          },
          getDataPurchaseMonth : (date) => {
               return dispatch(dataActions.getDataPurchaseMonth(date));
          },

          // initApp: () => {
          //      dispatch(photoActions.getFeed());
          //      dispatch(photoActions.getSearch());
          //      dispatch(userActions.getNotifications());
          //      dispatch(userActions.getOwnProfile());
          //      dispatch(userActions.registerForPush());
          //    }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);