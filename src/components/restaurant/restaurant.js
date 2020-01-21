import React, {useEffect, useState} from 'react';
import {Container, Icon, Grid, Modal, Button, Image} from 'semantic-ui-react';
import { getRestaurant } from '../core/API';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import Moto from './moto.svg';
import Slider from 'react-slick';
import {linkMenuItemImage} from '../core/restaurantImg';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

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
const Restaurant = ({match, restaurant, setRestaurant}) => {
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState({});

    useEffect(() => {
        const id = match.params.id;
        getRestaurant(id).then(rest => {
            if(rest.err) console.log(rest.err);
            
            setRestaurant(rest.data);
        })
    }, [match.params.id]);

    const handleSetActive = (e) => {
        console.log('dsadsa');
    }

    const ModalProduct = () => (
        <Modal size='small' open={open} onClose={() => setOpen(false)}>
          <Modal.Content>
              <Modal.Description>
                <Image src={`${linkMenuItemImage(product._id)}` } fluid />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p><b>{product.price} Сум</b></p>
                <Button color='orange' style={{width: '100%'}}>Добавить в корзину на {product.price} СУМ</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
    )

    const showDetails = (product) => {
        setProduct(product);
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

const mapStateToProps = ({restaurant}) => {
    return {
        restaurant
    }
};

const mapDispatchToProps = dispatch => {
    const {setRestaurant} = bindActionCreators(actions, dispatch);

    return {
        setRestaurant: restaurant => {
            setRestaurant(restaurant);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);