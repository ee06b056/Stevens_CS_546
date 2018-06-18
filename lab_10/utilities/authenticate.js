const users = require('../data/user.js');
const bcrypt = require('bcrypt');


module.exports = {
    async loginCheck (username, password) {
        let user = users.find((element) => {
            return element.username == username;
        });
        if (!user) return false;

        if (await bcrypt.compare(password, user.hashed_password)) {
            return user._id;
        } else {
            return false;
        }
    },
    async findUserById (id) {
        return users.find((element) => {
            return element._id == id;
        });
    }
}