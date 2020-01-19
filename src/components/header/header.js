import React from 'react';
import {Container, Icon} from 'semantic-ui-react';
import {MapSelector} from '../location';
import './header.css';

const Header = () => {

    return (
        <nav className='menu'>
            <Container >
                <div className='menu-items'>
                    <div><img src='https://eda.yandex/assets/logo-2b8cf6236b94ab214aa24b00ce106d16.svg' /></div>
                    <ul className='right-menu'>
                        <MapSelector />
                        <li>Войти</li>
                        <li className='cart'>
                            Корзина 
                            <div className='cart-counter'>1</div>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    )
};

export default Header;