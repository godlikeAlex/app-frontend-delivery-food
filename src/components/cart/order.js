import React, {useState, useEffect} from 'react';
import { Grid, Container, Checkbox, Button, Icon, Modal, Form, Radio} from 'semantic-ui-react';
import { connect } from 'react-redux';
import check from './check.svg';
import MapSelector from '../location/map';
import { Link } from 'react-router-dom';
import { sendOrder } from '../core/API';
import {isAuth} from '../profile'


const Order = ({location, cart}) => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    // socket.emit('send order', {location, cart});
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
            cart
        }
        sendOrder(isAuth() && isAuth().token, orderData).then(data => {
            console.log(data);
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
                <Form.TextArea name='comments' onChange={handleChange} value={inputs.comments} label='Коментарии к заказу' placeholder='Коментарии к заказу' />
                <Button disabled={disable} color='orange' fluid>Оформить заказ</Button>
            </Form>
            </Modal.Content>
        </Modal>
    )

    return (
        <Container>
            <Grid centered style={{marginTop: '10px'}}>
                {modal()}
                <Grid.Column computer={8} mobile={16}>
                        <Link className='target-item' to='/cart'><Icon name='angle left' /> Корзина</Link>
                        <div className='check-controller'>
                            <h1>Оформление заказа</h1>
                            <h4>Адрес доставки:</h4>
                            <div className='space-between-item'>{location.address} <MapSelector order={true} /></div>
                            <div style={{color: '#a5a5a5', fontSize: '12px', marginTop: '5px'}}>Укажите ориентир что-бы мы могли быстрее вас найти</div>
                            <div onClick={() => setOpen(true)} className='target-item'>Указать ориентир</div>
                            <h2>К оплате:</h2>
                            {cart.items.map((item, i) => {
                                i++
                                return (
                                    <div className='space-between-item item-check'>{i}. {item.name} x {item.quantity}: <span>{item.total} Сум</span></div>
                                )
                            })}
                            <h2>Итого:</h2>
                            <div className='space-between-item item-check'>Сумма заказа: <span>{cart.total} Сум</span></div>
                            <div className='space-between-item item-check'>Сумма доставки: <span>8000 Сум</span></div>
                            <div className='space-between-item item-check'>Итого: <span>{cart.total + 8000} Сум</span></div>
                        </div>
                        <div>
                            <img style={{width: '100%'}} alt='check-svg' src={check} />
                        </div>
                        <div className='confirm-order'>
                            <Checkbox
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            /> <div>Я согласен с <span className='target-item'> условиями </span> обработки персональных данных</div></div>
                        <Button onClick={handleOrder} color='orange' disabled={!checked} fluid style={{marginTop: '25px'}}>Оформить заказ</Button>
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

export default connect(mapStateToProps)(Order);