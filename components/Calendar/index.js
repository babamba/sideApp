import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions} from "../../redux/modules/data"

const mapStateToProps = (state, ownProps) => {
     const { data : { AllIncreaseData , AllMealData, AllPurchaseData }  } = state;
     return {
          AllIncreaseData : AllIncreaseData,
          AllMealData : AllMealData,
          AllPurchaseData : AllPurchaseData
     };
};

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          getAllData : (date, type) => {
               dispatch(dataActions.getAllData(date, type));
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