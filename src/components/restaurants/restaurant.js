import React from 'react';
import {Container, Header, Input, Grid, Segment} from 'semantic-ui-react';
import './restaurant.css';

const Restaurants = () => {
    return (
        <Container>
            <div className='section-name-flex'>
                <Header as='h2' style={{margin: '0px', fontSize: '35px'}}>Рестораны</Header>
                <Input style={{width: '255px'}} icon='search' placeholder='Найти ресторан...' />
            </div>
            <div className='restaurant-item'>
                hello
            </div>
        </Container>
    )
};

export default Restaurants;