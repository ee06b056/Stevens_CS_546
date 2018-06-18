const user_db = require('../data/users');

async function user_auth (req, res, next) {
    

    try {
        // console.log('hello from user_auth middleware');
        if (!req.cookies.user_id) {
            req.user = null;
            next();
        } else {
            let user_id = req.cookies.user_id;
            let user = await user_db.getUserById(user_id);
            req.user = user;
            // console.log(user);
            next();
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(403);
    }
}

module.exports = user_auth;