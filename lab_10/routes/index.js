const ath = require('../utilities/authenticate');

const constructorMethod = app => {
    
    //1. validate the login information
    app.use((req, res, next) => {
        if (!req.cookies.AuthCookie) {
            req.user = null;
            next();
        } else {
            ath.findUserById(req.cookies.AuthCookie).then((result) => {
                if (!result) {
                    res.clearCookie('AuthCookie');
                    req.user = null;
                    next();
                } else {
                    req.user = result;
                    next();
                }
            });
        }
    });

    app.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/private');
        } else {
            res.render('login');
        }
    });

    app.post('/login', (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        console.log(username, password);
        ath.loginCheck(username, password).then((result) => {
            if (result) {
                res.cookie('AuthCookie',result).redirect('/private');
            } else {
                res.render('login',{err: true});
            }
        });
    });

    app.get('/private', (req, res) => {
        if (req.user) {
            res.render('private', {user: req.user});
        } else {
            res.redirect('/');
        }
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('AuthCookie').render('logout');
        // res.render('logout');
    });

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;