import React, {useEffect, useState, useRef} from 'react';
import {Container, Icon, Grid, Modal, Button, Image, Radio, Dimmer, Loader, Checkbox} from 'semantic-ui-react';
import { getRestaurant } from '../core/API';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Moto from './moto.svg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {linkMenuItemImage, linkImageRestaurant} from '../core/restaurantImg';
import { Link, Element } from 'react-scroll'
import { useToasts } from 'react-toast-notifications';
import {addFoodToCart, storeRestaurnt} from '../core/lsCart';
import {Link as LinkHref} from 'react-router-dom';
import moment from 'moment';
import ScrollMenu from 'react-horizontal-scrolling-menu';

let menuCategoryPos = null;

const Restaurant = ({match, restaurant, setRestaurant, setRestaurntnCurrent, dish, cart, setDish, setDishOptions, dishOptions, setPrice, appendToCart}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [categoryItems, setCategoryItems] = useState([]);
    const categoryMenu = useRef(null);
    const { addToast } = useToasts();

    const MenuItem = ({text, selected, href}) => {
        return <Link className={`category-item-slider ${selected ? 'active' : ''}`} to={href} spy={true} smooth={true} offset={-90} duration={1000} >{text}</Link>
    };

    const Menu = (list, selected) =>
        list.map(el => {
        const {name} = el;

        return <MenuItem text={name} key={name} selected={selected} href={el._id} />;
    });

    useEffect(() => {
        const id = match.params.id;
        if(!restaurant._id || restaurant._id !== id) {
            getRestaurant(id).then(rest => {
                if(rest.err) console.log(rest.err);
                setLoading(false);
                setRestaurant(rest.data);
                setCategoryItems(Menu(rest.data.menu_items ? rest.data.menu_items : [], 'item1'));
                window.addEventListener('scroll', handleScroll);
            });
        } else {
            const calculatedPriceOptions = Object.values(dishOptions).reduce((prev, next) => {
                if(Array.isArray(next)) {
                    var multi = next.reduce((p, n) => {
                        return p + parseInt(n.price)
                    }, 0);

                    return prev + multi;
                }  else {
                    console.log(next);
                    return prev + parseInt(next.price);
                }
            }, 0);
            if(categoryItems) setCategoryItems(Menu(restaurant.menu_items ? restaurant.menu_items : [], 'item1'));
            setPrice(dish.price + calculatedPriceOptions);
            setLoading(false);
            window.addEventListener('scroll', handleScroll);
        }


        return function cleanup() {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [match.params.id, dishOptions]);  // eslint-disable-line

    const handleScroll = e => {
        const curPos = window.scrollY;
        const menuHeight = 43;
        const categoryMenuPossition = categoryMenu.current.getBoundingClientRect();
        menuCategoryPos = menuCategoryPos === null ? curPos+categoryMenuPossition.top : menuCategoryPos;
        if(curPos+menuHeight > menuCategoryPos) {
            categoryMenu.current.classList.add('active-rest-menu');
        } else if(curPos <= menuCategoryPos) {
            categoryMenu.current.classList.remove('active-rest-menu');
        }

    }

    const handleOption = ({category, option}, multiSelect = false) => (e, {value}) => {
        if(multiSelect) {
            const isArr = Array.isArray(dishOptions[category]);
            
            if(!isArr) {
                let newArr = [];
                newArr.push(option);
                setDishOptions(category, newArr);
                return;
            };

            const existOption = dishOptions[category].findIndex(opt => opt._id === option._id);
            const newOptions = dishOptions[category];
            if(existOption !== -1) {
                newOptions.splice(existOption, 1);
            } else {
                newOptions.push(option);
            }

            setDishOptions(category, newOptions);
        } else {
            setDishOptions(category, option);
        }
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
        if(cart.items.length === 0) {
            storeRestaurnt(restaurant);
            setRestaurntnCurrent(restaurant);
        };
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
                {dish.options.length > 0 && (
                <p>
                    <h3>Дополнительно:</h3>
                    {dish.options.length > 0 && dish.options.map(({name, options, multiSelect = false}) => (
                        <React.Fragment>
                            <h3>{name}</h3>
                            {options.map(option => (
                                multiSelect ? (
                                    <div style={{paddingTop: '10px'}}>
                                    <Checkbox 
                                        checked={
                                            dishOptions[name] && dishOptions[name].findIndex(opt => opt._id === option._id) !== -1 ? true : false
                                        } 
                                        value={option.price}
                                        onChange={handleOption({'category': name, option}, true)} 
                                        label={`${option.name} + ${option.price} сум`} 
                                    />
                                </div>
                                ) 
                                : 
                                (
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
                                )
                            ))}
                        </React.Fragment>
                    ))}
                </p>    
                )}

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
    const Arrow = ({ name, className }) => {
        return (
          <Icon
            name={name}
            className={className}
          />
        );
    };

    const ArrowLeft = Arrow({ name: 'angle left', className: 'arrow-prev' });
    const ArrowRight = Arrow({ name: 'angle right', className: 'arrow-next' });

    const currentTime= moment();

    const isOpen = (start, end) => {
        if(!start && !end) {
            window.removeEventListener('scroll', handleScroll);
            return true;
        }
        const startTime = moment(start, "HH:mm");
        const endTime = moment(end, "HH:mm");
        if(currentTime.isBetween(startTime , endTime)) {
            window.removeEventListener('scroll', handleScroll);
            return true;
        }
        return false;
    }

    return (
        <React.Fragment>
            <div className='head-restaurant' style={{background: `url(${linkImageRestaurant(restaurant._id)})`}}>
                <Container  style={{position: 'relative', height: '100%'}}>
                    <div className='centered-head-restaurant'>
                        <LinkHref style={{color: 'white'}} to='/'><Icon name='angle left' /> Все рестораны</LinkHref>
                        <h1 className='restaurant-name-header-item'>{restaurant.name}</h1>
                        <div className='main-info-header-rest'>
                            <span><img src={Moto} alt='Доставка' /> Доставка: {restaurant.delivery_time} мин</span>
                            <span> Заказ от: {restaurant.order_from} Сум</span>
                        </div>
                    </div>
                </Container>
            </div>
            {restaurant.workTime && isOpen(restaurant.workTime.from, restaurant.workTime.to) ? (
                <React.Fragment>
                    <div className='restaurant-menu' ref={categoryMenu}>
                        <Container>
                            <ScrollMenu
                                data={categoryItems}
                                arrowLeft={ArrowLeft}
                                arrowRight={ArrowRight}
                                alignCenter={false}
                                selected={selected}
                                onSelect={key => setSelected(key)}
                            />
                        </Container>
                    </div>
                    <Container style={{paddingBottom: '150px'}}>
                        {restaurant.menu_items && restaurant.menu_items.map(menuItemCategory => (
                            <Element name={menuItemCategory._id} className='category-menu-section'>
                                <h2 className='section-category-name'>{menuItemCategory.name}</h2>
                                <Grid stretched stackable columns={3}>
                                    {menuItemCategory.items && menuItemCategory.items.map((item, i) => (
                                        <Grid.Column key={i}>
                                            <div className='menu-item' onClick={() => showDetails(item)}>
                                                <div className='menu-item-image' style={{ background: `url(${linkMenuItemImage(item._id)})`}}></div>
                                                <div className="menu-item-content">
                                                    <div className="menu-item-name">{item.name}</div>
                                                    <div className="menu-item-desc">
                                                    {item.description}
                                                    </div>
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
            ) : (
                <div style={{textAlign: 'center', marginTop: '60px'}}>
                    <h2 style={{fontSize: '40px'}}>Ресторан закрыт.</h2>
                    <h2 style={{color: '#10b569'}}>Откроется в {restaurant.workTime && restaurant.workTime.from}</h2>
                    <LinkHref to='/'><Icon name='angle left' /> Все рестораны</LinkHref>
                </div>
            )}
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
    const {setRestaurant, setDish, setRestaurntnCurrent, setDishOptions, setPrice, addToCart} = bindActionCreators(actions, dispatch);

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
        },
        setRestaurntnCurrent: item => {
            setRestaurntnCurrent(item);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);