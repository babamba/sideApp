import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView,Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';
import { ENTRIES1, ENTRIES2 } from './entries';
import { scrollInterpolators, animatedStyles } from './animations';

import { ifIphoneX } from 'react-native-iphone-x-helper'

const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

const SLIDER_1_FIRST_ITEM = 1;

const {width, height} = Dimensions.get("window");
const colors = {
     black: '#1a1917',
     gray: '#888888',
     background1: '#fff7bc',
     background2: '#ffb987'
 };
 
 function wp (percentage) {
     const value = (percentage * width) / 100;
     return Math.round(value);
 }
 
 const slideHeight = height * 0.36;
 const slideWidth = wp(75);
 const itemHorizontalMargin = wp(2);
 
const sliderWidth = width;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
 
const entryBorderRadius = 8;

class CarouselList extends Component {

    constructor (props) {
        super(props);
        console.log("this.props", this.props)
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem ({item, index}) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} even={true} />;
    }

//     mainExample (number, title) {
//         const { slider1ActiveSlide } = this.state;

//         return (
            
//         );
//     }

    get gradient () {
        return (
            <LinearGradient
              colors={[colors.background1, colors.background2]}
              startPoint={{ x: 1, y: 0 }}
              endPoint={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
        );
    }

    render () {
        //const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        const { slider1ActiveSlide } = this.state;
        const { navigation } = this.props;

        return (
          //   <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    { this.gradient }
                    <ScrollView
                      style={styles.scrollview}
                      scrollEventThrottle={200}
                      directionalLockEnabled={true}
                    >
                    <View style={styles.headerTitle}>
                         <Text style={styles.MainText1}>저축스크린 할거야</Text>
                         <TouchableOpacity onPressOut={ () => navigation.navigate("TakePhoto")}>
                              <Text >사진테스트</Text>
                         </TouchableOpacity>
                    </View>
                    <View style={styles.exampleContainer}>
                              {/* <Text style={styles.title}>{`Example ${number}`}</Text> */}
                              {/* <Text style={styles.subtitle}>{title}</Text> */}
                              <Carousel
                                   ref={c => this._slider1Ref = c}
                                   data={ENTRIES1}
                                   renderItem={this._renderItemWithParallax}
                                   sliderWidth={sliderWidth}
                                   itemWidth={itemWidth}
                                   hasParallaxImages={true}
                                   firstItem={SLIDER_1_FIRST_ITEM}
                                   inactiveSlideScale={0.9}
                                   inactiveSlideOpacity={0.7}
                                   // inactiveSlideShift={20}
                                   containerCustomStyle={styles.slider}
                                   contentContainerCustomStyle={styles.sliderContentContainer}
                                   loop={true}
                                   loopClonesPerSide={2}
                                   autoplay={true}
                                   autoplayDelay={500}
                                   autoplayInterval={3000}
                                   onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                              />
                              <Pagination
                                   dotsLength={ENTRIES1.length}
                                   activeDotIndex={slider1ActiveSlide}
                                   containerStyle={styles.paginationContainer}
                                   dotColor={'rgba(255, 255, 255, 0.92)'}
                                   dotStyle={styles.paginationDot}
                                   inactiveDotColor={colors.black}
                                   inactiveDotOpacity={0.4}
                                   inactiveDotScale={0.6}
                                   carouselRef={this._slider1Ref}
                                   tappableDots={!!this._slider1Ref}
                              />
                         </View>
                    </ScrollView>
                </View>
          //   </SafeAreaView>
        );
    }
}

export default CarouselList;


const styles = StyleSheet.create({
     headerTitle:{
          flex:1,
          justifyContent:'center',
          alignItems:"center",
          alignContent: 'center',
          flexDirection: "column",
     },
     MainText1:{
          fontSize:45,
          justifyContent: 'center',
          textAlign:'left',
          alignItems: 'center',
          fontFamily: 'NanumBarunGothicUltraLight',
     },
     safeArea: {
         flex: 1,
         backgroundColor: colors.black
     },
     container: {
         flex: 1,
         backgroundColor: colors.background1,
         ...ifIphoneX({paddingTop: 70}, {paddingTop: 50}),
     },
     gradient: {
         ...StyleSheet.absoluteFillObject
     },
     scrollview: {
         flex: 1,
     },
     exampleContainer: {
         paddingVertical: 10
     },
     exampleContainerDark: {
         backgroundColor: colors.black
     },
     exampleContainerLight: {
         backgroundColor: 'white'
     },
     title: {
         paddingHorizontal: 30,
         backgroundColor: 'transparent',
         color: 'rgba(255, 255, 255, 0.9)',
         fontSize: 20,
         fontWeight: 'bold',
         textAlign: 'center'
     },
     titleDark: {
         color: colors.black
     },
     subtitle: {
         marginTop: 5,
         paddingHorizontal: 30,
         backgroundColor: 'transparent',
         color: 'rgba(255, 255, 255, 0.75)',
         fontSize: 13,
         fontStyle: 'italic',
         textAlign: 'center'
     },
     slider: {
         marginTop: 15,
         overflow: 'visible' // for custom animations
     },
     sliderContentContainer: {
         paddingVertical: 10, // for custom animation
     },
     paginationContainer: {
         paddingVertical: 8
     },
     paginationDot: {
         width: 8,
         height: 8,
         borderRadius: 4,
         marginHorizontal: 8
     },
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
          shadowOpacity: 0.25,
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