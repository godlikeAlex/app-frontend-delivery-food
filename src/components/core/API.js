const API = process.env.REACT_APP_SERVER_API;

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

export const searchRestaurant = name => {
    return fetch(`${API}/restaurant/search?search=${name}`, {method: 'GET'}).then(data => {
        return data.json()
    })
    .catch(err => {
        console.log(err);
    })
}

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

export const login = (phone) => {
    phone = parseInt(phone);
    return fetch(`${API}/client/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({phone})
    }).then(data => {
        return data.json()
    }).catch(err => console.log(err));
}

export const createAccount = (name, phone) => {
    phone = parseInt(phone);
    return fetch(`${API}/client/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, phone})
    }).then(data => {
        return data.json()
    }).catch(err => console.log(err));
}


export const verify = (phone, key) => {
    phone = parseInt(phone);
    key = parseInt(key);
    return fetch(`${API}/client/verify`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({phone, key})
    }).then(data => {
        return data.json()
    }).catch(err => console.log(err));
}

export const signOut = (token) => {
    return fetch(`${API}/client/signout`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(data => {
        return data.json()
    }).catch(err => console.log(err));
}

export const sendOrder = (token, data) => {
    return fetch(`${API}/order`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(data => {
        return data.json()
    }).catch(err => console.log(err));
}