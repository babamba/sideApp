import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"

const mapStateToProps = (state, ownProps ) => {
     const { data } = state;
     console.log("!_!_!_!_!_ data.currentToday : ", data.TodayIncreasePrice)
     console.log("!_!_!_!_!_ data.currentMonth : ", data.MonthIncreasePrice)

     return {
          MonthIncreaseProduct : data.MonthIncreaseProduct,
          currentToday : data.TodayIncreasePrice,
          currentMonth : data.MonthIncreasePrice
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getDataIncreaseMonth : (date) => {
               return dispatch(dataActions.getDataIncreaseMonth(date));
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