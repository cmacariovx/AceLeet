const csrf = require('csurf');
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production';

const csrfProtection = csrf({
  value: (req) => {
    const csrfToken = req.headers["csrf-token"] || req.headers["CSRF-Token"];
    return csrfToken;
  },
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
  },
});

function csrfErrorHandling(err, req, res, next) {
    if (err.code === 'EBADCSRFTOKEN') {
      res.status(403).json({ err });
    } else {
      next(err);
    }
}

module.exports = { csrfProtection, csrfErrorHandling };
