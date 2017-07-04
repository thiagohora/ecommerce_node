import {Router} from 'express';
import CategoryRegister from 'admin/category';
import ProductRegister from 'admin/product';

const router = Router();

router.get('/',(req, res) => {
    res.render('admin/template/index', {
        title: 'Admin Page',
        layout: 'admin/template/base/index',
        user: req.user || null
    });
});

CategoryRegister(router);
ProductRegister(router);

export default router;