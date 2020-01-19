import React, {useState, useEffect} from 'react';
import {Container, Header, Input, Grid, Placeholder, Button, Dropdown} from 'semantic-ui-react';
import './restaurant.css';
import Moto from './moto.svg';
import {placeholderRestaurants} from '../placeholders';
import {getFilteredProducts, getAllCategories} from '../core/API.js';
import {linkImageRestaurant} from '../core/restaurantImg';

const options = [
    {
      key: 'today',
      text: 'today',
      value: 'today',
      content: 'Today',
    },
    {
      key: 'this week',
      text: 'this week',
      value: 'this week',
      content: 'This Week',
    },
    {
      key: 'this month',
      text: 'this month',
      value: 'this month',
      content: 'This Month',
    },
  ]

const Restaurants = () => {
    const [values, setValues] = useState({
        restaurants: [], 
        placeholder: true,
        limit: 6,
        skip: 0,
        size: 0,
        error: '',
        filters: [],
        categories: [],
        loading: true
    });

    const [categories, setCategories] = useState([]);

    const {loading, placeholder, filters, skip, limit, restaurants} = values;

    useEffect(() => {
        getAllCategories().then(data => {
            if(data.err) {
                setValues({...values, error: data.err})
            } else {
                setCategories(data);
            }
        })

        loadFiltredResults(skip, limit, filters);
    }, []);

    const loadFiltredResults = (skip, limit, filters) => {
        getFilteredProducts(skip, limit, filters).then(restaurants => {
            if(restaurants.err) setValues({...values, error: restaurants.err})
            setValues({...values, placeholder: false, loading: false, size: restaurants.size, skip:0, restaurants: restaurants.restaurants});
        })
        
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        setValues({...values, loading: true});
        getFilteredProducts(toSkip, limit, filters).then(data => {
            console.log(data);

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
                </Grid.Column>
            ))}
        </React.Fragment>
    );

    // const handleFilters = (myFilters, filterBy = 'category') => {
    //     const newFilters = {...filters};
    //     newFilters.filters[filterBy] = myFilters;

    //     setValues({myFilters})
    // }

    const loadCategories = () => (
        <React.Fragment>
            <Button inverted color='orange'>Все</Button>
            {/* {categories && categories.map((category, i) => (
                <Button onClick={handleFilters} inverted color='orange' key={i}>{category.name}</Button>
            ))} */}
            <Dropdown style={{width: '100%', textAlign: 'right'}} text='Еще' options={options} />
        </React.Fragment>
    )
    
    return (
        <Container>
            <div className='section-name-flex'>
                <Header as='h2' style={{margin: '0px', fontSize: '35px'}}>Рестораны</Header>
                <Input style={{width: '255px'}} icon='search' placeholder='Найти ресторан...' />
            </div>
            <div className='categories-restaurant'>
                {loadCategories()}
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

export default Restaurants;