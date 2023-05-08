const express = require("express")
const userControllers = require('../controllers/userControllers')
const checkAuth = require("../middleware/check-auth")
const csrfProtection = require("../csurf")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production';

const router = express.Router()

router.use(checkAuth)
router.use(csrfProtection)

router.post('/all', userControllers.fetchUser);

router.post('/updateUserTech', userControllers.updateUserTech);

router.get("/csrf-token", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken, {
        httpOnly: false,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
    });
    res.status(200).json({ csrfToken });
});

module.exports = router;
