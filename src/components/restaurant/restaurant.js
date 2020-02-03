import React, {useEffect, useState, useRef} from 'react';
import {Container, Icon, Grid, Modal, Button, Image, Radio, Dimmer, Loader} from 'semantic-ui-react';
import { getRestaurant } from '../core/API';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Moto from './moto.svg';
import Slider from 'react-slick';
import {linkMenuItemImage, linkImageRestaurant} from '../core/restaurantImg';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { useToasts } from 'react-toast-notifications';
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
          slidesToShow: 6,
          slidesToScroll: 6,
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
          slidesToShow: 5,
          slidesToScroll: 5
        }
      }
    ]
};
let menuCategoryPos = null;

const Restaurant = ({match, restaurant, setRestaurant, dish, cart, setDish, setDishOptions, dishOptions, setPrice, appendToCart}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const categoryMenu = useRef(null);
    const { addToast } = useToasts();

    useEffect(() => {
        const id = match.params.id;
        if(!restaurant._id || restaurant._id !== id) {
            getRestaurant(id).then(rest => {
                if(rest.err) console.log(rest.err);
                setLoading(false);
                setRestaurant(rest.data);
                window.addEventListener('scroll', handleScroll);
            });
        } else {
            const calculatedPriceOptions = Object.values(dishOptions).reduce((prev, next) => {
                return prev + parseInt(next.price)
            }, 0);
            setPrice(dish.price + calculatedPriceOptions);
            setLoading(false);
            window.addEventListener('scroll', handleScroll);

        }

        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [match.params.id, dishOptions]);


    const handleScroll = e => {
        const curPos = window.scrollY;
        console.log(menuCategoryPos)
        const menuHeight = 43;
        const categoryMenuPossition = categoryMenu.current.getBoundingClientRect();
        menuCategoryPos = menuCategoryPos === null ? curPos+categoryMenuPossition.top : menuCategoryPos;
        if(curPos+menuHeight > menuCategoryPos) {
            categoryMenu.current.classList.add('active-rest-menu');
        } else if(curPos <= menuCategoryPos) {
            categoryMenu.current.classList.remove('active-rest-menu');
        }

    }

    const handleSetActive = (e) => {
        console.log('dsadsa');
    }

    const handleOption = ({category, option}) => (e, {value}) => {
        setDishOptions(category, option);
    };

    const addToCart = () => {
        if(cart.items[0] && restaurant._id !== cart.items[0].restaurant ) {
            setOpen(false);
            addToast('Блюда в корзину можно добавлять одновременно только с одного ресторана.', {appearance: 'error', autoDismiss: true})
            // addToast(<span>Удалить элементы с корзины</span>, {appearance: 'warning', autoDismiss: true});
            return;
        }
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
        addFoodToCart(food);
        appendToCart(food);
        setOpen(false);
        addToast(`${food.name} успешно добавлено в корзину.`, {appearance: 'success', autoDismiss: true});
    };


    const ModalProduct = () => (
        <Modal size='tiny' closeIcon={true} open={open} onClose={() => setOpen(false)}>
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

    if(loading) {
        return (
            <Dimmer active inverted>
                <Loader inverted>Загрузка...</Loader>
            </Dimmer>
        )
    }

    return (
        <React.Fragment>
            <div className='head-restaurant' style={{background: `url(${linkImageRestaurant(restaurant._id)})`}}>
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
            <div className='restaurant-menu' ref={categoryMenu}>
                <Container>
                    <Slider 
                        {...settings}
                    >
                        {restaurant.menu_items && restaurant.menu_items.map(menuItemCategory => (
                            <Link className='category-item-slider' to={menuItemCategory._id} spy={true} smooth={true} offset={-90} duration={1000} onClick={() => handleSetActive(menuItemCategory)}>{menuItemCategory.name}</Link>
                        ))}
                    </Slider>
                </Container>
            </div>
            <Container>
                {restaurant.menu_items && restaurant.menu_items.map(menuItemCategory => (
                    <Element name={menuItemCategory._id} className='category-menu-section'>
                        <h2 className='section-category-name'>{menuItemCategory.name}</h2>
                        <Grid stretched stackable columns={3}>
                            {menuItemCategory.items && menuItemCategory.items.map((item, i) => (
                                <Grid.Column key={i}>
                                    <div className='menu-item' onClick={() => showDetails(item)}>
                                        <div className='menu-item-image' style={{ background: `url(${linkMenuItemImage(item._id)})`}}></div>
                                        <div className="menu-item-content">
                                            <div className="menu-item-name"><span>{item.name}</span> <span>{item.price} Сум</span></div>
                                            <div className="menu-item-desc">
                                            {item.description}
                                            </div>
                                            {/* <div className="menu-item-price">Цена: {item.price} Сум</div> */}
                                        </div>
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

const mapStateToProps = ({restaurant, dish, dishOptions, cart}) => {
    return {
        restaurant,
        dish,
        dishOptions,
        cart
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