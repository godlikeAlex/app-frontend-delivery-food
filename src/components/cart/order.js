import React, {useState, useEffect} from 'react';
import { Grid, Container, Checkbox, Button, Icon, Modal, Form, Radio, Message} from 'semantic-ui-react';
import { connect } from 'react-redux';
import check from './check.svg';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import {registerOrder} from '../core/socket';
import { getDeliveryInfo } from '../core/API';

const Order = ({location, cart, history, showSuccess, reOrder, setReOrder, clearCart, currentRestaurant, openLocation}) => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [landmark, setLandmark] = useState(reOrder ? reOrder.landmark && reOrder.landmark : undefined);
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
        },
        comment: reOrder ? reOrder.comment && reOrder.comment : undefined
    });

    const [typeDelivery, setTypeDelivery] = useState('home');
    const [disable, setDisable] = useState(true);
    const [deliveryPriceLoading, setDeliveryPriceLoading] = useState(true);
    const [deliveryInfo, setDeliveryInfo] = useState({
        distance: "3 км.",
        price: 5000
    });

    useEffect(() => {
        getDeliveryInfo(currentRestaurant._id, location.position.latitude, location.position.longitude).then(data => {
            if(!data.err) {
                setDeliveryInfo(data.delivery);
                setDeliveryPriceLoading(false)
            }
        })
    }, [location]); // eslint-disable-line

    useEffect(() => {
        if(history.location.pathname === '/checkout') {
            !reOrder && history.push('/my-orders');
        }
    
        if(history.location.pathname === '/order') {
            setReOrder(null);
        }

        for(const input in inputs[typeDelivery]) {
            if(inputs[typeDelivery][input].length === 0) {
                setDisable(true);
                break;
            } else {
                setDisable(false);
            }
        }
    }, [inputs, typeDelivery, reOrder, history, setReOrder])

    const handleChange = e => {
        if(e.target.name === 'comment') {
            setInputs({...inputs, comment: e.target.value});
        } else {
            setInputs({...inputs,
                [typeDelivery]: {
                    ...inputs[typeDelivery],
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    const handleSaveAddress = () => {
        getLandMark();
        setOpen(false);
    }

    const handleTypeDelivery = (e, {value}) => {
        setTypeDelivery(value);
        setInputs({
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
            },
            comment: null
        });
    }

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

    const handleOrder = () => {
        const orderData = {
            location,
            cart: reOrder ? reOrder: cart,
            landmark,
            comment: inputs.comment,
            deliveryInfo
        }
        
        const restaurant = reOrder ? reOrder.restaurant : currentRestaurant;

        registerOrder(orderData, restaurant._id, restaurant.name, err => {
            if(err) {
                setError(err);
            } else {
                showSuccess(true);
                history.push('/success');
                if(!reOrder) {
                    clearCart();
                    localStorage.removeItem('cart');
                }
            }
        })
    }

    const modal = () => (
        <Modal size='tiny' open={open} onClose={() => setOpen(false)}>
            <Modal.Content>
                <Form >
                <p style={{fontWeight: 700}}>Где вы находитесь?</p>
                <Form.Group inline >
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
                <Form.TextArea name='comment' onChange={handleChange} value={inputs.comment} label='Коментарии к заказу' placeholder='Коментарии к заказу' />
                <Button onClick={handleSaveAddress} disabled={disable} color='orange' fluid>Применить</Button>
            </Form>
            </Modal.Content>
        </Modal>
    )

    const getLandMark = () => {
        if(inputs.home['porch'].length > 0) {
            setLandmark(`Подъезд - ${inputs.home['porch']}. Номер кваритры - ${inputs.home['numHome']}. Этаж - ${inputs.home['floorNum']}`);
        } else if(inputs.office['officeNum'].length > 0) {
            setLandmark(`Номер кабинета - ${inputs.office['officeNum']}. Этаж - ${inputs.office['porchOffice']}`);
        } else if(inputs.other['orient'].length > 0) {
            setLandmark(`Другое. Ориентир - ${inputs.other['orient']}`);
        }
    }

    const renderOrders = (cart) => (
        cart.items.map((item, i) => {
            i++
            return (
                <div className='space-between-item item-check'>{i}. {item.name} x {item.quantity}: <span>{item.totalPrice} Сум</span></div>
            )
        })
    )

    return (
        <Container >
            <Grid centered style={{marginTop: '10px'}} >
                {modal()}
                <Grid.Column computer={8} mobile={16}>
                        {reOrder ? (
                            <Link className='target-item' to='/my-orders'><Icon name='angle left' /> Мои заказы</Link>
                        ) : (
                            <Link className='target-item' to='/cart'><Icon name='angle left' /> Корзина</Link>
                        )}
                        <div className='check-controller'>
                            {error && <Message negative>
                                <Message.Header>Ошибка оформления заказа</Message.Header>
                                <p>{error}</p>
                            </Message>}
                            <h1>{reOrder ? 'Повтор заказа' : 'Оформление заказа'}</h1>
                            <h4>Адрес доставки:</h4>
                            <div className='space-between-item'>{location.address || 'Адрес не указан'} <div onClick={() => openLocation(true)}className='target-item'>Изменить адрес</div></div>
                            {
                                <div style={{color: '#a5a5a5', fontSize: '12px', marginTop: '5px'}}>{landmark ? landmark : 'Укажите ориентир что-бы мы могли быстрее вас найти'}</div>
                            }
                            <div onClick={() => setOpen(true)} className='target-item'>Указать ориентир</div>
                            <h2>К оплате:</h2>
                            {renderOrders(reOrder ? reOrder : cart)}
                            <h2>Итого:</h2>
                            <div className='space-between-item item-check'>Сумма заказа: <span>{reOrder ? reOrder.total : cart.total} Сум</span></div>
                            <div className='space-between-item item-check'>Сумма доставки: <span>{deliveryPriceLoading ? 'Загружаем...' : `${deliveryInfo.price} Сум`}</span></div>
                            <div className='space-between-item item-check'>Итого: <span>{reOrder ? reOrder.total : cart.total + deliveryInfo.price} Сум</span></div>
                        </div>
                        <div>
                            <img style={{width: '100%'}} alt='check-svg' src={check} />
                        </div>
                        <div className='confirm-order'>
                            <Checkbox
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            /> <div>Я согласен с <span className='target-item'> условиями </span> обработки персональных данных</div></div>
                        {!location.position && (
                            <div style={{textAlign: 'center', fontWeight: 700, paddingTop: '25px'}}>
                                Что-бы продолжить заказа пожалуйста укажите <span className="target-item" onClick={() => openLocation(true)}>Укажите адрес</span>.
                            </div>
                        )}
                        <Button onClick={handleOrder} color='orange' disabled={location.position && checked ? false : true } fluid style={{marginTop: '25px'}}>Оформить заказ</Button>
                </Grid.Column>
            </Grid>
        </Container>
    )
};

const mapStateToProps = ({cart, location, reOrder, currentRestaurant}) => {
    return {
        cart,
        location,
        reOrder,
        currentRestaurant
    }
}

const mapDipatchToProps = displatch => {
    const {showSuccess, setReOrder, clearCart, openLocation} = bindActionCreators(actions, displatch);

    return {
        showSuccess: show => showSuccess(show),
        setReOrder: order => setReOrder(order),
        clearCart: () => clearCart(),
        openLocation: payload => openLocation(payload),
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(Order);