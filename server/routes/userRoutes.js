const express = require("express")
const userControllers = require('../controllers/userControllers')
const checkAuth = require("../middleware/check-auth")
const { csrfProtection } = require("../app")

const router = express.Router()

router.use(checkAuth)

router.post('/all', csrfProtection, userControllers.fetchUser);

router.post('/updateUserTech', csrfProtection, userControllers.updateUserTech);

module.exports = router
