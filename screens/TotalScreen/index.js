import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"
import { actionCreators as timerActions} from "../../redux/modules/timer"


const mapStateToProps = (state, ownProps) => {
     const { data, timer } = state;
     //console.log("mapStateToProps FixConsumProduct", data.FixConsumProduct)
     //console.log("mapStateToProps FixConsumPrice", data.FixConsumPrice)
     //console.log("month data report : " , data.MonthReportData)
     return {
          monthSallery : timer.monthSallery,
          FixConsumProduct : data.FixConsumProduct,
          FixConsumPrice : data.FixConsumPrice,
          BudgetPrice : data.BudgetPrice,
          MonthReportData :  data.MonthReportData, 
          ReportIncreaseMonthPrice : data.ReportIncreaseMonthPrice, 
          ReportMealMonthPrice : data.ReportMealMonthPrice, 
          ReportPurchaseMonthPrice :data.ReportPurchaseMonthPrice
     }
}

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getFixData : () => {
               return dispatch(dataActions.getFixData());
          },
          deleteFixData : (enrollId) => {
               return dispatch(dataActions.deleteFixData(enrollId));
          },
          getReportDataMonth : (date) => {
               return dispatch(dataActions.getReportDataMonth(date));
          },
          oninit: (date) => {
               dispatch(dataActions.getReportDataMonth(date));
          }

          // initApp: (date) => {
          //      //앱시작시 기준날짜 관리
          //      dispatch(dataActions.getDataMealMonth(date));
          //      dispatch(dataActions.getDataPurchaseMonth(date));
          //      dispatch(dataActions.getDataIncreaseMonth(date));
          // },
          // getAllData : (date, type) => {
          //      dispatch(dataActions.getAllData(date, type));
          // }
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