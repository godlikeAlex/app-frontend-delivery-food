import React from 'react';
import { Container, Grid, Button, Image, Message, Icon } from 'semantic-ui-react';
import './style.css';
import { connect } from 'react-redux';
import {linkMenuItemImage} from '../core/restaurantImg';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import empty from './empty.svg'
import { Link } from 'react-router-dom';
import {isAuth} from '../profile'

import {updateFoodCart} from '../core/lsCart';

const Cart = ({cart, addQuantity, decQuantity, deleteFood, showLogin, currentRestaurant}) => {
    if(cart.items.length === 0) {
       return (
        <Container style={{textAlign: 'center', marginTop: '25px'}}>
            <Grid centered>
                <Grid.Column computer={12} mobile={16} style={{textAlign: 'center'}}>
                    <Image style={{width: '65%', margin: 'auto'}} src={empty} />
                    <h1 >Ваша корзина пуста</h1>
                    <Button color='orange' style={{margin: 'auto'}} as={Link} to="/">
                        Вернутся к ресторанам
                    </Button>
                </Grid.Column>
            </Grid>
        </Container>
        )
    }

    return (
        <Container>
        <Grid centered>
            <Grid.Column computer={12} mobile={16}>
                <h1 style={{marginTop: '25px', fontSize: '35px'}}>Корзина</h1>
                <div style={{marginTop: '25px'}}>
                    {cart.items.map((item, i) => (
                        <Grid className='cart-item' key={i} >
                            <Grid.Column computer={2} mobile={5}>
                                <img className='cart-img' alt={item.name} src={linkMenuItemImage(item._id)} />
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={10}>
                                <div style={{fontWeight: '500', fontSize: '20px'}}>{item.name}</div>
                                <div className='order_options'>
                                    {Object.keys(item.options).map(option => (
                                        Array.isArray(item.options[option]) ? (
                                            <React.Fragment>
                                                <span>{option}:
                                                {item.options[option].map(multiOpt => (
                                                    <span>{multiOpt.name} </span>
                                                ))};</span>
                                            </React.Fragment>
                                        ) : (
                                            <span>{option}: {item.options[option].name}; </span>
                                        )
                                    ))}
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={3} mobile={5}>
                                <div className='controll-items'>
                                        <span 
                                    className='counter-minus'
                                    onClick={() => {
                                        updateFoodCart(item.uid, 'dec');
                                        decQuantity(item.uid);
                                    }} 
                                >–</span>
                                <div className='counter-quantity'>{item.quantity}</div>
                                <span 
                                    className='counter-plus'
                                    onClick={() => {
                                        updateFoodCart(item.uid, 'inc');
                                        addQuantity(item.uid);
                                    }} 
                                >+</span>
                            </div>
                            </Grid.Column>
                            <Grid.Column computer={4} mobile={6}>
                                <div className="price-cart">
                                    {item.total} Сум
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={2} mobile={5}
                                className='delete-item-cart' 
                            > 
                                <Icon 
                                    name='close'
                                    onClick={() => {
                                        updateFoodCart(item.uid);
                                        deleteFood(item.uid);
                                    }} 
                                />
                            </Grid.Column>
                        </Grid>        
                    ))}
                    <Grid>
                        <Grid.Column width={16} className='total-cart'>
                            Сумма заказа: {cart.total} сум
                        </Grid.Column>

                    </Grid>
                </div>
            </Grid.Column>
            {!isAuth() ? (
                <Message warning>
                    <Message.Header>Что-бы продолжить необходимо войти в систему!</Message.Header>
                    <p>Войдите в аккаунт и попробуйте снова. <span style={{color: '#4183c4', cursor: 'pointer'}} onClick={() => showLogin(true)}>Вход</span></p>
                </Message>
            ) : (
                currentRestaurant && cart.total >= parseInt(currentRestaurant.order_from) ?
                (
                    <React.Fragment>
                        <React.Fragment>
                            <Grid.Column  computer={5} mobile={16} style={{textAlign: 'center'}}>
                                <Link to={`/restaurant/${cart.items[0].restaurant}`}>
                                    <Button fluid color='grey'>
                                        Продолжить покупки
                                    </Button>
                                </Link>
                            </Grid.Column>
                            <Grid.Column computer={5} mobile={16} style={{textAlign: 'center'}}>
                            <Link to='/order' >
                                <Button fluid color='orange' disabled={cart.items.length < 0}>
                                    Оформить заказ
                                </Button>
                            </Link>
                        </Grid.Column>
                        </React.Fragment>
                    </React.Fragment>
                ) 
                : 
                (
                    <Message warning>
                        <Message.Header>Минимальный заказ в {currentRestaurant.name} - {currentRestaurant.order_from} Сум</Message.Header>
                        <p>Что-бы продолжить закупитесь на минимальную сумму - {currentRestaurant.order_from} Сум. Продолжить заказ <Link to={`/restaurant/${currentRestaurant._id}`}>{currentRestaurant.name}</Link></p>
                    </Message>
                )
            )}
        </Grid>
        </Container>
    )
};

const mapStateToProps = ({cart, location, auth, currentRestaurant}) => {
    return {
        cart,
        location,
        auth,
        currentRestaurant
    }
}

const mapDispatchToProps = displatch => {
    const {addQuantity, decQuantity, deleteFood, showLogin} = bindActionCreators(actions, displatch);

    return {
        addQuantity: (payload) => {
            addQuantity(payload);
        },
        decQuantity: payload => {
            decQuantity(payload);
        },
        deleteFood: payload => {
            deleteFood(payload);
        },
        showLogin: payload => {
            showLogin(payload);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);