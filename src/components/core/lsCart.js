export const addFoodToCart = food => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {total: 0, totalItems: 0, items: []};
    cart.totalItems++;
    cart.items.push(food);
    cart.total = cart.items.reduce((prev, next) => {
        return prev + next.totalPrice
    }, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateFoodCart = (id, action) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || {total: 0, totalItems: 0, items: []};
    const foodToUpdate = cart.items.find(f => f.uid === id);
    if(action === 'inc') {
        foodToUpdate.quantity += 1;
        foodToUpdate.totalPrice = foodToUpdate.currentPrice * foodToUpdate.quantity;
    } else if(action === 'dec') {
        foodToUpdate.quantity = foodToUpdate.quantity === 1 ? 1 : foodToUpdate.quantity - 1;
        foodToUpdate.totalPrice = foodToUpdate.currentPrice * foodToUpdate.quantity;
    } else {
        const itemIndex = cart.items.findIndex(({uid}) => uid === id);
        cart.items.splice(itemIndex, 1);
        cart.totalItems = cart.items.length;
    }
    cart.total = cart.items.reduce((prev, next) => {
        return prev + next.totalPrice
    }, 0);

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const storeRestaurnt = restaurant => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.restaurant = restaurant;
    localStorage.setItem('cart', JSON.stringify(cart));
};