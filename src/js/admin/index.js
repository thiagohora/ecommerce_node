import {Router} from 'express';
import CategoryRegister from 'admin/category';
import ProductRegister from 'admin/product';
import UserRegister from 'admin/user';
import isLoggedIn from 'admin/infrastructure/auth/isLoggedIn';

const router = Router();

router.get('/', isLoggedIn, (req, res) => {
    res.render('admin/template/index', {
        title: 'Admin Page',
        layout: 'admin/template/base/index',
        user: req.user || null
    });
});

CategoryRegister(router, isLoggedIn);
ProductRegister(router, isLoggedIn);
UserRegister(router, isLoggedIn);

export default router;