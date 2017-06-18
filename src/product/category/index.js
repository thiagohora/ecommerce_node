import {Router} from 'express';

const router = Router();

router.get('/:name', require('product/category/services/show.js').default);

export default router;

