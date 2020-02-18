const API = process.env.REACT_APP_SERVER_API;

export const linkImageRestaurant = id => (`${API}/photo/restaurant/${id}`)
export const linkMenuItemImage = id => (`${API}/photo/menu-item/${id}`)