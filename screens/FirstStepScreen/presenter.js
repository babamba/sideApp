import React from "react";
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Dimensions,
  Platform
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { Constants } from "expo";
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { scale, scaleVertical } from "../../utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import Proptypes from "prop-types";
import { withNavigation } from "react-navigation";
import Modal from "react-native-modal";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import { Picker, DatePicker } from 'react-native-wheel-pick';

const ios_blue = "#007AFF";
const isIos = Platform.OS === 'ios'
const { width, height } = Dimensions.get("window");
const pickerData=['1','2','3','4','5','6','7','8','9','10',
                  '11','12','13','14','15','16','17','18','19','20',
                  '21','22','23','24','25','26','27','28','29','30','31']

const hoursData= ['0','1','2','3','4','5','6','7','8','9','10',
                  '11','12','13','14','15','16','17','18','19','20',
                  '21','22','23','24']

const renderIcon = () => (
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")} // eslint-disable-line global-require
      />
    );

const FirstStepScreen = props => 
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
        {/* <View style={styles.header}>{renderIcon()}</View> */}
        { props.backBtn ? (
            <TouchableOpacity
            style={styles.back}
            onPress={props.setModalVisibleForm}
          >
            <FontAwesome
              name="chevron-down"
              size={27}
              style={{ color: "#4A4A4A" , marginTop:20}}
            />
          </TouchableOpacity>
          ) :( null )
          }
        <View style={styles.all}>
         
          <RkCard rkType="heroImage shadowed" style={styles.content}>
        {/* <View style={styles.container}>
          <DataModal
            isVisible={props.isModalVisible}
            style={styles.bottomModal}>
             <View style={styles.modalContent}>
              <Text>Hello!</Text>
              <TouchableOpacity onPress={props.toggleModal}>
              <View style={styles.button}>
                <Text>asdfasdf</Text>
              </View>
            </TouchableOpacity>
            </View>
          </DataModal>
        </View> */}

          <TouchableOpacity onPress={props.toggleModal}>
            <TextInput
              textContentType="name"
              placeholder="월급받는 날짜를 입력하세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              value={props.salaryDay}
              onChangeText={props.changeSalaryDay}
              pointerEvents="none"
            />
            </TouchableOpacity>

            <Modal
              isVisible={props.isModalVisible}
              onBackdropPress={props.toggleModal}
              style={styles.bottomModal}>
              
              <View style={styles.modalContent}>
                <Text>월급 날짜를 선택해주세요!</Text>
                <Picker
                  style={{ backgroundColor: 'white', width: width, height: 200 }}
                  selectedValue='15'
                  pickerData={pickerData}
                  onValueChange={props.changeSalaryDay}
                  itemSpace={30} // this only support in android
                />
                {/* <TouchableOpacity onPress={props.toggleModal}>
                  <View style={styles.button}>
                    <Text>날짜선택</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </Modal>

            <SelectMultipleGroupButton
               containerViewStyle={{
                    borderWidth: 0.3,
                    borderColor: "#D3D3D3",
                    borderRadius: 6,
                    paddingTop: 18,
                    paddingBottom: 18,
                    fontFamily: 'NanumBarunGothicUltraLight',
                    justifyContent: "center"
               }}
               defaultSelectedIndexes={props.defaultSelectedIndex_group_insterest}
               highLightStyle={{
                    borderColor: "gray",
                    backgroundColor: "transparent",
                    textColor: "gray",
                    borderTintColor: ios_blue,
                    backgroundTintColor: "transparent",
                    textTintColor: ios_blue
               }}
               onSelectedValuesChange={props.onSelectedValuesChange}
               group={props.multipleGroupData}
          />

        <TouchableOpacity onPress={props.toggleModalstart}>
          <TextInput
              textContentType="name"
              placeholder="근무 시작시간을 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.startHour}
              onChangeText={props.changeWorkStart}
              pointerEvents="none"
            />
          </TouchableOpacity>

          <Modal
              isVisible={props.isStartModalVisible}
              style={styles.bottomModal}
              onBackdropPress={props.toggleModalstart}
          >
              <View style={styles.modalContent}>
                <Text>근무 시작 시간를 선택해주세요!</Text>
                <View style={{flexDirection:'row'}}>
                {/* <Picker
                  style={{ backgroundColor: 'white', width: width / 2, height: 200 }}
                  selectedValue='AM'
                  pickerData={['AM','PM']}
                  onValueChange={props.changeWorkStartAMPM}
                  itemSpace={30} // this only support in android
                /> */}
                <Picker
                  style={{ backgroundColor: 'white', width: width, height: 200 }}
                  selectedValue='6'
                  pickerData={hoursData}
                  onValueChange={props.changeWorkStart}
                  itemSpace={30} // this only support in android
                />
                </View>
                {/* <TouchableOpacity onPress={props.toggleModalstart}>
                  <View style={styles.button}>
                    <Text>시작일자 선택</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
          </Modal>
        

        <TouchableOpacity onPress={props.toggleModalend}>
          <TextInput
              textContentType="name"
              placeholder="근무 종료시간을 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.endHour}
              onChangeText={props.changeWorkEnd}
              pointerEvents="none"
            />
        </TouchableOpacity>

        <Modal
              isVisible={props.isEndModalVisible}
              style={styles.bottomModal}
              onBackdropPress={props.toggleModalend}
            >
              <View style={styles.modalContent}>
                <Text>근무 종료시간을 선택해주세요!</Text>
                <View style={{flexDirection:'row'}}>
                {/* <Picker
                  style={{ backgroundColor: 'white', width: width / 2, height: 200 }}
                  selectedValue='AM'
                  pickerData={['AM','PM']}
                  onValueChange={props.changeWorkStartAMPM}
                  itemSpace={30} // this only support in android
                /> */}
                <Picker
                  style={{ backgroundColor: 'white', width: width , height: 200 }}
                  selectedValue='18'
                  pickerData={hoursData}
                  onValueChange={props.changeWorkEnd}
                  itemSpace={30} // this only support in android
                />
                </View>
                {/* <TouchableOpacity onPress={props.toggleModalend}>
                  <View style={styles.button}>
                    <Text>종료시간 선택</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </Modal>

            <TextInput
              textContentType="name"
              placeholder="월급을 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.monthSallery}
              onChangeText={props.changeSalary}
              keyboardType={"number-pad"}
            />

          {/* {props.isSubmiting ? ( 
               <GradientButton
                    style={{ marginTop: 8 ,shadowColor: 'gray',
                         shadowOffset: { width: 0, height: 0 },
                         shadowOpacity: 0.5,
                         shadowRadius: 7,}}
                    textStyle={{ fontSize: 20 }}
                    text="등록 중..."
                    height={50}
                    blueViolet
               >
               </GradientButton>  
                    
               ) : (  */}
                    <GradientButton
                         style={{ marginTop: 8 ,shadowColor: 'gray',
                         shadowOffset: { width: 0, height: 0 },
                         shadowOpacity: 0.5,
                         shadowRadius: 7,}}
                         textStyle={{ fontSize: 20 }}
                         text="등록하기"
                         height={50}
                         blueViolet
                         onPressAction={() => props.submit()}
                    />  
          {/* )} */}
          </RkCard>
        </View>
      </RkAvoidKeyboard>

