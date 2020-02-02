import AuthModal from './auth';

const isAuth = () => {
    if(typeof window == 'undefined') {
        return false;
    }
    if(localStorage.getItem('auth')) {
        return JSON.parse(localStorage.getItem('auth'));
    }else {
        return false;
    }
}

export {
    AuthModal,
    isAuth
}
