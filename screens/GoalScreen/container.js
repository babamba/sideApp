import React, {Component} from "react";
import PropTypes from "prop-types";
import GoalScreen from "./presenter";
import moment from "moment";
import { ImagePicker } from 'expo';

//임시
const data = [
     {
          title: '아이패드프로',
          subtitle: '살거야 으아아아아니',
          illustration: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/pro/ipad-pro-12-11-select-201810_GEO_KR?wid=870&amp;hei=1100&amp;fmt=jpeg&amp;qlt=95&amp;op_usm=0.5,0.5&amp;.v=1540576022267'
      },
      {
          title: '아이맥',
          subtitle: '아이맥있으면 좋을것 같은데말이야',
          illustration: 'https://cdn.clien.net/web/api/file/F01/7642247/afd0e9da5919e.jpg?w=780&h=30000'
      },
      {
          title: '팰리세이드',
          subtitle: '차도 하나 사고싶어 절약절약',
          illustration: 'http://www.autodaily.co.kr/news/photo/201812/406447_33632_195.jpg'
      },
]

class Container extends Component {
     // 라우트에서 하는법 컨테이너에서 하는법 둘다 있음 현재는 라우터에서 처리하는걸로 수정
     // static navigationOptions  = ({ navigation }) => ({
     // })
     static propTypes = {
          // feed : PropTypes.array,
          // getFeed : PropTypes.func.isRequired
     };

     state = {
          isFetching : false,
          pickedPhoto: null
     };

     componentWillReceiveProps = nextProps => {
          //console.log("nextProps.TodayMealProduct : ", nextProps.TodayMealProduct)
          // if(nextProps.TodayMealProduct){
          //      console.log("nextProps.currentPrice : " , nextProps.currentPrice)
          //      this.setState({
          //           TodayMealProduct : nextProps.TodayMealProduct
          //      })
          // }
     }

     componentWillMount = async () => {
          //const { getDataMealToday, TodayMealProduct } = this.props;
          //const Today = moment(new Date());
          
          //const TodayMeal = await getDataMealToday(Today.format("YYYYMMDD"));

          //console.log("TodayMeal : ", TodayMeal);
          //console.log("TodayMealProduct : ",  TodayMealProduct);

          // if(TodayMeal){
          //      let currentPrice = 0;
          //      for (let i of TodayMealProduct) {
          //           //console.log("index : " , i);
          //           let price = Number(i.data.price);

          //           currentPrice += price;
          //      }
          //      //console.log("currentPrice", currentPrice);

          //      this.setState({
          //           currentPrice
          //      })
          // }
          //console.log("await : ", await getDataMealToday(Today.format("YYYYMMDD")))
     }

     componentDidMount = () => {
          // const { initApp } = this.props;
          // initApp();
          // const { onChangeScrollControl } = this.props;
          // onChangeScrollControl(true);
          // this._refresh();
     };

     _pickImage = async () => {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:"Images",
            allowsEditing: true,
            aspect: [4, 3],
            quality:0,
            exif:true
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            await this.setState({ pickedPhoto: result.uri });
            this._approvePhoto();
          }
     };

     _openCamera = async() => {
          let result = await ImagePicker.launchCameraAsync({
               mediaTypes:"Images",
               allowsEditing: true,
               aspect: [4, 3],
               quality:0,
               exif:true
          });

          if (!result.cancelled) {
               await this.setState({ pickedPhoto: result.uri });
               this._approvePhoto();
          }
     }

     _approvePhoto = () =>{
          const { navigation: {navigate} } = this.props;
          const { pickedPhoto } = this.state;
          console.log(pickedPhoto);
          navigate("UploadPhoto", { uri : pickedPhoto });
     }

     componentWillUnmount = () =>{
          console.log("Meal Unmount")
     }

     render() {
          return (
               <GoalScreen 
                    {...this.props} 
                    {...this.state} 
                    refresh={this._refresh} 
                    data={data}
                    pickImage={this._pickImage}
                    openCamera= {this._openCamera}
               />
          );
     }

     _refresh = () => {
          //const { getNotifications } = this.props;
         
          //const { getDataMealToday , getDataMealMonth } = this.props;
          //getDataMealToday(moment().format("YYYYMMDD"));
          //getDataMealMonth(moment().format("YYYYMMDD"));

           this.setState({
               isFetching : true
          });

          console.log("isFetch refresh")
     }

}
export default Container;