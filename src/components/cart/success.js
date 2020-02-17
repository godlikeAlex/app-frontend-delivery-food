import React from 'react';
import { Button, Image, Grid, Container } from 'semantic-ui-react';
import sucess from './success.svg';
import { Link } from 'react-router-dom';

const Success = () =>  (
    <Container style={{textAlign: 'center', marginTop: '25px'}}>
        <Grid centered>
            <Grid.Column computer={13} mobile={16} style={{textAlign: 'center'}}>
                <Image style={{width: '65%', margin: 'auto'}} src={sucess} />
                <h1 >Спасибо! Ваш заказ принят.</h1>
                <Grid centered>
                    <Grid.Column computer={5} style={{textAlign: 'center'}}>
                        <Button color='orange' fluid>
                            <Link to='/'>
                                Главная
                            </Link>
                        </Button>
                    </Grid.Column>
                    <Grid.Column computer={5}  style={{textAlign: 'center'}}>
                        <Button color='orange' fluid>
                            <Link to='/my-orders'>
                            Мои заказы
                            </Link>
                        </Button>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        </Grid>
    </Container>
);

export default Success;