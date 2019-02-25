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
  Dimensions
} from "react-native";
import { Constants } from "expo";
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { FontAwesome } from "react-native-vector-icons";
import { scale, scaleVertical } from "../../utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import Proptypes from "prop-types";
import { withNavigation } from "react-navigation";
import {
     SelectMultipleButton,
     SelectMultipleGroupButton
   } from "react-native-selectmultiple-button";
   const ios_blue = "#007AFF";
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

        <View style={styles.all}>
          <RkCard rkType="heroImage shadowed" style={styles.content}>
            <TextInput
              textContentType="name"
              placeholder="연봉을 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.salary}
               onChangeText={props.changeSalary}
            />
          
            <TextInput
              textContentType="name"
              secureTextEntry={true}
              placeholder="월급받는 날짜를 입력하세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
               secureTextEntry={true}
              value={props.salaryDay}
              onChangeText={props.changeSalaryDay}
            />

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

          <TextInput
              textContentType="name"
              placeholder="근무 시작시간을 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.startHour}
               onChangeText={props.changeSalaryWeek}
            />

          <TextInput
              textContentType="name"
              placeholder="근무 종료시간을 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.endHour}
               onChangeText={props.changeSalaryWeek}
            />

          {props.isSubmiting ? ( 
               <GradientButton
                    style={{ marginTop: 8 ,shadowColor: 'gray',
                         shadowOffset: { width: 0, height: 0 },
                         shadowOpacity: 0.5,
                         shadowRadius: 7,}}
                    textStyle={{ fontSize: 20 }}
                    text="등록 중..."
                    height={50}
                    blueViolet
                    onPressAction={() => props.submit()}
               >
               </GradientButton>  
                    
               ) : ( 
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
          )}
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
     salary : Proptypes.number.isRequired,
     salaryWeek : Proptypes.string.isRequired,
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
   });

export default withNavigation(FirstStepScreen);
