import 'app-module-path/register';
import Product from 'product';
import CategoryInjector from 'share/category/filter/CategoryInjector';
import CartFilter from 'product/cart/infrastructure/filter/CartFilter';

export default (app) => {
    app.use('/', CategoryInjector, CartFilter, require('main').default);
    app.use('/account', CategoryInjector, CartFilter, require('account').default);
    app.use('/admin', require('admin').default);
    app.use('/category', CategoryInjector, CartFilter, Product.category);
    app.use('/product', CategoryInjector, CartFilter, Product.item);
    app.use('/cart', CategoryInjector, CartFilter, Product.cart);
};