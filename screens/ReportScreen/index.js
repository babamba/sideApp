import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"

const mapStateToProps = (state, ownProps) => {
     const { data : { 
          TodayReportData , MonthReportData, 
          ReportIncreaseTodayPrice,
          ReportMealTodayPrice, 
          ReportPurchaseTodayPrice ,
          ReportIncreaseMonthPrice , 
          ReportMealMonthPrice, 
          ReportPurchaseMonthPrice ,
     }} = state;
     return {
          TodayReportData , MonthReportData, 
          ReportIncreaseTodayPrice,
          ReportMealTodayPrice, 
          ReportPurchaseTodayPrice ,
          ReportIncreaseMonthPrice , 
          ReportMealMonthPrice, 
          ReportPurchaseMonthPrice ,
     };
};

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getReportDataToday : (date) => {
               return dispatch(dataActions.getReportDataToday(date));
          },
          getReportDataMonth : (date) => {
               return dispatch(dataActions.getReportDataMonth(date));
          },
          oninit: (date) => {
               dispatch(dataActions.getReportDataToday(date));
               dispatch(dataActions.getReportDataMonth(date));
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