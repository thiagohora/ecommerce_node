import 'app-module-path/register';
import Product from 'product';

export default (app) => {
    app.use('/', require('main').default);
    app.use('/account', require('account').default);
    app.use('/category', Product.category);
    app.use('/product', Product.item);
};