import React from 'react';
const API = process.env.REACT_APP_SERVER_API_ALL;

export const linkImageRestaurant = id => (`${API}/photo/restaurant/${id}`)
export const linkMenuItemImage = id => (`${API}/photo/menu-item/${id}`)