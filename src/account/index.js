import { Router } from 'express';
import ValidateLogin from 'account/services/validateLogin';

const router = Router();

router.get('/', require('account/services/index').default);

router.get('/new', require('account/services/show').default);

router.get('/logout', ValidateLogin, require('account/services/logout').default);

router.get('/:slug', ValidateLogin, require('account/services/show').default);

router.post('/new', require('account/services/create').default);

router.put('/:id', ValidateLogin, require('account/services/update').default);

router.post('/login', require('account/services/login').default);

export default router;
