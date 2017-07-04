import 'app-module-path/register';
import Product from 'product';
import CategoryInjector from 'share/category/filter/CategoryInjector';

export default (app) => {
    app.use('/', CategoryInjector, require('main').default);
    app.use('/account', CategoryInjector, require('account').default);
    app.use('/admin', require('admin').default);
    app.use('/category', CategoryInjector, Product.category);
    app.use('/product', CategoryInjector, Product.item);
};