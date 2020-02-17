import React, {useState} from 'react';
import {Container, Icon, Dropdown} from 'semantic-ui-react';
import {MapSelector} from '../location';
import './header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import { isAuth } from '../profile';
import { signOut } from '../core/API';
import { useToasts } from 'react-toast-notifications';

const Header = ({cart, showLogin, auth, setAuth}) => {
    const [open, setOpen] = useState(false);
    const { addToast } = useToasts();

    const closeMenu = e => {
        if(e.target.classList.contains('right-menu')) {
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
                <Dropdown.Item text='Настройки' />
                <Dropdown.Item onClick={signOutHandle} text='Выйти' />
            </Dropdown.Menu>
        </Dropdown>
    )
    

    const rightMenuMobile = () => {
        return (
            <div onClick={closeMenu} className={open ? 'right-menu show-menu' : 'right-menu'}>
                <div className={open ? 'menu-content menu-content-active' : 'menu-content'} >
                    <ul className='list-menu-right'>
                        <h2 style={{paddingLeft: '20px'}}>Меню</h2>
                        <li>
                            <Link to='/'><Icon name='home' /> Главная</Link>
                        </li>
                        <MapSelector onClick={() => setOpen(false)} />
                        {isAuth() && (
                            <React.Fragment>
                                <li><Icon name='setting' /> Настройки</li>
                                <li><Icon name='numbered list' /> Мои Заказы</li>
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
                    <Link to='/'><img src='https://eda.yandex/assets/logo-2b8cf6236b94ab214aa24b00ce106d16.svg' /></Link>
                    <span className='right-menu-button only-phone'>
                        <Icon name='bars' onClick={() => setOpen(true)} />
                    </span>
                    <ul className='right-menu-items only-pc'>
                        <MapSelector />
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

const mapStateToProps = ({cart, auth}) => {
    return {
        cart,
        auth
    }
}

const mapDispatchToProps = dispatch => {
    const {showLogin, setAuth} = bindActionCreators(actions, dispatch);
    return {
        showLogin: (open) => {
            showLogin(open);
        },
        setAuth: (auth) => {
            setAuth(auth);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);