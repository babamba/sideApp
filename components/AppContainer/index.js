import { connect } from "react-redux";
import AppContainer from "./presenter";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
     const { user } = state;
     console.log(user.isLoggedIn);
     console.log(user.already)
     return {
          isLoggedIn: user.isLoggedIn,
          profile: user.profile
     };
};


const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          setAlreadyLaunch : (launched) => {
               dispatch(userActions.setAlreadyLaunch(launched));
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);