import React, {useEffect, useState} from 'react';
import {Container, Icon, Grid, Modal, Button, Image, Radio} from 'semantic-ui-react';
import { getRestaurant } from '../core/API';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Moto from './moto.svg';
import Slider from 'react-slick';
import {linkMenuItemImage} from '../core/restaurantImg';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {addFoodToCart} from '../core/lsCart';

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
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
};

// TODO LOADING!!!!
// TODO LOADING!!!!
// TODO LOADING!!!!
// TODO LOADING!!!!
// TODO LOADING!!!!
const Restaurant = ({match, restaurant, setRestaurant, dish, setDish, setDishOptions, dishOptions, setPrice, appendToCart}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const id = match.params.id;
        if(!restaurant._id || restaurant._id !== id) {
            setLoading(true);
            getRestaurant(id).then(rest => {
                if(rest.err) console.log(rest.err);
                setRestaurant(rest.data);
                setLoading(false);
            })
        } else {
            const calculatedPriceOptions = Object.values(dishOptions).reduce((prev, next) => {
                return prev + parseInt(next.price)
            }, 0);
            setPrice(dish.price + calculatedPriceOptions);
        }

    }, [match.params.id, dishOptions]);

    const handleSetActive = (e) => {
        console.log('dsadsa');
    }

    const handleOption = ({category, option}) => (e, {value}) => {
        setDishOptions(category, option);
    };

    const addToCart = () => {
        const food = {
            _id: dish._id,
            uid: Math.floor(Math.random(25) * 9999),
            name: dish.name,
            quantity: 1,
            restaurant: dish.restaurant,
            options: dishOptions,
            price: dish.totalPrice,
            total: dish.totalPrice
        }
        setOpen(false);
        addFoodToCart(food);
        appendToCart(food);
    };


    const ModalProduct = () => (
        <Modal size='small' open={open} onClose={() => setOpen(false)}>
          <Modal.Content>
              <Modal.Description>
                <Image src={`${linkMenuItemImage(dish._id)}` } fluid />
                <h2>{dish.name}</h2>
                <p>{dish.description}</p>
                <p>
                    <h3>Дополнительно:</h3>
                    {dish.options.length > 0 && dish.options.map(({name, options}) => (
                        <React.Fragment>
                            <h3>{name}*</h3>
                        
                            {options.map(option => (
                                <div style={{paddingTop: '10px'}}>
                                    <Radio 
                                        checked={
                                            dishOptions[name] && dishOptions[name]._id === option._id
                                        } 
                                        value={option.price}
                                        onChange={handleOption({'category': name, option})} 
                                        label={`${option.name} + ${option.price} сум`} 
                                    />
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </p>
                <p><b>{dish.price} Сум</b></p>
                <Button onClick={addToCart} disabled={Object.values(dishOptions).length !== dish.options.length} color='orange' style={{width: '100%'}}>Добавить в корзину на {dish.totalPrice} СУМ</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    )

    const showDetails = dish => {
        setDish(dish);
        setOpen(true);
    }

    return (
        <React.Fragment>
            <div className='head-restaurant'>
                <Container  style={{position: 'relative', height: '100%'}}>
                    <div className='centered-head-restaurant'>
                        <Link style={{color: 'white'}} to='/'><Icon name='angle left' /> Назад</Link>
                        <h1>{restaurant.name}</h1>
                        <div className='main-info-header-rest'>
                            <span><img src={Moto} alt='Доставка' /> Доставка: {restaurant.delivery_time} мин</span>
                            <span> Заказ от: {restaurant.order_from} Сум</span>
                        </div>
                    </div>
                </Container>
            </div>
            <div className='restaurant-menu'>
                <Container>
                    <Slider 
                        {...settings}
                    >
                        {restaurant.menu_items && restaurant.menu_items.map(menuItemCategory => (
                            <Link to={menuItemCategory._id} spy={true} smooth={true} offset={50} duration={1000} onClick={() => handleSetActive(menuItemCategory)}>{menuItemCategory.name}</Link>
                        ))}
                    </Slider>
                </Container>
            </div>
            <Container>
                {restaurant.menu_items && restaurant.menu_items.map(menuItemCategory => (
                    <Element name={menuItemCategory._id} className='category-menu-section'>
                        <h2>{menuItemCategory.name}</h2>
                        <Grid stackable columns={3}>
                            {menuItemCategory.items && menuItemCategory.items.map((item, i) => (
                                <Grid.Column key={i}>
                                    <div className='menu-item' onClick={() => showDetails(item)}>
                                        <div className='menu-item-image' style={{ background: `url(${linkMenuItemImage(item._id)})`}}></div>
                                        <div className="menu-item-name">{item.name}</div>
                                        <div className="menu-item-desc">
                                        {item.description}
                                        </div>
                                        <div className="menu-item-price">Цена: {item.price} Сум</div>
                                    </div>
                                </Grid.Column>
                            ))}
                        </Grid>
                    </Element>
                ))}
            </Container>
            {ModalProduct()}
        </React.Fragment>
    )
}

const mapStateToProps = ({restaurant, dish, dishOptions}) => {
    return {
        restaurant,
        dish,
        dishOptions
    }
};

const mapDispatchToProps = dispatch => {
    const {setRestaurant, setDish, setDishOptions, setPrice, addToCart} = bindActionCreators(actions, dispatch);

    return {
        setRestaurant: restaurant => {
            setRestaurant(restaurant);
        },
        setDish: dish => {
            setDish(dish);
        },
        setDishOptions: (name, option) => {
            setDishOptions({[name]: option})
        },
        setPrice: price => {
            setPrice(price);
        },
        appendToCart: item => {
            addToCart(item);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);