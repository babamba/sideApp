import React, {Component} from "react";
import PropTypes from "prop-types";
import SwipeScreen from "./presenter";
import { image } from "react-native";

// 계산에 사용될 Date객체 
const TODAY_DATE = new Date();

// 계산에 필요한 연원일
const getDay = TODAY_DATE.getDay();
const getDate = TODAY_DATE.getDate();
const getMonth = TODAY_DATE.getMonth();
const getYear = TODAY_DATE.getFullYear();

dayInMonth = () =>  {
     const date = new Date();
     const year  = Number(date.toLocaleDateString("de-DE", {year: "numeric"}));
     const month = Number(date.toLocaleDateString("de-DE", {month: "2-digit"}));
     const nowDate = new Date(year, month-1, 1);
     const lastDate = new Date(year, month, 0).getDate();
     const monthSWeek = nowDate.getDay();
     const weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;

     return weekSeq;
}

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     // 계산에 사용될 Date객체 

     constructor(props){
          super(props);
          //console.log(this.props); // prints out whatever is inside props
          const { monthSallery, workingWeekDay, currentSecondSallery, workingHour, startHour, endHour ,SetSecondMoney ,addSecond ,isPlaying} = this.props

           // 근무시작 근무종료 객체들
          const TODAY_START_DATE = new Date(getYear, getMonth, getDate, startHour);
          const TODAY_END_DATE = new Date(getYear, getMonth, getDate, endHour);
          console.log("start and end : ", TODAY_START_DATE.toLocaleString(), "  / " ,  TODAY_END_DATE.toLocaleString())

          const WORKING_SECOND = Math.floor((TODAY_END_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);


          //시작 시작부터 흐른 시간
          const INTERVAL_SECOND = Math.floor((TODAY_DATE.getTime() - TODAY_START_DATE.getTime()) / 1000);

          const weekCount = dayInMonth();
          console.log(weekCount);

          const PERCENT = Math.floor(( INTERVAL_SECOND / WORKING_SECOND  ) * 100);
          // console.log("percent!!!!" , percent);
     
          const weekSallery = (monthSallery / weekCount);

          const hourSallery = Math.floor( weekSallery / workingHour );

          const minuteSallery = Math.floor( hourSallery / 60 );

          const secondSallery = Math.floor( minuteSallery / 60 );

          console.log(weekSallery , "  " ,hourSallery , "  " ,minuteSallery , "  " ,secondSallery , "  " );

          this.state = {
               isFetching : false,
               isPlaying,
               secondSallery,
               INTERVAL_SECOND,
               WORKING_SECOND,
               PERCENT,
               selectedIndex:0,
               renderArray: [true, false, false, false]
          };
     }

     static propsType = {
          SetSecondMoney:PropTypes.func.isRequired,
     }

     componentDidMount() {
          const currentProps = this.props;
          console.log(currentProps)

          const { secondSallery, WORKING_SECOND, INTERVAL_SECOND, PERCENT, currentSecondSallery } = this.state;
          console.log(secondSallery)

          //if(currentProps.isPlaying && INTERVAL_SECOND < WORKING_SECOND ){
        //     if(currentProps.isPlaying  ){
        //        const timerInterval = setInterval(() => {
        //             console.log("실행 중");
        //             console.log("PERCENT",PERCENT);
        //             currentProps.SetSecondMoney(secondSallery);
        //             currentProps.addSecond();
        //             currentProps.addPercent(PERCENT);

        //             this.setState({
        //                 currentSecondSallery,
        //                 PERCENT
        //             })

        //        }, 1000);
        //   }else if(!currentProps.isPlaying ){
        //      console.log("정지")
        //      clearInterval(this.state.timerInterval);
        //   }
     }

     static navigationOptions = {
          gesturesEnabled: false,
     }  

     componentWillReceiveProps = nextProps => {
          console.log("!@# next ",nextProps)
     }

     onIndexChanged = index => {
          console.log("swiperIndexChanged", "index", index);
          
          //setTimeout(()=>this.setState({selectedIndex:index}),200)
          //this.setState({ renderArray: tempvar});
          const tempvar = this.state.renderArray;
               console.log("index  >>>> 0 " )
               tempvar.forEach(function(val,idx) { 
                    console.log(idx, " : " , index)
                    tempvar[idx] = false
                    if(index === idx){
                         tempvar[idx] = true
                    }
               }) 
               this.setState({ renderArray: tempvar, selectedIndex:index}); //<<======== problem with this
               console.log(tempvar)
     };

     _onScrollBeginDrag = (e, state) => {
          console.log("_onScrollBeginDrag is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),1000)
          // this.setState({
          //      selectedIndex:state.index
          // });
     }

     _onMomentumScrollEnd =  (e, state) => {
          console.log("_onMomentumScrollEnd is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),100)
          setTimeout(()=>this.setState({refresh:true}),400);
     }

     _onTouchStartCapture = (e, state) => {
          console.log("_onTouchStartCapture is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),100)
          // this.setState({
          //      selectedIndex:state.index
          // });
     }

     _onScrollEnd = (e, state) => {
          console.log("_onScrollEnd:", state.index);
          // this.setState({
          //      selectedIndex:state.index
          // });
     };
    //  componentDidMount = () => {

    //  }

    //  componentWillMount = () => {
 
    //  };

     render() {
          return (
               <SwipeScreen 
                    {...this.props} 
                    {...this.state}
                    //refresh={this._refresh} 
                    onIndexChanged={this.onIndexChanged}
                    onScrollEnd={this._onScrollEnd}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onTouchStartCapture={this._onTouchStartCapture}
               />
          );
     }
}

export default Container;