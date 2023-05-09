const express = require("express")
const userControllers = require('../controllers/userControllers')
const checkAuth = require("../middleware/check-auth")
const { csrfProtection, csrfErrorHandling } = require("../csurf")
require("dotenv").config()

const isProduction = process.env.NODE_ENV === 'production';

const router = express.Router()

router.get("/csrf-token", csrfProtection, (req, res) => {
    const csrfToken = req.csrfToken();

    res.cookie("xsrf-token", csrfToken, {
        httpOnly: false,
        secure: isProduction,
        sameSite: isProduction ? "strict" : "lax",
    });

    res.status(200).json({ csrfToken });
});

router.use(checkAuth)
router.use(csrfProtection)
router.use(csrfErrorHandling)

router.post('/all', userControllers.fetchUser);

router.post('/updateUserTech', userControllers.updateUserTech);

module.exports = router;
