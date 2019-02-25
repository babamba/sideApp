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
  View
} from "react-native";
import { Constants } from "expo";
import { RkAvoidKeyboard, RkCard } from "react-native-ui-kitten";
import { FontAwesome } from "react-native-vector-icons";
import { scale, scaleVertical } from "../../utilities/scale";
import GradientButton from "react-native-gradient-buttons";
import Proptypes from "prop-types";
import { withNavigation } from "react-navigation";
import { TextField } from 'react-native-material-textfield';

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
  OR: {
    marginVertical: scaleVertical(12),
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A4A4A"
  },
  socialLogin: {
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  footer: {
    justifyContent: "space-between",
    marginTop: scaleVertical(28),
    paddingHorizontal: 8,
    paddingVertical: scaleVertical()
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

const renderIcon = () => (
      <Image
        style={styles.image}
        source={require("../../assets/images/logo.png")} // eslint-disable-line global-require
      />
    );

const SignInScreen = props => 
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
        <View style={styles.header}>{renderIcon()}</View>

        <View style={styles.all}>
          <RkCard rkType="heroImage shadowed" style={styles.content}>
            <TextInput
              textContentType="username"
              placeholder="아이디를 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.username}
               onChangeText={props.changeUsername}
            />
            {/* <TextField
              label="username"
          //     placeholder="아이디를 입력해주세요"
          //     placeholderTextColor="#707070"
              style={styles.input}
              tintColor={"rgba(201, 146, 230, .7)"}
              inputContainerStyle={{borderWidth: 0.5,
               borderColor: "#D3D3D3",
               borderRadius: 50,
               padding: 18,
               marginVertical: scaleVertical(6),}}
              labelPadding={18}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={props.username}
               onChangeText={props.changeUsername}
            />  */}
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              placeholder="비밀번호를 입력해주세요"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
               secureTextEntry={true}
              value={props.password}
              onChangeText={props.changePassword}
            />

          {props.isSubmiting ? ( 
               <GradientButton
                    style={{ marginTop: 8 ,shadowColor: 'gray',
                         shadowOffset: { width: 0, height: 0 },
                         shadowOpacity: 0.5,
                         shadowRadius: 7,}}
                    textStyle={{ fontSize: 20 }}
                    text="로그인 중..."
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
                         text="로그인"
                         height={50}
                         blueViolet
                         onPressAction={() => props.submit()}
                    />  
          )}

           
     
          </RkCard>
          {/* <View style={{ alignItems: "center" }}>
            <Text style={styles.OR}>– OR –</Text>
          </View>
          <View style={{ paddingHorizontal: 8 }}>
            <GradientButton
              style={{ marginTop: 8 }}
              textStyle={{ fontSize: 20 }}
              text="SOCIAL LOGIN"
              height={50}
              blueMarine
              onPressAction={() => console.log(props)}
            />
          </View> */}
        </View>

        <View style={styles.footer}>
          {/* <View style={styles.textRow}>
            <Text style={{ color: "#484848", fontSize: 18, marginTop: 8 }}>
              Forgot your password?
            </Text>
            <Button
              title="Reset Password."
              onPress={() => props.navigation.navigate("ForgotPasswordScreen")}
            />
          </View> */}
          <View style={styles.textRow}>
            <Text style={{ color: "#484848", fontSize: 18, marginTop: 8 }}>
              계정이 없으신가요?
            </Text>
            <Button
              title="가입하기"
              onPress={() => props.navigation.navigate("SignUpScreen")}
            />
          </View>
        </View>

        {/* <TouchableOpacity style={styles.close}>
          <FontAwesome name="times" size={36} style={{ color: "#4A4A4A" }} />
        </TouchableOpacity> */}
      </RkAvoidKeyboard>

SignInScreen.Proptypes = {
     isSubmiting: Proptypes.bool.isRequired,
     username:Proptypes.string.isRequired,
     password:Proptypes.string.isRequired,
     changeUsername : Proptypes.func.isRequired,
     changePassword : Proptypes.func.isRequired,
     submit : Proptypes.func.isRequired,
}

export default withNavigation(SignInScreen);
