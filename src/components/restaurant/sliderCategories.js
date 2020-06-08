import React, {useState} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Loader } from 'semantic-ui-react';
import PrevImg from './prev.svg';
import NextImg from './next.svg';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const Categories = ({categories, setFilters, setLoadMoreData}) => {
  const [currentCategory, setCurrentCategory] = useState('all');

  const handleClick = id => {
    if(id === 'all') {
      setCurrentCategory('all');
      setFilters({category: {}});
      return;
    }
    setCurrentCategory(id);
    setFilters({category: id});
  }

  console.log(currentCategory)

  return (
    <>
    <div onClick={() => handleClick('all')} key={'all-cat'}>
        <div className={currentCategory === 'all' ? 'slider-item slider-item-active' : 'slider-item'} >
            Все рестораны
        </div>
    </div>
    {categories && categories.map((category, i) => (
      <div onClick={() => handleClick(category._id)} key={i}>
        <div className={currentCategory === category._id ? 'slider-item slider-item-active' : 'slider-item'} active={currentCategory === category._id }  >
            {category.name}
        </div>
      </div>
    ))}
    </>
  )
}

const SliderCategories = ({categories, setFilters, setLoadMoreData}) => {
  return ( 
    <div className='categories-restaurant'>
            <OwlCarousel
                className="owl-theme"
                items={5}
                margin={15}
                dots={false}
                nav
                navText={[`<img src=${PrevImg} />`, `<img src=${NextImg} />`]}
            >
              <Categories categories={categories} setFilters={setFilters} setLoadMoreData={setLoadMoreData} />
          </OwlCarousel>
    </div>
)};

const mapStateToProps = ({category}) => {
  return {
    categories: category.categories,
  }
};


const mapDispatchToProps = dispatch => {
  const {setFilters, setLoadMoreData} = bindActionCreators(actions, dispatch);

  return {
    setFilters: filters => {
      setFilters(filters);
    },
    setLoadMoreData: data => {
      setLoadMoreData(data);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderCategories);