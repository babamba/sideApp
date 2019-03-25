import React, {Component} from "react";
import PropTypes from "prop-types";
import SwipeScreen from "./presenter";
import { image } from "react-native";

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })

     // 계산에 사용될 Date객체 
     
     constructor(props){
          super(props);
          
          //console.log(this.props); // prints out whatever is inside props
          //const { monthSallery, workingWeekDay , workingHour, startHour, endHour  ,isPlaying} = this.props

          // 근무시작 근무종료 객체들
          //const TODAY_START_DATE = new Date(getYear, getMonth, getDate, startHour);
          //const TODAY_END_DATE = new Date(getYear, getMonth, getDate, endHour);
          //console.log("start and end : ", TODAY_START_DATE.toLocaleString(), "  / " ,  TODAY_END_DATE.toLocaleString())

          //console.log(weekSallery , "  " ,hourSallery , "  " ,minuteSallery , "  " ,secondSallery , "  " );

          //항상 초기화해야할것들
          this.state = {
               isFetching : false,
               //isPlaying,
               selectedIndex:0,
               renderArray: [true, false, false, false, false],
               scrollControl : false,
          };
     }

     _onChangeScrollControl = (scrollControl) => {
          console.log("selectedIndex : " , this.state.selectedIndex)
          console.log("renderArray : ", this.state.renderArray[0])
          const { selectedIndex , renderArray } = this.state;

          if(selectedIndex === 0 && renderArray[0] === true){
               console.log("1111")
               this.setState({scrollControl:true});
          }else if(selectedIndex === 3 && renderArray[3] === true)  {
               console.log("2222")
               this.setState({scrollControl:true});
          }else{
               console.log("_@_@_@_@_@_@_@ _onChangeScrollControl param :" , scrollControl)
               setTimeout(()=>this.setState({scrollControl: scrollControl}),1000)
          }

          
          // this.setState({
          //      scrollControl: scrollControl
          // })
     }

     componentWillMount() {
          //setTimeout(()=>this.setState({scrollControl: true}),1000)
     }

     static navigationOptions = {
          gesturesEnabled: false,
     }  

     componentWillReceiveProps = nextProps => {
          const currentProps = this.props;
          //console.log("!@# next ",nextProps)
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
          
          this.setState({ renderArray: tempvar, selectedIndex: index}); //<<======== problem with this

          if(this.state.renderArray[0] === true && index === 0){
               this.setState({
                    isFetching:false,
                    scrollControl: true,
                    renderArray: tempvar, selectedIndex: index
               })
          }else if(this.state.renderArray[3] === true && index === 3){
               this.setState({
                    isFetching:false,
                    scrollControl: true,
                    renderArray: tempvar, selectedIndex: index
               })
          }else{
               this.setState({
                    isFetching:false,
                    scrollControl: false,
                    renderArray: tempvar, selectedIndex: index
               })
          }

          console.log(tempvar)
     };

     _onScrollBeginDrag = (e, state) => {
          //console.log("_onScrollBeginDrag is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),1000)
          // this.setState({
          //      selectedIndex:state.index
          // });
     }
     _onMomentumScrollBegin = (e, state) => {
          //console.log("@_@_@_@__@@_@_@ _onMomentumScroll Begin is:", state.index);
     }

     _onMomentumScrollEnd =  (e, state) => {
          //console.log("@_@_@_@__@@_@_@ _onMomentumScroll End is::", state.index);

     }

     _onTouchStartCapture = (e, state) => {
          //console.log("_onTouchStartCapture is:", state.index);
          //setTimeout(()=>this.setState({selectedIndex:state.index}),100)
          // this.setState({
          //      selectedIndex:state.index
          // });
     }
     _onResponderRelease = (e, state, context) => {
          //console.log("_onResponderRelease is:", state.index);
     }

     render() {
          return (
               <SwipeScreen 
                    {...this.props} 
                    {...this.state}
                    //refresh={this._refresh} 
                    onIndexChanged={this.onIndexChanged}
                    onScrollBeginDrag={this._onScrollBeginDrag}
                    onMomentumScrollEnd={this._onMomentumScrollEnd}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    onTouchStartCapture={this._onTouchStartCapture}
                    onChangeScrollControl={this._onChangeScrollControl}
                    onResponderRelease={this._onResponderRelease}
               />
          );
     }
}

export default Container;