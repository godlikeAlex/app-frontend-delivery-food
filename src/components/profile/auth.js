import React, {useState} from 'react';
import { Button, Modal, Form, Grid, Segment, Image, Header, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions';
import InputMask from 'react-input-mask';
import {login, verify, createAccount} from '../core/API';
import { useToasts } from 'react-toast-notifications';
import './style.css';

const AuthModal = ({open, showLogin, setAuth}) => {
    const [number, setNumber] = useState('');
    const [key, setKey] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [disable, setDisable] = useState(true);
    const [view, setView] = useState({signIn: true, verify: false, signUp: false});
    const { addToast } = useToasts();

    const handleClose = () => {
        showLogin(false);
    }

    const handleChange = (e) => {
        if(e.target.name === 'phone') {
            setNumber(e.target.value);
        } else if(e.target.name === 'key') {
            setKey(e.target.value);
        } else if(e.target.name === 'name') {
            setName(e.target.value);
        }

        const numberPattern = /\d+/g;
        const phone = number.match( numberPattern );
        if(phone && phone.join([]).length >= 11) {
            // TODO NAME DISABLE
            setError('');
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    const getActiveCode = () => {
        const numberPattern = /\d+/g;
        const phone = number.match( numberPattern );
        if(phone && phone.join([]).length === 12) {
            setError('');
            setDisable(false);
            login(phone.join([])).then(data => {
                if(data.err) {
                    setError(data.err);
                }

                if(data.ok) {
                    setView({signIn: false, verify: true, signUp: false});
                }
            })
        } else {
            setDisable(true);
            setError('Пожалуйста введите телефон.');
        }
    }

    const handleVerifyCode = () => {
        const numberPattern = /\d+/g;
        const phone = number.match( numberPattern );
        verify(phone.join([]), key).then(data => {
            if(data.err) setError(data.err);
            else {
                localStorage.setItem('auth', JSON.stringify(data));
                setAuth(data);
                showLogin(false);
                setKey('');
                setView({signIn: true, verify: false, signUp: false});
                addToast('Вы успешно вошли в аккаунт', {appearance: 'success', autoDismiss: true});
            }
        })
    }

    const signUpHandle = () => {
        const numberPattern = /\d+/g;
        const phone = number.match( numberPattern );
        if(phone && phone.join([]).length === 12) {
            setError('');
            setDisable(false);
            createAccount(name, phone.join([])).then(data => {
                if(data.err) {
                    setError(data.err);
                }

                if(data.ok) {
                    setView({signIn: false, verify: true, signUp: false});
                }
            })
        } else {
            setDisable(true);
            setError('Пожалуйста введите телефон и Имя.');
        }
    }

    const verifyCode = () => (
        <React.Fragment>
            <Header as='h2' textAlign='center'>
                Потвердить код
            </Header>
            <p>Код был отправлен на {number}</p>
            <Form >
                <InputMask  mask='99999' value={key} name='key' onChange={handleChange} >
                    {(inputProps) => <Form.Input className={error ? 'error': ''} fluid icon='key' {...inputProps} type="tel" iconPosition='left' placeholder='Код из смс' />}
                </InputMask>

                <Button color='orange' fluid size='fluid' onClick={handleVerifyCode}>
                    Проверить 
                </Button>
            </Form>
            <div className='login-error'>{error && error}</div>

            {/* <Message style={{textAlign: 'center'}}>
                Уже есть аккаунт? <a href='#'>Войти</a>
            </Message> */}
        </React.Fragment>
    );

    const signIn = () => (
        <React.Fragment>
            <Header as='h2' textAlign='center'>
            Вход в аккаунт
            </Header>
            <Form >
                <InputMask  mask='+\9\9\8(99) 999-99-99' value={number} name='phone' onChange={handleChange} >
                    {(inputProps) => <Form.Input className={error ? 'error': ''} fluid icon='phone' {...inputProps} type="tel" iconPosition='left' placeholder='Номер телефона' />}
                </InputMask>

                <Button disabled={disable} color='orange' fluid size='fluid' onClick={getActiveCode}>
                    Получить код
                </Button>
            </Form>
            <div className='login-error'>{error && error}</div>

            <Message style={{textAlign: 'center'}}>
                Первый раз с нами? <a href='#' onClick={() => setView({signIn: false, verify: false, signUp: true})}>Регистрация</a>
            </Message>
        </React.Fragment>
    )

    const signUp = () => (
        <React.Fragment>
            <Header as='h2' textAlign='center'>
            Создать аккаунт
            </Header>
            <Form >
                <Form.Input name='name' fluid icon='user' value={name} onChange={handleChange} iconPosition='left' placeholder='Ваше имя'/>
                <InputMask  mask='+\9\9\8(99) 999-99-99' value={number} name='phone' onChange={handleChange} >
                    {(inputProps) => <Form.Input className={error ? 'error': ''} fluid icon='phone' {...inputProps} type="tel" iconPosition='left' placeholder='Номер телефона' />}
                </InputMask>
                <Button disabled={disable} color='orange' fluid size='fluid' onClick={signUpHandle}>
                    Получить код
                </Button>
            </Form>
            <div className='login-error'>{error && error}</div>

            <Message style={{textAlign: 'center'}}>
                Уже есть аккаунт? <a href='#' onClick={() => setView({signIn: true, verify: false, signUp: false})}>Вход</a>
            </Message>
        </React.Fragment>
    )

    return (
        <Modal size='mini' closeIcon={true} open={open} onClose={handleClose}>
            <Modal.Content>
                {view.signIn && signIn()}
                {view.signUp && signUp()}
                {view.verify && verifyCode()}
            </Modal.Content>
        </Modal>
    )
};

const mapStateToProps = ({showModal}) => {
    return {
        open: showModal
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);

