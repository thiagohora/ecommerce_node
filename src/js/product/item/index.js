import {Router} from 'express';

const router = Router();

router.get('/:slug', (req, res) => {
   return res.render('product/item/template/show', {
        title: 'Product',
        layout: 'share/template/main/index',
        user: req.user || null
    });
});

export default router;

