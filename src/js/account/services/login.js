import User from 'share/infrastructure/security/schema/User';

export default (req, res) => {
    
    const authenticate = User.authenticate();

    authenticate(req.body.email, req.body.password, (error, user, opts) => {
       
        if(error || user === false) {
            console.log(error | user);
            return res.redirect('/account');
        }

        return req.login(user, (error) => {
            if(error) {
                console.log(error);
                return res.redirect('/account');
            }
            return res.redirect('/');
        });
    });
};