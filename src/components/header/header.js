import React, {useEffect, useState} from 'react';
import {Container, Icon} from 'semantic-ui-react';
import {MapSelector} from '../location';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({cart}) => {
    const [open, setOpen] = useState(false);

    const closeMenu = e => {
        if(e.target.classList.contains('right-menu')) {
            setOpen(false);
        }
    }

    const rightMenuMobile = () => {
        return (
            <div onClick={closeMenu} className={open ? 'right-menu show-menu' : 'right-menu'}>
                <div className={open ? 'menu-content menu-content-active' : 'menu-content'} >
                    <ul className='list-menu-right'>
                        <MapSelector onClick={() => setOpen(false)} />
                        <li>
                            <Link onClick={() => setOpen(false)} to='/cart'>
                            <Icon  name='cart' /> Корзина 
                                {cart.totalItems > 0 && (
                                    <div className='cart-counter'>{cart.totalItems}</div>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <nav className='menu'>
            {rightMenuMobile()}
            <Container >
                <div className='menu-items'>
                    <Link to='/'><img src='https://eda.yandex/assets/logo-2b8cf6236b94ab214aa24b00ce106d16.svg' /></Link>
                    <span className='right-menu-button only-phone'>
                        <Icon name='bars' onClick={() => setOpen(true)} />
                    </span>
                    <ul className='right-menu only-pc'>
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