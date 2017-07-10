import User from 'admin/user/infrastructure/repository/schema/AdminUser';

export default (req, res) => {
    
    const authenticate = User.authenticate();

    authenticate(req.body.email, req.body.password, (error, user, opts) => {
       console.log(req.body);
        if(error || user === false) {
             console.log("ok");
            return res.redirect('/admin/login');
        }

        return req.login(user, (error) => {
            if(error) {
                console.log(error);
                return res.redirect('/admin/login');
            }
            return res.redirect('/admin');
        });
    });
};