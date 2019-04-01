import React, {Component} from "react";
import PropTypes from "prop-types";
import MiniCarouselList from "./presenter";

import ImageSliderEntry from "./ImageSliderEntry";
import SliderEntry from "./SliderEntry"

const SLIDER_1_FIRST_ITEM = 0;

class Container extends Component {
     constructor (props) {
          super(props);
          this.state = {
              slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
              slider1Ref: null
          };
     }

     _onSnapToItem = (index) => {
       console.log("snap index : ", index)
        this.setState({ 
            slider1ActiveSlide: index 
        })
     }

     _renderItem ({item, index}) {
          return <ImageSliderEntry data={item} even={(index + 1) % 2 === 0} />;
     }

     _renderItemWithParallax = ({item, index}, parallaxProps) => {
        console.log('list type :' , this.props.carouselType)

        if( this.props.carouselType === 'image'){
              return (
                <ImageSliderEntry
                  data={item}
                  even={(index + 1) % 2 === 0}
                  parallax={true}
                  parallaxProps={parallaxProps}
                />
            );
        }else if( this.props.carouselType === 'default'){
            return (
              <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={false}
              />
            );
      }else{
        return (
          <SliderEntry
            data={item}
            even={(index + 1) % 2 === 0}
            parallax={false}
          />
        );
      }
    }

     _renderLightItem ({item, index}) {
          return <ImageSliderEntry data={item} even={false} />;
      }
  
      _renderDarkItem ({item, index}) {
          return <ImageSliderEntry data={item} even={true} />;
      }

     componentWillReceiveProps = nextProps => {
          console.log(nextProps)
     }
     componentDidMount () {
          console.log("Carousel : ", this.props);
     }


     render () {
          //const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
          // const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
          // const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
          // const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
          // const example5 = this.customExample(5, 'Custom animation 1', 1, this._renderItem);
          // const example6 = this.customExample(6, 'Custom animation 2', 2, this._renderLightItem);
          // const example7 = this.customExample(7, 'Custom animation 3', 3, this._renderDarkItem);
          // const example8 = this.customExample(8, 'Custom animation 4', 4, this._renderLightItem);
  
          return (
            <MiniCarouselList 
              {...this.state } 
              {...this.props } 
              onSnapToItem = { this._onSnapToItem}
              renderItem= {this._renderItem}
              renderItemWithParallax={this._renderItemWithParallax}
              entries={this.props.data}
            />
          );
      }
}
export default Container;