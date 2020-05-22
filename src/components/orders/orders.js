import React, {useState, useEffect} from 'react';
import { Header, Grid, Container, Button, Icon, Loader } from 'semantic-ui-react';
import './style.css';
import { getOrders } from '../core/API';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/ru';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import EmptyImg from './empty.svg';
import { linkRestaurantLogo } from '../core/restaurantImg';

const UserOrders = ({auth, setReOrder, history}) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrders(auth.token).then(data => {
            if(data.err) {
                console.log(data.err);
            } else {
                setOrders(data);
            }
            setLoading(false);
        })
    }, []);  // eslint-disable-line

    const hanleReOrder = order => {
        const newOrder = {
            landmark: order.landmark,
            comment: order.comment,
            restaurant: order.restaurant,
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
                        {order.restaurant.logo && (
                            <div className="logo-order-item">
                                <img src={linkRestaurantLogo(order.restaurant._id)} style={{width: '100%'}} alt='Логотип' />
                            </div>
                        )}
                        <div style={{width: '100%'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Header as='h3' style={{margin: 0}}>{order.restaurant.name}</Header>
                                <div style={{color: order.status === 5 ? 'green' : 'red'}}>{order.status === 5 ? 'Успешно доставлен' : 'Отказано'}</div>
                            </div>
                            <div className="date-orders">
                                <Moment locale="ru" format='LLL'>{order.createdAt}</Moment>
                            </div>
                        </div>
                    </div>
                    {order.cart.items.map((cart, index) => (
                        <div className='space-between-item item-check' style={{fontSize: '15px'}}>{index+1}. {cart.name} *{cart.quantity}: <span className="price-my-order">{cart.totalPrice} Сум</span></div>
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
                {loading ? <Loader active={loading}  inline='centered' style={{marginTop: 50}}>Загружаем ваши заказы</Loader> : orders.length > 0 ? renderOrders() : (
                    <div style={{textAlign: 'center'}}>
                        <img src={EmptyImg} alt='У вас нету заказов.' style={{width: '80%'}} />
                        <Header as='h2' style={{textAlign: 'center'}}>
                            У вас нету заказов
                        </Header>
                    </div>
                )}
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