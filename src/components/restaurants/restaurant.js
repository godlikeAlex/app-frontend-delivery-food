import React, {useState} from 'react';
import {Container, Header, Input, Grid, Placeholder, Button} from 'semantic-ui-react';
import './restaurant.css';
import Moto from './moto.svg';

const Restaurants = () => {
    const [loading, setLoading] = useState(false);

    const beforeLoading = () => (
        <React.Fragment>
                    <Grid.Column>
                    <Placeholder>
                            <Placeholder.Image rectangular />
                            <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                </Grid.Column>
                <Grid.Column>
                    <Placeholder>
                            <Placeholder.Image rectangular />
                            <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                </Grid.Column>
                <Grid.Column>
                    <Placeholder>
                            <Placeholder.Image rectangular />
                            <Placeholder.Header>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            </Placeholder.Header>
                        </Placeholder>
                </Grid.Column>
        </React.Fragment>
    );

    const restaurants = () => (
        <React.Fragment>
            <Grid.Column>
            <div className='restaurant-item'>
                <div className='restaurant-image' style={{background: 'url(https://eda.yandex/images/1387779/aa0d9d52b7156baae8e6c9b19d7971be-600x450.jpeg)'}}></div>
                <div className="main-info-restaurant">
                    <div className="restaurant-name">Папа Джонс</div>
                    <div className='categories'>
                        <span>Пицца</span>
                        <span className='category-dot'>Фастфуд</span>
                    </div>
                    {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                    <div className="restaurant-order-from">
                        От 25000 Сум
                        <div className='delivery-time'>
                            <img style={{paddingRight: '5px'}} src={Moto} alt=""/> 35-45 мин
                        </div>
                    </div>
                </div>
            </div>
        </Grid.Column>
        <Grid.Column>
            <div className='restaurant-item'>
                <div className='restaurant-image' style={{background: 'url(https://eda.yandex/images/1387779/aa0d9d52b7156baae8e6c9b19d7971be-600x450.jpeg)'}}></div>
                <div className="main-info-restaurant">
                    <div className="restaurant-name">Папа Джонс</div>
                    <div className='categories'>
                        <span>Пицца</span>
                        <span className='category-dot'>Фастфуд</span>
                    </div>
                    {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                    <div className="restaurant-order-from">
                        От 25000 Сум
                        <div className='delivery-time'>
                            <img style={{paddingRight: '5px'}} src={Moto} alt=""/> 35-45 мин
                        </div>
                    </div>
                </div>
            </div>
        </Grid.Column>
        <Grid.Column>
            <div className='restaurant-item'>
                <div className='restaurant-image' style={{background: 'url(https://eda.yandex/images/1387779/aa0d9d52b7156baae8e6c9b19d7971be-600x450.jpeg)'}}></div>
                <div className="main-info-restaurant">
                    <div className="restaurant-name">Папа Джонс</div>
                    <div className='categories'>
                        <span>Пицца</span>
                        <span className='category-dot'>Фастфуд</span>
                    </div>
                    {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                    <div className="restaurant-order-from">
                        От 25000 Сум
                        <div className='delivery-time'>
                            <img style={{paddingRight: '5px'}} src={Moto} alt=""/> 35-45 мин
                        </div>
                    </div>
                </div>
            </div>
        </Grid.Column>
        <Grid.Column>
            <div className='restaurant-item'>
                <div className='restaurant-image' style={{background: 'url(https://eda.yandex/images/1387779/aa0d9d52b7156baae8e6c9b19d7971be-600x450.jpeg)'}}></div>
                <div className="main-info-restaurant">
                    <div className="restaurant-name">Папа Джонс</div>
                    <div className='categories'>
                        <span>Пицца</span>
                        <span className='category-dot'>Фастфуд</span>
                    </div>
                    {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                    <div className="restaurant-order-from">
                        От 25000 Сум
                        <div className='delivery-time'>
                            <img style={{paddingRight: '5px'}} src={Moto} alt=""/> 35-45 мин
                        </div>
                    </div>
                </div>
            </div>
        </Grid.Column>
        <Grid.Column>
            <div className='restaurant-item'>
                <div className='restaurant-image' style={{background: 'url(https://eda.yandex/images/1387779/aa0d9d52b7156baae8e6c9b19d7971be-600x450.jpeg)'}}></div>
                <div className="main-info-restaurant">
                    <div className="restaurant-name">Папа Джонс</div>
                    <div className='categories'>
                        <span>Пицца</span>
                        <span className='category-dot'>Фастфуд</span>
                    </div>
                    {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                    <div className="restaurant-order-from">
                        От 25000 Сум
                        <div className='delivery-time'>
                            <img style={{paddingRight: '5px'}} src={Moto} alt=""/> 35-45 мин
                        </div>
                    </div>
                </div>
            </div>
        </Grid.Column>
        <Grid.Column>
            <div className='restaurant-item'>
                <div className='restaurant-image' style={{background: 'url(https://eda.yandex/images/1387779/aa0d9d52b7156baae8e6c9b19d7971be-600x450.jpeg)'}}></div>
                <div className="main-info-restaurant">
                    <div className="restaurant-name">Папа Джонс</div>
                    <div className='categories'>
                        <span>Пицца</span>
                        <span className='category-dot'>Фастфуд</span>
                    </div>
                    {/* <div className="restaurant-time-work"><Icon name='clock outline' />Открыто целый день.</div> */}
                    <div className="restaurant-order-from">
                        От 25000 Сум
                        <div className='delivery-time'>
                            <img style={{paddingRight: '5px'}} src={Moto} alt=""/> 35-45 мин
                        </div>
                    </div>
                </div>
            </div>
        </Grid.Column>
        </React.Fragment>
    )

    return (
        <Container>
            <div className='section-name-flex'>
                <Header as='h2' style={{margin: '0px', fontSize: '35px'}}>Рестораны</Header>
                <Input style={{width: '255px'}} icon='search' placeholder='Найти ресторан...' />
            </div>
            <Grid stackable columns={3} style={{paddingTop: '50px'}}>
                {loading ? beforeLoading() : restaurants()}             
            </Grid>
        </Container>
    )
};

export default Restaurants;