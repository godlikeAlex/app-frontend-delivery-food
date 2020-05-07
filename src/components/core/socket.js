import io from 'socket.io-client';
const socketUrl = process.env.REACT_APP_SOCKET;

export let socket = io(socketUrl, {reconnection: true, forceNode: true,  query: {jwt: localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth')).token} });

export const updateTokenInSocket = async token => {
    if(token) {
        socket = io(socketUrl, {reconnection: true, forceNode: true,  query: {jwt: token} });
    }
}

export const registerOrder = (order, restaurant, name, cb) => {
    socket.on('orderPublished', ({err}) => cb(err));
    socket.emit('sendOrder', {order, restaurant, restaurantName: name});
}