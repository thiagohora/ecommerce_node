import 'app-module-path/register';

export default (app) => {
   app.use('/', require('main').default);
   app.use('/account', require('account').default);
};