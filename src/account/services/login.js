import Customer from 'account/schema/customer';

export default (req, res) => {
    console.error("login init");
    console.error(req.body);
    
    Customer.authenticate(req.body.email, req.body.password, (error, user, opts) => {
        
        console.error("login req", user, error);

        if(error || user === false) {
            console.error("error ", error);
            return res.redirect('/account');
        }

         console.error("call login");
        return req.login(user, (error) => {
            if(error) {
                console.error("error ", error);
                return res.redirect('/account');
            }
            console.error(user);
            return res.redirect('/');
        });
    });
};