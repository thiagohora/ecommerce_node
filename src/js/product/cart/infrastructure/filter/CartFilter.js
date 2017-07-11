import CartServ from 'product/cart/service/CartServ';

const service = new CartServ();

export default (req, res, next) => {
    res.locals.cart = { count: 0 };
    return service.findById(req.session.cart_id)
            .then(cart => {
                cart.products.forEach(cartItem => cartItem.total_price =  cartItem.product.sales_price * cartItem.quantity);
                cart.products.forEach(cartItem => cart.total += cartItem.total_price);
                cart.products.forEach(cartItem => {
                    console.log(cart);
                });
                
                res.locals.cart = cart;
                res.locals.cart.count = cart.products.reduce((previus, current) => previus + current.quantity, 0);
                return next();
            }).catch(() => next());
};