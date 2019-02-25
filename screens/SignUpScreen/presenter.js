import React from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Constants } from "expo";
import { RkCard, RkAvoidKeyboard } from "react-native-ui-kitten";
import { FontAwesome } from "react-native-vector-icons";
import { scale, scaleVertical } from "../../utilities/scale";
import GradientButton from "react-native-gradient-buttons";

import Proptypes from "prop-types";
import { withNavigation } from "react-navigation";

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: scaleVertical(28),
    paddingHorizontal: scale(16),
    flex: 1,
    backgroundColor: "rgb(245, 245, 245)"
  },
  back: {
    position: "absolute",
    top: Constants.statusBarHeight + 8,
    left: 16,
    zIndex: 1
  },
  header: {
    marginTop: scaleVertical(36),
    alignItems: "center",
    justifyContent: "center"
  },
  all: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  image: {
    height: scaleVertical(70),
    resizeMode: "contain"
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
    fontWeight: "bold"
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: scaleVertical(28),
    marginBottom: scaleVertical(8),
    paddingHorizontal: 8
  }
});

const SignUpScreen = props => 
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}
      >
        <View style={styles.header}>
          <FontAwesome
            name="edit"
            size={scale(50)}
            style={{ color: "#4A4A4A" }}
          />
          <Text
            style={{ fontSize: scale(28), fontWeight: "800", color: "#4A4A4A" }}
          >
            Registration
          </Text>
        </View>

        <View style={styles.all}>
          <RkCard rkType="heroImage shadowed" style={styles.content}>
            <TextInput
              textContentType="name"
              placeholder="NAME"
              placeholderTextColor="#707070"
              style={styles.input}
              onChangeText={props.changeUsername}
              value={props.username}
              autoCapitalize={"none"}
              autoCorrect={false}
            />
            <TextInput
              textContentType="emailAddress"
              placeholder="EMAIL"
              placeholderTextColor="#707070"
              style={styles.input} 
              onChangeText={props.changeEmail}
              value={props.email}
              autoCapitalize={"none"}
              autoCorrect={false}
            />
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              placeholder="PASSWORD"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={props.changePassword}
              value={props.password}
            />
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              placeholder="CONFIRM PASSWORD"
              placeholderTextColor="#707070"
              style={styles.input}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={props.changeConfirmPassword}
              value={props.confirmPassword}
            />
            <GradientButton
              style={{ marginTop: 8 }}
              textStyle={{ fontSize: 20 }}
              text="SIGN UP"
              height={50}
              violetPink
              onPressAction={() => props.submit()}
            />
          </RkCard>
        </View>

        <View>
          <View style={styles.textRow}>
            <Text style={{ color: "#484848", fontSize: 18, marginTop: 8 }}>
              Already have an account?
            </Text>
            <Button
              title="Sign in now."
              onPress={() => props.navigation.navigate("LogIn")}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.back}
          onPress={() => props.navigation.goBack()}
        >
          <FontAwesome
            name="chevron-left"
            size={27}
            style={{ color: "#4A4A4A" }}
          />
        </TouchableOpacity>
      </RkAvoidKeyboard>
   
SignUpScreen.Proptypes = {
     isSubmiting: Proptypes.bool.isRequired,
     username:Proptypes.string.isRequired,
     password:Proptypes.string.isRequired,
     email:Proptypes.string.isRequired,
     confirmPassword:Proptypes.string.isRequired,
     changeUsername : Proptypes.func.isRequired,
     changePassword : Proptypes.func.isRequired,
     changeConfirmPassword:Proptypes.func.isRequired,
     changeEmail:Proptypes.func.isRequired,
     submit : Proptypes.func.isRequired,
}


export default withNavigation(SignUpScreen);
