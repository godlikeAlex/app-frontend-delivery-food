import React, {useState, useEffect} from 'react';
import { Container, Grid, Button, Segment, Form, Image, Radio, Message } from 'semantic-ui-react';
import './style.css';
import { connect } from 'react-redux';
import {MapSelector} from '../location';
import {linkMenuItemImage} from '../core/restaurantImg';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import empty from './empty.svg'
import { Link } from 'react-router-dom';
import {isAuth} from '../profile'

import {updateFoodCart} from '../core/lsCart';

const Cart = ({location, cart, addQuantity, decQuantity, deleteFood, showLogin}) => {
    const [inputs, setInputs] = useState({
        home: {
            porch: '',
            numHome: '',
            floorNum: ''
        },
        office: {
            officeNum: '',
            porchOffice: ''
        },
        other: {
            orient: ''
        }
    });

    const [typeDelivery, setTypeDelivery] = useState('home');
    const [disable, setDisable] = useState(true);

    useEffect(() => {
        for(const input in inputs[typeDelivery]) {
            if(inputs[typeDelivery][input].length === 0) {
                console.log(input);
                setDisable(true);
                break;
            } else {
                setDisable(false);

            }
        }
    }, [inputs, typeDelivery])

    const handleChange = e => {
        setInputs({...inputs,
            [typeDelivery]: {
                ...inputs[typeDelivery],
                [e.target.name]: e.target.value
            }
        });
    }

    const handleTypeDelivery = (e, {value}) => {
        setTypeDelivery(value);
    }

    const handleOrder = (e) => {
        console.log(e);
    };

    const detailsAddres = () => {
        const {
            home: {porch, numHome, floorNum},
            office: {porchOffice, officeNum}
        } = inputs;

        if(typeDelivery === 'home') {
            return (
                <Form.Group widths='equal'>
                    <Form.Input required name='porch' onChange={handleChange} value={porch} fluid label='Подъезд' placeholder='Подъезд' />
                    <Form.Input required name='numHome' onChange={handleChange} value={numHome} fluid label='Квартира' placeholder='Квартира' />
                    <Form.Input required name='floorNum' onChange={handleChange} value={floorNum} fluid label='Этаж' placeholder='Этаж' />
                </Form.Group>
            )
        } else if(typeDelivery === 'office') {
            return (
                <Form.Group widths='equal'>
                    <Form.Input required name='porchOffice' onChange={handleChange} value={porchOffice} fluid label='Номер кабинета' placeholder='Номер кабинета' />
                    <Form.Input required name='officeNum' onChange={handleChange} value={officeNum} fluid label='Этаж' placeholder='Этаж' />
                </Form.Group>
            )
        } else if(typeDelivery === 'other') {
            return (
                <Form.TextArea required name='orient' onChange={handleChange} value={inputs.other.orient} label='Ориентир' placeholder='Ориентир' />
            )
        }
    }


    if(cart.items.length === 0) {
       return (
        <Container style={{textAlign: 'center', marginTop: '25px'}}>
            <Image style={{width: '65%', margin: 'auto'}} src={empty} />
            <h1 >Ваша корзина пуста</h1>
            <Button color='orange' style={{margin: 'auto'}}>
                <Link to='/'>
                    Вернутся к ресторанам
                </Link>
            </Button>
        </Container>
        )
    }

    return (
        <Container style={{marginTop: '25px'}}>
            <Grid>
                <Grid.Column mobile={16} computer={9}>
                    <Segment stacked>
                        <h1>Ваша корзина</h1>
                            {cart.items.map((item, i) => (
                                <Grid key={i}>
                                    <Grid.Column width={4}>
                                        <img className='cart-img' alt={item.name} src={linkMenuItemImage(item._id)} />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <p className='order_name'>{item.name}</p>
                                        <p className='order_options'>Двойной сыр, 35СМ</p>
                                        <p className='order_price'>{item.total} Сум</p>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                    <div className='controll-items'>
                                    <Button.Group>
                                        <Button 
                                            icon='minus' 
                                            onClick={() => {
                                                updateFoodCart(item.uid, 'dec');
                                                decQuantity(item.uid);
                                            }} 
                                        />
                                        <Button.Or text={item.quantity} />
                                        <Button 
                                            icon='plus' 
                                            positive
                                            onClick={() => {
                                                updateFoodCart(item.uid, 'inc');
                                                addQuantity(item.uid);
                                            }} 
                                        />
                                        <Button 
                                            color='red' 
                                            icon='trash'
                                            onClick={() => {
                                                updateFoodCart(item.uid);
                                                deleteFood(item.uid);
                                            }} 
                                        />
                                    </Button.Group>
                                    </div>
                                    </Grid.Column>
                                </Grid>
                            ))}
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} computer={7}>
                    <Segment stacked style={{position: 'sticky', top: '50px'}}>
                        <h2>Итого: {cart.total} Сум</h2>
                        {!isAuth() ? (
                            <Message warning>
                                <Message.Header>Что-бы продолжить необходимо войти в систему!</Message.Header>
                                <p>Войдите в аккаунт и попробуйте снова. <span style={{color: '#4183c4', cursor: 'pointer'}} onClick={() => showLogin(true)}>Вход</span></p>
                            </Message>
                        ) : (
                            <Form onSubmit={handleOrder}>
                            <MapSelector cart={true} />
                            <Form.Group inline >
                                <label>Где вы находитесь?</label>
                                <Form.Field
                                    control={Radio}
                                    label='Квартира'
                                    value='home'
                                    checked={typeDelivery === 'home'}
                                    onChange={handleTypeDelivery}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Офис'
                                    value='office'
                                    checked={typeDelivery === 'office'}
                                    onChange={handleTypeDelivery}
                                />
                                <Form.Field
                                    control={Radio}
                                    label='Другое'
                                    value='other'
                                    checked={typeDelivery === 'other'}
                                    onChange={handleTypeDelivery}
                                />
                            </Form.Group>
                            {detailsAddres()}
                            <Form.TextArea name='comments' onChange={handleChange} value={inputs.comments} label='Коментарии к заказу' placeholder='Коментарии к заказу' />
                            <Button disabled={disable} color='orange' fluid>Оформить заказ</Button>
                        </Form>
                        )}
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
};

const mapStateToProps = ({cart, location, auth}) => {
    return {
        cart,
        location,
        auth
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