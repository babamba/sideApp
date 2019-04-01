import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView,Dimensions, StyleSheet,TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ImageSliderEntry from './ImageSliderEntry';
import { scrollInterpolators, animatedStyles } from './animations';



const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

const {width, height} = Dimensions.get("window");

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

const colors = {
     black: '#1a1917',
     gray: '#888888',
     background1: '#fff7bc',
     background2: '#ffb987'
 };

class CarouselList extends Component {

    constructor (props) {
        super(props);
        console.log("this.props", this.props)
        this.state = {
            //slider1ActiveSlide: this.props.SLIDER_1_FIRST_ITEM
            slider1ActiveSlide: this.props.slider1ActiveSlide
        };
    }

//     mainExample (number, title) {
//         const { slider1ActiveSlide } = this.state;

//         return (
            
//         );
//     }

    

    render () {
        //const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        const { slider1ActiveSlide } = this.state;
        const { navigation } = this.props;

        return (
               <View>
                    <Carousel
                         ref={c => this.props._slider1Ref = c}
                         data={this.props.entries}
                         renderItem={this.props.renderItemWithParallax}
                         sliderWidth={sliderWidth}
                         itemWidth={itemWidth}
                         hasParallaxImages={true}
                         firstItem={this.props.slider1ActiveSlide}
                         inactiveSlideScale={0.9}
                         inactiveSlideOpacity={0.7}
                         layout={'default'} layoutCardOffset={18}

                         // inactiveSlideShift={20}
                         containerCustomStyle={styles.slider}
                         contentContainerCustomStyle={styles.sliderContentContainer}
                         loop={true}
                         loopClonesPerSide={2}
                         autoplay={false}
                         autoplayDelay={1000}
                         autoplayInterval={3000}
                         onSnapToItem={(index) => this.props.onSnapToItem(index) }
                    />
                    <Pagination
                         dotsLength={this.props.entries.length}
                         activeDotIndex={this.props.slider1ActiveSlide}
                         containerStyle={styles.paginationContainer}
                         dotColor={'rgba(255, 255, 255, 0.92)'}
                         dotStyle={styles.paginationDot}
                         inactiveDotColor={this.props.colors.black}
                         inactiveDotOpacity={0.4}
                         inactiveDotScale={0.6}
                         carouselRef={this.props._slider1Ref}
                         tappableDots={!!this.props._slider1Ref}
                    />
               </View>
        );
    }
}

export default CarouselList;


const styles = StyleSheet.create({
     
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
     },
     
     scrollview: {
         flex: 1,
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