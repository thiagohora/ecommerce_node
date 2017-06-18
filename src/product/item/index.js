import {Router} from 'express';

const router = Router();

router.get('/:slug', require('product/item/services/show.js').default);

export default router;

