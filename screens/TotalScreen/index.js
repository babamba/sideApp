import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"
import { actionCreators as timerActions} from "../../redux/modules/timer"


const mapStateToProps = (state, ownProps ) => {
     const { data, timer } = state;
     console.log("mapStateToProps FixConsumProduct", data.FixConsumProduct)
     console.log("mapStateToProps FixConsumPrice", data.FixConsumPrice)
     return {
          monthSallery : timer.monthSallery,
          FixConsumProduct : data.FixConsumProduct,
          FixConsumPrice : data.FixConsumPrice,
          BudgetPrice : data.BudgetPrice
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getFixData : () => {
               return dispatch(dataActions.getFixData());
          }
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