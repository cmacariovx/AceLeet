const csrf = require('csurf');
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production';

const csrfProtection = csrf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
    },
});

module.exports = csrfProtection;
