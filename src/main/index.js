import {Router} from 'express';

const router = Router();

router.get('/',(req, res) => {
    res.render('main/template/index', {
        title: 'Main Page',
        layout: 'share/template/promo/index',
        user: req.user || null
    });
});

export default router;