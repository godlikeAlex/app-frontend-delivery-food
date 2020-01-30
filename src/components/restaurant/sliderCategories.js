import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const settings = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
};

const SliderCategories = ({categories, setLoadMoreData, currentCategory, setFilters, setCurrentCategory}) => {

  const handleClick = id => {
    if(id === 'all') {
      setCurrentCategory('all');
      setFilters({category: {}});
      return;
    }
    setLoadMoreData({skip: 0, size: 0})
    setCurrentCategory(id);
    setFilters({category: id});
  }
  
  return ( 
    <div className='categories-restaurant'>
        <Slider 
            {...settings}
        >
                <div className='slider-item'>
                    <Button active={currentCategory === 'all'} onClick={() => handleClick('all')} inverted color='orange'>Все</Button>
                </div>
            {categories && categories.map((category, i) => (
                <div className='slider-item' key={i}>
                    <Button active={currentCategory === category._id} onClick={() => handleClick(category._id)} inverted color='orange'>{category.name}</Button>
                </div>
            ))}
        </Slider>
    </div>
)};

const mapStateToProps = ({category, filters}) => {
  return {
    currentCategory: category.current,
    categories: category.categories,
    filters
  }
};

const mapDispatchToProps = dispatch => {
  const {setCurrentCategory, setFilters, setLoadMoreData} = bindActionCreators(actions, dispatch);

  return {
    setCurrentCategory: category => {
      setCurrentCategory(category);
    },
    setFilters: filters => {
      setFilters(filters);
    },
    setLoadMoreData: data => {
      setLoadMoreData(data);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderCategories);