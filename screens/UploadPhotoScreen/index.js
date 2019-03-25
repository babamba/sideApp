import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as dataActions } from "../../redux/modules/data";

const mapDispatchToProps = (dispatch, ownProps) => {
     return {
          // submit : (file, capture, location, tags ) => {
          //      return dispatch(PhotoActions.uploadPhoto(file, capture, location, tags));
          // }
     }
}

export default connect()(Container);