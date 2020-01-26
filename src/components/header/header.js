import React, {useEffect, useState} from 'react';
import {Container} from 'semantic-ui-react';
import {MapSelector} from '../location';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({cart}) => {
    return (
        <nav className='menu'>
            <Container >
                <div className='menu-items'>
                    <Link to='/'><img src='https://eda.yandex/assets/logo-2b8cf6236b94ab214aa24b00ce106d16.svg' /></Link>
                    <ul className='right-menu'>
                        <MapSelector />
                        <li>Войти</li>
                        <li className='cart'>
                            <Link to='/cart'>
                                Корзина 
                                {cart.totalItems > 0 && (
                                    <div className='cart-counter'>{cart.totalItems}</div>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    )
};

const mapStateToProps = ({cart}) => {
    return {
        cart
    }
}

export default connect(mapStateToProps)(Header);