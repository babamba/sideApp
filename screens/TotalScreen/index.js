import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"
import { actionCreators as timerActions} from "../../redux/modules/timer"

const mapStateToProps = (state, ownProps ) => {
     const { data, timer } = state;
     return {
          monthSallery : timer.monthSallery
          // TodayMealProduct : data.TodayMealProduct,
          // currentPrice : data.TodayMealPrice
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          // getDataMealToday : (date) => {
          //      return dispatch(dataActions.getDataMealToday(date));
          // },
          // getDataMealMonth : (date) => {
          //      return dispatch(dataActions.getDataMealMonth(date));
          // },

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