FirstStepScreen.Proptypes = {
     isSubmiting: Proptypes.bool.isRequired,
     username:Proptypes.string.isRequired,
     password:Proptypes.string.isRequired,
     changeUsername : Proptypes.func.isRequired,
     changePassword : Proptypes.func.isRequired,
     submit : Proptypes.func.isRequired,
     monthSallery : Proptypes.number.isRequired,
     salaryDay : Proptypes.string.isRequired,
     startHour : Proptypes.number.isRequired,
     endHour : Proptypes.number.isRequired,
}

const styles = StyleSheet.create({
     screen: {
       paddingTop: Constants.statusBarHeight,
       paddingBottom: scaleVertical(24),
       paddingHorizontal: scale(16),
       flex: 1,
       backgroundColor: "rgb(245, 245, 245)"
     },
     close: {
       position: "absolute",
       top: Constants.statusBarHeight + 4,
       left: 16,
       zIndex: 1
     },
     header: {
       marginTop: 75,
       alignItems: "center",
       justifyContent: "center"
     },
     image: {
       height: scaleVertical(100),
       resizeMode: "contain"
     },
     all: {
       marginTop: scaleVertical(24),
       flex: 1,
       justifyContent: "center"
     },
     content: {
       justifyContent: "space-between",
       paddingHorizontal: 8,
       paddingVertical: scaleVertical(12)
     },
     input: {
       borderWidth: 0.5,
       borderColor: "#D3D3D3",
       borderRadius: 50,
       padding: 18,
       marginVertical: scaleVertical(6),
       fontWeight: "bold",
       fontFamily: 'NanumBarunGothicUltraLight',
     },
     container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: "lightblue",
      padding: 12,
      margin: 16,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    bottomModal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    scrollableModal: {
      height: 300,
    },
    scrollableModalContent1: {
      height: 200,
      backgroundColor: "orange",
      alignItems: "center",
      justifyContent: "center",
    },
    scrollableModalContent2: {
      height: 200,
      backgroundColor: "lightgreen",
      alignItems: "center",
      justifyContent: "center",
    },
    back: {
      position: "absolute",
      alignItems:'flex-end',
      top: Constants.statusBarHeight + 8,
      left: width - 40,
      zIndex: 1
    },
   });

export default withNavigation(FirstStepScreen);
