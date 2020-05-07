import React, {useState, useEffect} from 'react';
import { Header, Grid, Container, Button, Icon } from 'semantic-ui-react';
import './style.css';
import { getOrders } from '../core/API';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/ru';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

const UserOrders = ({auth, setReOrder, history}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders(auth.token).then(data => {
            if(data.err) {
                console.log(data.err);
                return;
            }
            setOrders(data);
        })
    }, []);  // eslint-disable-line

    const hanleReOrder = order => {
        const newOrder = {
            landmark: order.landmark,
            comment: order.comment,
            ...order.cart
        }
        setReOrder(newOrder);
        history.push('/checkout')
    }

    const renderOrders = () => (
        orders && orders.map(order => (
            <Grid.Column computer={8} mobile={16}>
                <div className='my-orders-item'>
                    <div className='header-order-item'>
                        <div className="logo-order-item">

                        </div>
                        <div>
                            <Header as='h3' style={{margin: 0}}>{order.restaurant.name}</Header>
                            <div className="date-orders">
                                <Moment locale="ru" format='LLL'>{order.createdAt}</Moment>
                            </div>
                        </div>
                    </div>
                    {order.cart.items.map((cart, index) => (
                        <div className='space-between-item item-check' style={{fontSize: '15px'}}>{index+1}. {cart.name} *{cart.quantity}: <span className="price-my-order">{cart.total} Сум</span></div>
                    ))}
                    <div className='space-between-item item-check' style={{fontSize: '15px'}}>Итого: <span className="price-my-order">{order.cart.total} Сум</span></div>
                    <Button fluid style={{marginTop: '25px'}} onClick={() => hanleReOrder(order)}>Повторить</Button>
                </div>
            </Grid.Column>
        ))
    )

    return (
        <Container style={{textAlign: 'center', marginTop: '25px'}}>
        <Grid centered>
            <Grid.Column computer={8} mobile={16} >
                <Link className='target-item' to='/'><Icon name='angle left' /> Главная</Link>
                <Header as='h1'>
                    Мои заказы
                </Header>
                {renderOrders()}
            </Grid.Column>
        </Grid>
    </Container>
    )
};

const mapStateToProps = ({auth}) => {
    return {
        auth
    }
}

const mapDispatchToProps = dispatch => {
    const {setReOrder} = bindActionCreators(actions, dispatch);
    
    return {
        setReOrder: payload => {
            setReOrder(payload);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrders);