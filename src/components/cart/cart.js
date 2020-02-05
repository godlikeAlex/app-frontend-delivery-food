import React, {useState, useEffect} from 'react';
import { Container, Grid, Button, Segment, Form, Image, Radio, Message, Icon } from 'semantic-ui-react';
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
        if(isAuth()) {
            console.log('okay');
        } else {
            showLogin(true)
        }
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
                                <div className='order_options'>Двойной сыр, 35СМ</div>
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
                <React.Fragment>
                    <Grid.Column  computer={5} mobile={16} style={{textAlign: 'center'}}>
                        <Link to={`/restaurant/${cart.items[0].restaurant}`}>
                            <Button fluid color='grey'>
                                Продолжить покупки
                            </Button>
                        </Link>
                    </Grid.Column>
                    <Grid.Column computer={5} mobile={16} style={{textAlign: 'center'}}>
                        <Button fluid color='orange' disabled={cart.items.length < 0} onClick={handleOrder}>
                            Оформить заказ
                        </Button>
                    </Grid.Column>
                </React.Fragment>
            )}
        </Grid>
        </Container>
    )

    // return (
    //     <Container style={{marginTop: '25px'}}>
    //         <Grid>
    //             <Grid.Column mobile={16} computer={10}>
    //                 <Segment >
    //                     <h1>Ваша корзина</h1>
    //                         {cart.items.map((item, i) => (
    //                             <Grid className='cart-item' key={i} >
    //                                 <Grid.Column width={3}>
    //                                     <img className='cart-img' alt={item.name} src={linkMenuItemImage(item._id)} />
    //                                 </Grid.Column>
    //                                 <Grid.Column width={6} className={'center-content-cart'}>
    //                                     <div>
    //                                                                                 <p className='order_name'>{item.name}</p>
    //                                     <p className='order_options'>Двойной сыр, 35СМ</p>
    //                                     </div>
    //                                     {/* <p className='order_price'>{item.total} Сум</p> */}
    //                                 </Grid.Column>
    //                                 <Grid.Column width={3}>
    //                                 <div className='controll-items'>
    //                                     <span 
    //                                         className='counter-minus'
    //                                         onClick={() => {
    //                                             updateFoodCart(item.uid, 'dec');
    //                                             decQuantity(item.uid);
    //                                         }} 
    //                                     >–</span>
    //                                     <div className='counter-quantity'>{item.quantity}</div>
    //                                     <span 
    //                                         className='counter-plus'
    //                                         onClick={() => {
    //                                             updateFoodCart(item.uid, 'inc');
    //                                             addQuantity(item.uid);
    //                                         }} 
    //                                     >+</span>
    //                                 </div>
    //                                 </Grid.Column>
    //                                 <Grid.Column width={3}>
    //                                     <div className="price-cart">
    //                                         {item.total} 
    //                                     </div>
    //                                 </Grid.Column>
    //                                 <Grid.Column width={1}
    //                                     className='delete-item-cart' 
    //                                 > 
    //                                     <Icon 
    //                                         name='close'
    //                                         onClick={() => {
    //                                             updateFoodCart(item.uid);
    //                                             deleteFood(item.uid);
    //                                         }} 
    //                                     />
    //                                 </Grid.Column>
    //                             </Grid>
    //                         ))}
    //                 </Segment>
    //             </Grid.Column>
    //             <Grid.Column mobile={16} computer={6}>
    //                 <Segment style={{position: 'sticky', top: '50px'}}>
    //                     <h2>Итого: {cart.total} Сум</h2>
    //                     {!isAuth() ? (
    //                         <Message warning>
    //                             <Message.Header>Что-бы продолжить необходимо войти в систему!</Message.Header>
    //                             <p>Войдите в аккаунт и попробуйте снова. <span style={{color: '#4183c4', cursor: 'pointer'}} onClick={() => showLogin(true)}>Вход</span></p>
    //                         </Message>
    //                     ) : (
    //                         <Form onSubmit={handleOrder}>
    //                         <MapSelector cart={true} />
    //                         <Form.Group inline >
    //                             <label>Где вы находитесь?</label>
    //                             <Form.Field
    //                                 control={Radio}
    //                                 label='Квартира'
    //                                 value='home'
    //                                 checked={typeDelivery === 'home'}
    //                                 onChange={handleTypeDelivery}
    //                             />
    //                             <Form.Field
    //                                 control={Radio}
    //                                 label='Офис'
    //                                 value='office'
    //                                 checked={typeDelivery === 'office'}
    //                                 onChange={handleTypeDelivery}
    //                             />
    //                             <Form.Field
    //                                 control={Radio}
    //                                 label='Другое'
    //                                 value='other'
    //                                 checked={typeDelivery === 'other'}
    //                                 onChange={handleTypeDelivery}
    //                             />
    //                         </Form.Group>
    //                         {detailsAddres()}
    //                         <Form.TextArea name='comments' onChange={handleChange} value={inputs.comments} label='Коментарии к заказу' placeholder='Коментарии к заказу' />
    //                         <Button disabled={disable} color='orange' fluid>Оформить заказ</Button>
    //                     </Form>
    //                     )}
    //                 </Segment>
    //             </Grid.Column>
    //         </Grid>
    //     </Container>
    // )
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