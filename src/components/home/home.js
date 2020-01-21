import React, {useState, useEffect} from 'react';
import {Container, Header, Input, Grid, Button} from 'semantic-ui-react';
import '../restaurant/restaurant.css';
import Moto from '../restaurant/moto.svg';
import {placeholderRestaurants} from '../placeholders';
import {getFilteredProducts, getAllCategories} from '../core/API.js';
import {linkImageRestaurant} from '../core/restaurantImg';
import SliderCategories from '../restaurant/sliderCategories';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const Home = ({setCategories, filters, categories, setRestaurants, restaurants}) => {
    const [values, setValues] = useState({
        placeholder: true,
        limit: 6,
        skip: 0,
        size: 0,
        error: '',
        loading: true
    });

    const {loading, placeholder, skip, limit} = values;

    useEffect(() => {
        setValues({...values, loading: true, placeholder: true})
        if(categories.length <= 0) {
            getAllCategories().then(data => {
                if(data.err) {
                    setValues({...values, error: data.err})
                } else {
                    setCategories(data);
                }
            })
        }
        loadFiltredResults(skip, limit, filters);
    }, [filters]);



    const loadFiltredResults = (skip, limit, filters) => {
        getFilteredProducts(skip, limit, filters).then(restaurants => {
            if(restaurants.err) setValues({...values, error: restaurants.err})
            setValues({...values, placeholder: false, loading: false, size: restaurants.size, skip:0});
            setRestaurants(restaurants.restaurants);
        })
        
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        setValues({...values, loading: true});
        getFilteredProducts(toSkip, limit, filters).then(data => {
            if(data.err) {
                setValues({...values, error: data.err, loading: false})
            } else {
                setValues({...values, restaurants: [...restaurants, ...data.restaurants], size: data.size, skip: toSkip, loading: false});
            }
        })
    }

    const eachRestaurants = () => (
        <React.Fragment>
            {restaurants && restaurants.map((restaurant, key) => (
                    <Grid.Column>
                        <Link to={`/restaurant/${restaurant._id}`}>
                        <div className='restaurant-item' key={key}>
                            <div className='restaurant-image' style={{background: `url(${linkImageRestaurant(restaurant._id)})`}}></div>
                            <div className="main-info-restaurant">
                                <div className="restaurant-name">{restaurant.name}</div>
                                <div className='categories'>
                                    {restaurant.category.map((category, index) => (
                                        <span className={index % 2 !== 0 ? 'category-dot' : ''}>{category.name} </span>
                                    ))}
                                </div>
                                {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                                <div className="restaurant-order-from">
                                    От {restaurant.order_from} Сум
                                    <div className='delivery-time'>
                                        <img style={{paddingRight: '5px'}} src={Moto} alt=""/> {restaurant.delivery_time} мин
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </Grid.Column> 
                    ))}
        </React.Fragment>
    );
    
    return (
        <Container>
            <div className='section-name-flex'>
                <Header as='h2' style={{margin: '0px', fontSize: '35px'}}>Рестораны</Header>
                <Input style={{width: '255px'}} icon='search' placeholder='Найти ресторан...' />
            </div>
            <div >
                <SliderCategories />
            </div>
            <Grid stackable columns={3} style={{marginTop: '20px'}}>
                {placeholder ? placeholderRestaurants() : eachRestaurants()}             
            </Grid>
            <div className='load-more'>
                <Button onClick={loadMore} color='orange' loading={loading}>Загрузить еще рестораны</Button>
            </div>
        </Container>
    )
};

const mapStateToProps = ({filters, restaurants,category}) => {
    return {
        filters,
        restaurants,
        categories: category.categories
    }
};

const mapDispatchToProps = dispatch => {
    const {setCategories, setFilters, setRestaurants} = bindActionCreators(actions, dispatch);

    return {
        setCategories: categories => {
            setCategories(categories);
        },
        setFilters: filters => {
            console.log(filters);
            setFilters(filters);
        },
        setRestaurants: restaurants => {
            setRestaurants(restaurants)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);