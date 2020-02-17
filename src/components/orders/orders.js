import React from 'react';
import { Header, Grid, Container, Button, Icon } from 'semantic-ui-react';
import './style.css';
import { Link } from 'react-scroll';

const UserOrders = () => {
    return (
        <Container style={{textAlign: 'center', marginTop: '25px'}}>
        <Grid centered>
            <Grid.Column computer={8} mobile={16} >
                <Link className='target-item' to='/cart'><Icon name='angle left' /> Главная</Link>
                <Header as='h1'>
                    Мои заказы
                </Header>
                <Grid.Column computer={8} mobile={16}>
                        <div className='my-orders-item'>
                            <div className='header-order-item'>
                                <div className="logo-order-item">

                                </div>
                                <div>
                                    <Header as='h3' style={{margin: 0}}>Mone Cafe & Bakery</Header>
                                    <div className="date-orders">15 ноября 2020 года</div>
                                </div>
                            </div>
                            <div className='space-between-item item-check' style={{fontSize: '15px'}}>1. Крылья x 23: <span className="price-my-order">35000 Сум</span></div>
                            <div className='space-between-item item-check' style={{fontSize: '15px'}}>2. Пицца x 2: <span className="price-my-order">135000 Сум</span></div>
                            <div className='space-between-item item-check' style={{fontSize: '15px'}}>Итого: <span className="price-my-order">35000 Сум</span></div>
                            <Button fluid style={{marginTop: '25px'}}>Повторить</Button>
                        </div>
                </Grid.Column>
            </Grid.Column>
        </Grid>
    </Container>
    )
};


export default UserOrders;