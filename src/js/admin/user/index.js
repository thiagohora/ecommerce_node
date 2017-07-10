import UserServ from 'admin/user/service/AdminUserServ';
import User from 'admin/user/domain/AdminUser';
import auth from 'admin/infrastructure/auth/auth';

const service = new UserServ();

const printError = (reject, url, error) => {
    console.log(error);
    return reject(url);
}

export default function (router, isLoggedIn) {

    router.delete('/user/:id', isLoggedIn, (req, res) => {
        return service.delete(Object.assign({}, new User(req.body), { id: req.params.id }))
                    .then(() => res.redirect('/admin/user'))
                    .catch(() => res.redirect(`/admin/user`));
    });

    router.get('/user', isLoggedIn, (req, res) => {
        return service.getAll().then(optUsers => {
            return res.render('admin/user/template/show', {
                title: 'User',
                layout: 'admin/template/base/index',
                user: req.user || null,
                users : optUsers.orElse([])
            });
        }).catch(() => res.redirect('/admin'));
    });

    router.get('/user/new', isLoggedIn, (req, res) => {
        return res.render('admin/user/template/new', {
            title: 'User',
            layout: 'admin/template/base/index',
            user: req.user || null,
            currentUser: {}
        });
    });

    router.get('/user/edit/:id', isLoggedIn, (req, res) => {
        service.findById(req.params.id).then(currentUser => {
            return res.render('admin/user/template/edit', {
                        title: 'User',
                        layout: 'admin/template/base/index',
                        user: req.user || null,
                        currentUser
                    });
        }).catch(() => res.redirect('/admin'));
    });

    router.post('/user', isLoggedIn, (req, res) => {
        return service.save(new User(req.body))
                        .then(() => res.redirect('/admin/user'))
                        .catch((error) => printError(res.redirect,'/admin/user/new', error));
    });

    router.put('/user/:id', isLoggedIn, (req, res) => {
        return service.update(Object.assign({}, new User(req.body), { id: req.params.id }))
                    .then(user => res.redirect('/admin/user'))
                    .catch(() => res.redirect(`/admin/user/${req.params.id}`));
    });

    router.get('/login', (req, res) => {
        return res.render('admin/user/template/login', {
            title: 'User',
            layout: 'admin/user/template/base/index'
        });
    });

    router.post('/login', auth);
}