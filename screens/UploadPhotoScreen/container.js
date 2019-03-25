import React, { Component } from "react";
import UploadPhotoScreen from "./presenter";
import {Alert} from "react-native";

class Container extends Component {
     state = {
          caption: "",
          location: "",
          tags: "",
          isSubmitting: false
     };


     render(){
          console.log(this.props);
          const { navigation : { state : {params : { uri }}}} = this.props;
          return (
               <UploadPhotoScreen
               onCaptionChange={this._onCaptionChange}
               onLocationChange={this._onLocationChange}
               onTagsChange={this._onTagsChange}
               submit={this._submit}
               imageURL={uri}
               {...this.state}
             />
          )
     }

     _onCaptionChange = text => {
          this.setState({
            caption: text
          });
     };
     _onLocationChange = text => {
          this.setState({
            location: text
          });
     };
     _onTagsChange = text => {
          this.setState({
            tags: text
          });
     };
     _submit = async () => {
          const { caption, location, tags } = this.state;
          const { submit, navigation , navigation : { state : {params : { uri }}} } = this.props;
          if (caption && location && tags) {
            this.setState({
              isSubmitting: true
            });
            const uploadResult = await submit(uri , caption, location, tags);
            if(uploadResult){
               navigation.goBack(null);
               navigation.goBack(null);
               navigation.goBack(null);
            }
          } else {
            Alert.alert("All fields are required");
          }
     };

}

export default Container;