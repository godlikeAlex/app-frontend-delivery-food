import React from 'react';
const API = 'http://localhost:8000/api/v1';

export const linkImageRestaurant = id => (`${API}/photo/restaurant/${id}`)