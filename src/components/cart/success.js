import React from 'react';
import { Button, Image, Grid, Container } from 'semantic-ui-react';
import sucess from './success.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Success = ({history, showSuccess}) =>  {

    if(!showSuccess) {
        history.push('/');
    }

    return (
        <Container style={{textAlign: 'center', marginTop: '25px'}}>
            <Grid centered>
                <Grid.Column computer={13} mobile={16} style={{textAlign: 'center'}}>
                    <Image style={{width: '65%', margin: 'auto'}} src={sucess} />
                    <h1 >Спасибо! Ваш заказ принят.</h1>
                    <Grid centered>
                        <Grid.Column computer={5} style={{textAlign: 'center'}}>
                            <Button color='orange' fluid as={Link} to='/'>
                                Главная
                            </Button>
                        </Grid.Column>
                        <Grid.Column computer={5}  style={{textAlign: 'center'}}>
                            <Button color='orange' fluid as={Link} to='/my-orders'>
                                Мои заказы
                            </Button>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        </Container>
    )
};

const mapStateToProps = ({showSuccess}) => {
    return {
        showSuccess
    }
}

export default connect(mapStateToProps)(Success);