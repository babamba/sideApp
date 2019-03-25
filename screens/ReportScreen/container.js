import React, {Component} from "react";
import PropTypes from "prop-types";
import ReportScreen from "./presenter";
import moment from "moment";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
     };

     state = {
          isTodayFetching : false,
          isMonthFetching: false,
          modalVisibleCalendar: false,

     };

     componentWillReceiveProps = nextProps => {
          if(nextProps.TodayReportData){
               this.setState({
                    isTodayFetching : false,
                    isMonthFetching: false
               })
          }
     }


     componentDidMount = () => {
          const { oninit } = this.props;
          console.log("nextProps Report ()()()() : ", this.props.TodayReportData);
          oninit(moment().format("YYYYMMDD"));
     };

     render() {
          return (
               <ReportScreen 
                    {...this.props} 
                    {...this.state} 
                    refreshToday={this._refreshToday} 
                    refreshMonth={this._refreshMonth} 
                    setModalVisibleCalendar={this.setModalVisibleCalendar}
               />
          );
     }

     setModalVisibleCalendar = () => {
          const { modalVisibleCalendar } = this.state;
          console.log(modalVisibleCalendar)
          if(modalVisibleCalendar){
               this.setState({
                    modalVisibleCalendar: false
               });
          }else{
               this.setState({
                    modalVisibleCalendar: true
               });
          }    
     }

     _refreshToday = () => {
          const { 
               getReportDataToday , 
               
          } = this.props;
          getReportDataToday(moment().format("YYYYMMDD"));
          this.setState({
               isTodayFetching : true
          });

          console.log("isTodayFetching refresh")
     }

     _refreshMonth = () => {
          const { getReportDataMonth } = this.props;

          getReportDataMonth(moment().format("YYYYMMDD"));
          this.setState({
               isMonthFetching : true
          });
          console.log("isMonthFetching refresh")
     }
}
export default Container;