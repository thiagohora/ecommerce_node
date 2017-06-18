export default (req, res) => {

    if(req.user) {
        return res.redirect(`/account/${req.user.slug}`);
    } 
    
    return res.render('account/template/index', {
                title: 'Account ',
                layout: 'share/template/main/index',
                user: null
            });
};