import React, {useState} from 'react';
import { Container, Item, Grid, Button, Segment, Form, Image } from 'semantic-ui-react';
import './style.css';
import { connect } from 'react-redux';
import {MapSelector} from '../location';
import {linkMenuItemImage} from '../core/restaurantImg';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import empty from './empty.svg'
import { Link } from 'react-router-dom';

import {updateFoodCart} from '../core/lsCart';

const Cart = ({location, cart, addQuantity, decQuantity, deleteFood}) => {
    const [inputs, setInputs] = useState({
        numHomeOfice: '',
        porch: '',
        floorNumKv: '',
        comments: ''
    })

    const handleChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    const handleOrder = (e) => {
        console.log(e);
    };


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
                <Grid.Column mobile={16} computer={10}>
                    <Segment stacked>
                        <h1>Ваша корзина</h1>
                        <Item.Group divided>
                            {cart.items.map((item, i) => (
                                <Item key={i}>
                                    <Item.Image src={linkMenuItemImage(item._id)} />
                                    <div className='cart-item-content'>
                                        <p className='order_name'>{item.name}</p>
                                        <p className='order_options'>Двойной сыр, 35СМ</p>
                                        <p className='order_price'>{item.total} Сум</p>
                                    </div>
                                    <div className='controll-items'>
                                        <Button.Group>
                                            <Button 
                                                onClick={() => {
                                                    updateFoodCart(item.uid, 'inc');
                                                    addQuantity(item.uid);
                                                }} 
                                                color='green' 
                                                icon='plus' 
                                            />
                                            <Button  
                                                color='orange' 
                                                icon='minus'
                                                onClick={() => {
                                                    updateFoodCart(item.uid, 'dec');
                                                    decQuantity(item.uid);
                                                }} 
                                            />
                                            <Button 
                                                color='red' 
                                                icon='close'
                                                onClick={() => {
                                                    updateFoodCart(item.uid);
                                                    deleteFood(item.uid);
                                                }} 
                                            />
                                        </Button.Group>
                                    </div>
                                </Item>
                            ))}
                        </Item.Group>
                    </Segment>
                </Grid.Column>
                <Grid.Column mobile={16} computer={6}>
                    <Segment stacked style={{position: 'sticky', top: '25px'}}>
                        <h2>Итого: {cart.total} Сум</h2>
                        <Form onSubmit={handleOrder}>
                            <MapSelector cart={true} />
                            <Form.Group widths='equal'>
                                <Form.Input name='numHomeOfice' onChange={handleChange} value={inputs.numHomeOfice} fluid label='№ Дома/Офиса' placeholder='Номер дома' />
                                <Form.Input name='porch' onChange={handleChange} value={inputs.porch} fluid label='Подъезд' placeholder='Подъезд' />
                                <Form.Input name='floorNumKv' onChange={handleChange} value={inputs.floorNumKv} fluid label='Этаж/№ кв' placeholder='Этаж/№ кв' />
                            </Form.Group>
                            <Form.TextArea name='comments' onChange={handleChange} value={inputs.comments} label='Коментарии к заказу' placeholder='Коментарии к заказу' />
                            <Button disabled={location.address !== null  ? false : true } color='orange' fluid>Оформить заказ</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
};

const mapStateToProps = ({cart, location}) => {
    return {
        cart,
        location
    }
}

const mapDispatchToProps = displatch => {
    const {addQuantity, decQuantity, deleteFood} = bindActionCreators(actions, displatch);

    return {
        addQuantity: (payload) => {
            addQuantity(payload);
        },
        decQuantity: payload => {
            decQuantity(payload);
        },
        deleteFood: payload => {
            deleteFood(payload);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);