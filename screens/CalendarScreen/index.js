import { connect } from "react-redux";
import Container from "./container";
// import { actionCreators as userActions} from "../../redux/modules/user"
import { actionCreators as dataActions} from "../../redux/modules/data"

const mapStateToProps = (state, ownProps ) => {
     const { data } = state;
     //console.log("data.TodayMealProduct : ", data.TodayMealProduct)
     return {
          MonthMealProduct : data.TodayMealProduct,
          MonthPrice : data.MonthMealPrice,

          MonthPurchaseProduct : data.MonthMealProduct,
          MonthPurchasePrice : data.MonthPurchasePrice,

          MonthIncreaseProduct : data.MonthIncreaseProduct,
          MonthIncreasePrice : data.MonthIncreasePrice
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getDataMealMonth : (date) => {
               return dispatch(dataActions.getDataMealMonth(date));
          },
          getDataPurchaseMonth : (date) => {
               return dispatch(dataActions.getDataPurchaseMonth(date));
          },
          getDataIncreaseMonth : (date) => {
               return dispatch(dataActions.getDataIncreaseMonth(date));
          },
          getAllData : (date, type) => {
               return dispatch(dataActions.getAllData(date, type));
          }
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

// const mapStateToProps = (state, ownProps ) => {
//      const { photos : { feed } } = state
//      //console.log(state);
//      //console.log(feed)
//      return {
          
//           feed
//      }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//      return {
//           getFeed : () => {
//                dispatch(photoActions.getFeed());
//           },
//           initApp: () => {
//                dispatch(photoActions.getFeed());
//                dispatch(photoActions.getSearch());
//                dispatch(userActions.getNotifications());
//                dispatch(userActions.getOwnProfile());
//                dispatch(userActions.registerForPush());
//           }
//      }
// }

//export default connect()(Container);