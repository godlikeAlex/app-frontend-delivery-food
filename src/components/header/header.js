import React, {useState} from 'react';
import {Container, Icon, Dropdown} from 'semantic-ui-react';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import { isAuth } from '../profile';
import { signOut } from '../core/API';
import { useToasts } from 'react-toast-notifications';

const Header = ({cart, showLogin, auth, setAuth, openLocation, location}) => {
    const [open, setOpen] = useState(false);
    const { addToast } = useToasts();

    const closeMenu = e => {
        if(e.target.classList.contains('menu-content-active')) {
            setOpen(false);
        }
    }

    const handleOpen = () => {
        showLogin(true);
    }

    const signOutHandle = () => {
        if(isAuth()) {
            signOut(isAuth().token).then(data => {
                localStorage.removeItem('auth');
                setAuth({
                    token: null,
                    user: null
                });
                addToast('Вы вышли из аккаунта', {appearance: 'success', autoDismiss: true});
                setOpen(false);
            })
        }
    }

    const dropDownProfile = () => (
        <Dropdown text='Профиль'>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/my-orders'>
                        Мои заказы
                </Dropdown.Item>
                <Dropdown.Item onClick={signOutHandle} text='Выйти' />
            </Dropdown.Menu>
        </Dropdown>
    )
    

    const rightMenuMobile = () => {
        return (
            <div onClick={closeMenu} className={open ? 'right-menu show-menu' : 'right-menu'}>
                <div className={open ? 'menu-content menu-content-active' : 'menu-content'} >
                    <ul className='list-menu-right'>
                        <div class="header-mobile-menu">
                            <Link to='/'><img alt='Логотип' src='https://eda.yandex/s3/assets/logo-2b8cf6236b94ab214aa24b00ce106d16.svg' /></Link>
                            <Icon name='close' onClick={() => setOpen(false)} />
                        </div>
                        <li>
                            <Link to='/' onClick={() => setOpen(false)}><Icon name='home' /> Главная</Link>
                        </li>
                        <li onClick={() => {
                             openLocation(true);
                             setOpen(false);
                        }}>
                            <Icon name='map marker alternate'/> {location.address || 'Адрес доставки'} 
                        </li>
                        {isAuth() && (
                            <React.Fragment>
                                <li>
                                    <Link to='/my-orders' onClick={() => setOpen(false)}>
                                        <Icon name='numbered list' /> Мои Заказы
                                    </Link>
                                </li>
                            </React.Fragment>
                        )}
                        <li>
                            <Link onClick={() => setOpen(false)} to='/cart'>
                            <Icon  name='cart' />
                                {cart.totalItems > 0 ? (
                                    <span>Товаров в корзине {cart.totalItems}</span>
                                ): 'Корзина'}
                            </Link>
                        </li>
                        {isAuth() ? (
                            <li onClick={signOutHandle}>
                                Выйти
                            </li>
                        ) : (
                            <li onClick={handleOpen}>
                                Войти
                            </li>
                        )}
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
                    <Link to='/'><img alt='Логотип' src='https://eda.yandex/s3/assets/logo-2b8cf6236b94ab214aa24b00ce106d16.svg' /></Link>
                    <span className='right-menu-button only-phone'>
                        <Icon name='bars' onClick={() => setOpen(true)} />
                    </span>
                    <ul className='right-menu-items only-pc'>
                        <li className='cart' onClick={() => openLocation(true)}>
                            <Icon name='map marker alternate'/> {location.address || 'Адрес доставки'} 
                        </li>
                        <li onClick={handleOpen}>
                            {isAuth() && auth.token ? dropDownProfile() : 'Войти'}
                        </li>
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

const mapStateToProps = ({cart, auth, location}) => {
    return {
        cart,
        auth,
        location
    }
}

const mapDispatchToProps = dispatch => {
    const {showLogin, setAuth, openLocation} = bindActionCreators(actions, dispatch);
    return {
        showLogin: (open) => {
            showLogin(open);
        },
        setAuth: (auth) => {
            setAuth(auth);
        },
        openLocation: payload => openLocation(payload),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);