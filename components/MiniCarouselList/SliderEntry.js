import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';

import { StyleSheet, Dimensions, Platform } from 'react-native';

const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};
const IS_IOS = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * width) / 100;
    return Math.round(value);
}

const entryBorderRadius = 8;

const slideHeight = height * 0.30;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = width;
export const itemWidth = slideWidth + itemHorizontalMargin * 1.3;

class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            // <Image
            //   source={{ uri: illustration }}
            //   style={styles.image}
            // />
            null
        );
    }

    render () {
        const { data: { title, subtitle, backgroundColor, date } } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;

        return (
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.slideInnerContainer]}
            //   onPress={() => { alert(`You've clicked '${title}'`); }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, {backgroundColor:backgroundColor }]}>
                    {/* { this.image } */}
                    <View style={[styles.radiusMask]} />
                </View>
                    
                <View style={[styles.textContainer]}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        { uppercaseTitle }
                        <Text style={[styles.subDate]}>
                            { date }
                        </Text>
                    </View>
                    <Text style={[styles.subtitle]} numberOfLines={2}>
                    { subtitle } 
                    </Text>
                    
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
     slideInnerContainer: {
          width: itemWidth,
          height: slideHeight,
          paddingHorizontal: itemHorizontalMargin,
          paddingBottom: 18 // needed for shadow
      },
      shadow: {
          position: 'absolute',
          top: 0,
          left: itemHorizontalMargin,
          right: itemHorizontalMargin,
          bottom: 18,
          shadowColor: colors.black,
          shadowOpacity: 0.55,
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          borderRadius: entryBorderRadius
      },
      imageContainer: {
          flex: 1,
          marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
          backgroundColor: 'white',
          borderTopLeftRadius: entryBorderRadius,
          borderTopRightRadius: entryBorderRadius
      },
      imageContainerEven: {
          backgroundColor: colors.black
      },
      image: {
          ...StyleSheet.absoluteFillObject,
          resizeMode: 'cover',
          borderRadius: IS_IOS ? entryBorderRadius : 0,
          borderTopLeftRadius: entryBorderRadius,
          borderTopRightRadius: entryBorderRadius
      },
      // image's border radius is buggy on iOS; let's hack it!
      radiusMask: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: entryBorderRadius,
          backgroundColor: 'white'
      },
      radiusMaskEven: {
          backgroundColor: colors.black
      },
      textContainer: {
          justifyContent: 'center',
          paddingTop: 20 - entryBorderRadius,
          paddingBottom: 20,
          paddingHorizontal: 16,
          backgroundColor: 'white',
          borderBottomLeftRadius: entryBorderRadius,
          borderBottomRightRadius: entryBorderRadius
      },
      textContainerEven: {
          backgroundColor: colors.black
      },
      title: {
          color: colors.black,
          fontSize: 13,
          fontWeight: 'bold',
          letterSpacing: 0.5
      },

      subDate:{
        color: colors.black,
        fontSize: 13,
        letterSpacing: 0.5,
        fontWeight: 'bold',

    },
      titleEven: {
          color: 'white'
      },
      subtitle: {
            marginTop: 6,
            color: colors.gray,
            fontSize: 12,
            fontStyle: 'italic'
      },
      subtitleEven: {
          color: 'rgba(255, 255, 255, 0.7)'
      }
})

export default SliderEntry