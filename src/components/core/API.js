const API = 'http://localhost:8000/api/v1';

export const getRestaurants = (sortBy) => {
    return fetch(`${API}/all/restaurant?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    }).then(data => {
        return data.json();
    }).catch(err => console.log(err));
};

export const getRestaurant = (id) => {
    return fetch(`${API}/restaurant/${id}`, {
        method: 'GET'
    }).then(data => {
        return data.json();
    }).catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {skip, limit, filters};

    return fetch(`${API}/restaurants/by/search/`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
};

export const getAllCategories = () => {
    return fetch(`${API}/categories`).then(data => {
        return data.json()
    }).catch(err => console.log(err));
};