import React, {useState, useEffect} from 'react';
import {Container, Header, Grid, Button} from 'semantic-ui-react';
import '../restaurant/restaurant.css';
import Moto from '../restaurant/moto.svg';
import {placeholderRestaurants} from '../placeholders';
import {getFilteredProducts, getAllCategories} from '../core/API.js';
import {linkImageRestaurant} from '../core/restaurantImg';
import SliderCategories from '../restaurant/sliderCategories';
import {Link} from 'react-router-dom';
import Search from '../search';
import moment from 'moment';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';

const Home = ({setCategories, filters, setLoadMoreData, categories, setRestaurants, loadMoreRestaurants, restaurants, loadMoreData}) => {
    const [values, setValues] = useState({
        placeholder: true,
        error: '',
        loading: true
    });

    const {skip, size, limit} = loadMoreData;

    useEffect(() => {
        setValues({...values, loading: true, placeholder: true});
    
        if(categories.length <= 0) {
            getAllCategories().then(data => {
                if(data.err) {
                    setValues({...values, error: data.err})
                } else {
                    setCategories(data);
                }
            }).catch(e => {
                // setError(new Error("Asynchronous error"));
            });
        }

        // @TODO LOAD ALL RESTAURANTS FROM REDUX IF IS EXISTS.

        loadFiltredResults(skip, limit, filters);

        return function cleanupLoadMore() {
            setLoadMoreData({skip: 0, limit: 6, size: 0});
        }
    }, [filters]); // eslint-disable-line



    const loadFiltredResults = (skip, limit, filters) => {
        getFilteredProducts(skip, limit, filters).then(restaurants => {
            if(restaurants.err) setValues({...values, error: restaurants.err})
            setValues({...values, placeholder: false, loading: false});
            setLoadMoreData({size: restaurants.size, skip:0});
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
                setLoadMoreData({size: data.size, skip: toSkip});
                loadMoreRestaurants(data.restaurants);
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <Button onClick={loadMore} color='orange' disabled={values.placeholder} loading={values.loading}>Загрузить еще рестораны</Button>
            )
        )
    };
    const currentTime= moment();

    const isClosed = (start, end) => {
        if(!start || !end) return false;
        const startTime = moment(start, "HH:mm");
        const endTime = moment(end, "HH:mm");
        return !currentTime.isBetween(startTime , endTime);
    }

    const eachRestaurants = () => (
        <React.Fragment>
            {restaurants && restaurants.map((restaurant, key) => (
                    <Grid.Column>
                        <Link to={`/restaurant/${restaurant._id}`}>
                        <div className='restaurant-item' key={key}>
                            <div className='restaurant-image' style={{background: `url(${linkImageRestaurant(restaurant._id)})`}}>
                                {restaurant.workTime && isClosed(restaurant.workTime.from, restaurant.workTime.to) && (
                                    <div className="restaurant-closed">
                                        <div className='restaurant-closed-content'>
                                            <div>Закрыто.</div>
                                            <div>Откроется в {restaurant.workTime.from}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="main-info-restaurant">
                                
                                <span className="restaurant-name">{restaurant.name}</span>
                                <div className='categories'>
                                    {restaurant.category.map((category, index) => (
                                        <span className='rest-category-item'>{category.name} </span>
                                    ))}
                                </div>
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
                <Search style={{width: '255px'}} />
            </div>
            <div >
                <SliderCategories placeholder={values.placeholder} />
            </div>
            <Grid stackable columns={3} style={{marginTop: '20px'}}>
                {values.placeholder ? placeholderRestaurants() : eachRestaurants()}             
            </Grid>
            <div className='load-more'>{loadMoreButton()}</div>
        </Container>
    )
};

const mapStateToProps = ({filters, restaurants,category, loadMoreData}) => {
    return {
        filters,
        restaurants,
        categories: category.categories,
        loadMoreData
    }
};

const mapDispatchToProps = dispatch => {
    const {setCategories, setLoadMoreData, setFilters, setRestaurants, loadMoreRestaurants} = bindActionCreators(actions, dispatch);

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
        },
        loadMoreRestaurants: restaurnts => {
            loadMoreRestaurants(restaurnts);
        },
        setLoadMoreData: data => {
            setLoadMoreData(data);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);